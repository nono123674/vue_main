<template>
    <div class="main">
        <div class="head">
            修改项目
            <!-- <router-link to="/project"> -->
            <el-button type="danger" class="delete" @click="deleteproject">删除项目</el-button>
            <!-- </router-link> -->
        </div>
        <div class="body">
            <div class="info">
                <div class="basic-info">
                    <el-form :model="form" label-width="auto" style="max-width: 600px" class="form" size="large">
                        <el-form-item label="项目名称" class="label">
                            <el-input v-model="form.name" />
                        </el-form-item>
                        <el-form-item label="项目描述">
                            <el-input v-model="form.description" type="textarea" :rows="3" />
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
                    <div class="member-head">项目成员</div>
                    <div class=admin>
                        <p>管理员</p>
                        <div class="admin-name">{{ username }}</div>
                    </div>
                    <div class=other>
                        <p>其他成员</p>
                        <el-select-v2 v-model="selected_id" filterable :options="member_list" placeholder=""
                            style="width: 80%" multiple />
                        <div v-for="(member, index) in selected_list" :key="index">
                            <div class="member-name">{{ member.label }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <el-form-item class="btn">
                    <el-button type="success" @click="onSubmit" class='create-btn'>完成修改</el-button>
                    <router-link :to="`/project/${form.id}`">
                        <el-button type="danger" class="cancel-btn">取消修改</el-button>
                    </router-link>
                </el-form-item>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import { editProject, getMemberList, deleteProject } from '@/apis/api';

const router = useRouter();
const route = useRoute();
const username = ref(window.sessionStorage.getItem('username'));
const userid = parseInt(window.sessionStorage.getItem('userid'), 10);
const form = ref({
    id: 0,
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    adminId: userid,
    member: ''
})
const member_list = ref([]);
const selected_id = ref([])
const selected_list = ref([])

const get_member_list = async () => {
    try {
        let userList = await getMemberList();
        userList = userList.filter(item => item.id != userid);
        member_list.value = userList.map((user) => ({
            value: user.id,
            label: user.username
        }))
        console.log('用户列表:', member_list);
    } catch (error) {
        console.error('获取用户列表失败:', error);
    }
}

const onSubmit = () => {
    let formValue = form.value;
    console.log('表单内容：', formValue)
    if (!formValue.name || !formValue.description || !formValue.startDate || !formValue.endDate || !formValue.adminId || !formValue.member) {
        alert('请完整填写项目信息！');
        return;
    }
    editProject(form.value)
        .then(response => {
            if (response.status === 'success') {
                alert('项目修改成功');
                router.push(`/project/${form.value.id}`);
            } else {
                alert('项目修改失败');
            }
            console.log('服务器响应:', response);
            // 成功回调
        })
        .catch(error => {
            alert('项目修改失败');
            console.error('项目修改失败:', error);
            // 失败回调
        });
}

const deleteproject = () => {
    console.log('删除项目');
    console.log(form.value.id)
    deleteProject(form.value.id).then(response => {
        console.log(response);
        router.push('/project');
    })
}

watch(selected_id, () => {
    selected_list.value.length = 0;
    for (let i = 0; i < selected_id.value.length; i++) {
        let id = selected_id.value[i];
        let new_member = member_list.value.find(element => element.value == id);
        selected_list.value.push(new_member);
    }
    console.log('选择成员列表更新', selected_list.value)
    form.value.member = selected_list.value.map((member) => ({
        id: member.value,
        username: member.label
    }));
})

watch(form, () => {
    if (form.value.startDate && form.value.endDate && form.value.startDate >= form.value.endDate) {
        alert("结束日期必须晚于开始日期！")
        form.value.startDate = '';
        form.value.endDate = '';
    }
}, { deep: true })


onMounted(async () => {
    await get_member_list();
    const projectId = route.params.id;
    axios.get('http://localhost:8081/api/project', {
        params: {
            id: projectId
        }
    }).then(
        response => {
            console.log('project detail', response.data);
            form.value = response.data.data;
            selected_id.value = form.value.member.map(member => member.id);
            form.value.id = parseInt(projectId, 10);
        }
    );
});
</script>
<style scoped>
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

.el-form-item--large {
    --el-form-label-font-size: 16px;
    margin-bottom: 30px;

}

.basic-info {
    float: left;
    position: relative;
    width: 50%;
    height: 100%;
    margin-left: 5%;
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
</style>