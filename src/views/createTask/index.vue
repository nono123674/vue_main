<template>
    <div class="main">
        <div class="head">新建任务</div>
        <div class="body">
            <div class="info">
                <div class="basic-info">
                    <el-form :model="form" label-width="auto" style="max-width: 600px" class="form" size="large">
                        <el-form-item label="任务名称" class="label">
                            <el-input v-model="form.task_name" />
                        </el-form-item>
                        <el-form-item label="任务描述">
                            <el-input v-model="form.task_description" type="textarea" :rows="3" />
                        </el-form-item>
                        <el-form-item label="开始时间">
                            <el-date-picker v-model="form.startDate" type="date" value-format="YYYY-MM-DD"
                                placeholder="选择开始时间" style="width: 100%" />
                        </el-form-item>
                        <el-form-item label="结束时间">
                            <el-date-picker v-model="form.endDate" type="date" value-format="YYYY-MM-DD"
                                placeholder="选择结束时间" style="width: 100%" />
                        </el-form-item>
                        <div class="space"></div>
                    </el-form>
                </div>
                <div class="member">
                    <div class="member-head">任务成员</div>
                    <div class=other>
                        <el-select-v2 v-model="selected_id" filterable :options="member_list" placeholder=""
                            style="width: 80%" multiple />
                        <div v-for="(member, index) in selected_list" :key="index">
                            <div class="member-name">{{ member.label }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <el-form-item class="btn">
                <el-button type="success" @click="onSubmit" class='create-btn'>完成创建</el-button>
                <router-link :to="`/project/${project_id}`">
                    <el-button type="danger" class="cancel-btn">取消创建</el-button>
                </router-link>
            </el-form-item>
        </div>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import axios from "axios";
const router = useRouter();
const route = useRoute()
const project_id = route.query.projectid;
const project_name = 'ganyu'
const form = ref({
    task_name: '',   //任务名称
    task_description: '',    //任务描述
    startDate: '',  //任务开始时间
    endDate: '',    //任务结束时间
    member: '',
    project_id: '',
    project_name: '',
    task_status: 0,
})
const member_list = ref([]);
const selected_id = ref([])
const selected_list = ref([])

// 项目详情
const project_form = ref({
    id: 0,
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    adminId: '',
    member: ''
})

form.value.project_id = project_id;
form.value.project_name = project_name;

// 使用 onMounted 钩子，在组件挂载时发送请求获取用户列表
const get_member_list = async () => {
    try {
        // 发送 GET 请求获取项目用户列表数据
        const response = await axios.get('http://localhost:8081/api/getProjectMembers', {
            params: {
                project_id: project_id
            }
        });
        console.log(response)
        // 获取后端返回的用户列表数组
        const userList = response.data.data;
        console.log(userList)
        // 将用户列表数据转换成 options 数组格式
        member_list.value = userList.map((user) => ({
            value: user.id,
            label: user.username
        }));
        console.log('用户列表:', member_list.value);
    } catch (error) {
        console.error('Error fetching user list:', error);
    }
}

// 获取项目详情
const get_project_details = async () => {
    axios.get('http://localhost:8081/api/project', {
        params: {
            id: project_id
        }
    }).then(
        response => {
            console.log('project detail', response.data);
            project_form.value = response.data.data;
            console.log('project_time', project_form.value.startDate);
            console.log(project_form.value.endDate)
        }
    )
}

const onSubmit = () => {
    console.log(form.value)
    let formValue = form.value;
    if (!formValue.task_name || !formValue.task_description || !formValue.startDate || !formValue.endDate || !formValue.member) {
        alert('请完整填写任务信息！');
        return;
    }
    else if (form.value.startDate < project_form.value.startDate || form.value.endDate > project_form.value.endDate) {
        alert("任务日期必须处于项目日期之间！")
        form.value.startDate = '';
        form.value.endDate = '';
        return;
    }
    axios.post('http://localhost:8081/api/createTask', form.value)
        .then(response => {
            if (response.data.status == 'success') {
                router.push({ path: `/project/${project_id}` });
            }
            else {
                alert('任务创建失败');
            }
            console.log('服务器响应:', response);
            // 成功回调
        })
        .catch(error => {
            console.error('There was an error!', error);
            // 失败回调
        });
    console.log('submit!')
}

watch(selected_id, () => {
    selected_list.value.length = 0;
    for (let i = 0; i < selected_id.value.length; i++) {
        let id = selected_id.value[i];
        let new_member = member_list.value.find(element => element.value == id);
        selected_list.value.push(new_member);
    }
    console.log(selected_list.value)
    form.value.member = selected_list.value.map((member) => ({
        id: member.value,
        username: member.label
    }));
})

watch(form, () => {
    if (form.value.startDate && form.value.startDate < project_form.value.startDate){
        alert("任务开始日期必须晚于项目开始日期！")
        form.value.startDate = '';
    }
    if (form.value.startDate && form.value.startDate > project_form.value.endDate){
        alert("任务开始日期必须早于项目结束日期！")
        form.value.startDate = '';
    }
    if (form.value.endDate && form.value.endDate > project_form.value.endDate){
        alert("任务结束日期必须早于项目结束日期！")
        form.value.endDate = '';
    }
    if (form.value.endDate && form.value.endDate < project_form.value.startDate){
        alert("任务结束日期必须晚于项目开始日期！")
        form.value.endDate = '';
    }
    if (form.value.startDate && form.value.endDate && form.value.startDate >= form.value.endDate) {
        alert("结束日期必须晚于开始日期！")
        form.value.startDate = '';
        form.value.endDate = '';
    }
}, { deep: true })

onMounted(() => {
    get_member_list();
    get_project_details();
});
</script>

<style scoped>
.head {
    width: 90%;
    font-size: 50px;
    padding-top: 50px;
    padding-left: 70px;
    margin-left: 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
}

.main {
    position: fixed;
    top: 90px;
    left: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 100px);
    background-color: #fff;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    overflow-y: scroll;
}

.form {
    float: left;
    margin-top: 50px;
    margin-bottom: 50px;
    width: 100%;
    background-color: #fff;
    border-radius: 20px;
    padding: 30px;
    padding-bottom: 0;
}

.basic-info {
    float: left;
    position: relative;
    width: 50%;
    height: 100%;
    margin-left: 5%;
}

.el-form-item--large {
    --el-form-label-font-size: 16px;
    margin-bottom: 30px;

}

.member {
    margin-top: 50px;
    margin-bottom: 50px;
    margin-right: 5%;
    padding: 25px;
    float: right;
    width: 30%;
    height: 100%;
    background-color: #fff;
    border-radius: 20px;
}

.info {
    float: left;
    width: 100%;
    height: auto;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.btn {
    float: left;
    margin-left: 80px;
    margin-top: 50px;
}

.body {
    float: left;
    margin-left: 10%;
    margin-top: 50px;
    width: 80%;
    height: auto;
}

.head {
    width: 90%;
    font-size: 50px;
    padding-top: 50px;
    padding-left: 70px;
    margin-left: 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
}

.member-head {
    width: 100%;
    text-align: left;
    font-size: 18px;
    font-weight: 600;
}

.admin {
    margin-top: 30px;
}

.other {
    margin-top: 20px;
    width: 93%;
}

.admin p {
    font-size: 13px;
}

.other p {
    font-size: 13px;
}

.admin-name {
    font-size: 16px;
    font-weight: 500;
    margin-left: 20px;
    height: 30px;
    width: 100px;
    line-height: 30px;
    text-align: center;
    overflow: hidden;
    border-radius: 15px;
    background-color: rgb(255, 233, 213);
    color: rgb(224, 115, 6);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.member-name {
    float: left;
    font-size: 16px;
    font-weight: 500;
    margin-left: 20px;
    margin-top: 20px;
    height: 30px;
    width: 100px;
    line-height: 30px;
    text-align: center;
    overflow: hidden;
    border-radius: 15px;
    background-color: rgb(224, 252, 224);
    color: rgb(4, 159, 32);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.other-name {
    font-size: 16px;
    font-weight: 500;
    margin-left: 20px;
}

.delete {
    float: right;
    margin-right: 10%;
    width: 120px;
    height: 40px;
    font-size: 16px;
    border-radius: 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.create-btn {
    margin-left: 10px;
    margin-right: 50px;
    width: 120px;
    height: 40px;
    font-size: 16px;
    border-radius: 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.cancel-btn {
    width: 120px;
    height: 40px;
    font-size: 16px;
    border-radius: 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
</style>