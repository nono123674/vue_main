<template>
    <div class="main">
        <div class="main-head">
            <router-link to="/project">
                <el-button type="primary" class="back" >返回</el-button>
            </router-link>
            <div class="name">{{ projectName }}</div>
            <router-link :to="`/editProject/${projectid}`">
                <el-button type="primary" class="edit" v-if="userid == adminid">修改项目</el-button>
            </router-link>
            <router-link :to="{ path: '/create_task', query: { projectid: projectid } }">
                <el-button type="success" class="create_task">新建任务</el-button>
            </router-link>
        </div>

        <div class="main-body">
            <taskcard v-for="(task, index) in tasks" :key="index" :task="task"></taskcard>
        </div>
    </div>
</template>

<script setup>
import taskcard from './components/taskcard.vue';
import Search from '@/views/project/components/search.vue';
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { fetchTasks } from '@/apis/api';
import axios from 'axios';
//加一个函数  获取task
const route = useRoute();
const tasks = ref([]);
const projectName = ref('');
//这是打个比方  应该用projectid
const userid = window.sessionStorage.getItem('userid');
const projectid = ref([]);
const adminid= ref(0);
// 使用 onMounted 钩子在页面创建时从后端获取项目详情数据
onMounted(() => {
    // 获取项目ID，这里假设项目ID是通过路由参数传递的
    const id = route.params.id;
    projectid.value = id;
    //通过id获取project的信息
    fetch__project();
});

const fetch__project = async () => {
    axios.get('http://localhost:8081/api/project', {
        params: {
            id: projectid.value
        }
    }).then(
        response => {
            adminid.value = response.data.data.adminId;
            projectName.value = response.data.data.name;
        }
    );
}

const fetch_all_tasks = async () => {
    try {
        tasks.value = await fetchTasks(projectid.value);
        console.log('任务列表', tasks.value);
    } catch (error) {
        console.log('获取任务列表失败：', error);
    }
}

const handleSearch = (input) => {// 根据搜索关键字过滤项目信息
    console.log(input);
    tasks.value = tasks.value.filter(tasks => {
        return tasks.name.includes(input) || tasks.description.includes(input);
    });
};

onMounted(() => {
    setTimeout(() => {
        // 方法区
        fetch_all_tasks();
    }, 50);
    // 
});
</script>
<style scoped>
.name {
    float: left;
    line-height: 50px;
    margin-left: 50px;
}

.main {
    position: fixed;
    top: 90px;
    left: 270px;
    height: calc(100% - 100px);
    width: calc(100% - 280px);
    background-color: #fff;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
}

.main-head {
    width: 75%;
    height: 50px;
    position: fixed;
    font-size: 50px;
    padding-top: 50px;
    margin-left: 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    overflow: hidden;
}

.main-body {
    height: calc(100% - 160px);
    margin-top: 150px;
    overflow-y: scroll;
}


.create_task {
    margin-top: 5px;
    float: right;
    width: 120px;
    height: 40px;
    font-size: large;
    border-radius: 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.edit {
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 5px;
    float: right;
    width: 120px;
    height: 40px;
    font-size: large;
    border-radius: 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.back {
    float: left;
    margin-top: 5px;
    width: 80px;
    height: 40px;
    font-size: large;
    border-radius: 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
</style>