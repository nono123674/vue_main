<template>
    <div class="main">
        <div class="main-head">
            <div @click="back" class="back-btn">
                <el-button type="primary" class="back">返回</el-button>
            </div>
            <p>
                {{ task_details.task_name }}
            </p>
            <div class="btn">
                <el-button type="success" @click="finish_task" class='finish-btn' v-if="!task_details.task_status">完成任务</el-button>
                <el-button type="success"class='finish-btn' v-else="!task_details.task_status" disabled>已完成</el-button>
                <el-button type="danger" @click="delete_task" class='delete-btn'>删除任务</el-button>
            </div>

        </div>
        <div class="main-body">
            <div class="body">
                <div class="left">
                    <div class="second-head">{{ task_details.task_description }}</div>
                    <div class="time">
                        <div class="stime" style="display: flex">
                            <div class="time_title">开始时间:&nbsp</div>
                            <div>{{ task_details.startDate }}</div>
                        </div>
                        <div class="etime" style="display: flex">
                            <div class="time_title">结束时间:&nbsp</div>
                            <div>{{ task_details.endDate }}</div>
                        </div>
                    </div>

                    <el-button type="primary" @click="gpt" class='gpt-btn' :loading="loading">生成任务计划</el-button>
                </div>
                <div class="right">
                    <div class="member">
                        <div class="member-head">任务成员</div>
                        <div class=other>
                            <div v-for="(member, index) in task_details.member" :key="index">
                                <div class="member-name">{{ member.username }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="plan" v-if="plan != ''">
                    <pre class="plan-text">{{ plan }}</pre>
                </div>
            </div>
        </div>
    </div>
    <!-- <br><br><br><br>
    <div class="comment_title">评论区:</div>
    <div class="comment">
        <comment />
    </div> -->
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from "vue-router";
import comment from './components/comment.vue'
import axios from "axios";
const route = useRoute();
const router = useRouter();
const task_id = route.query.task_id;
const task_details = ref('');
const plan = ref('');
const loading = ref(false);
// 使用 onMounted 钩子，在组件挂载时发送请求获取任务详情
const get_task_details = async () => {
    try {
        // 发送 GET 请求获取任务详情
        const response = await axios.get('http://localhost:8081/api/getTaskDetails', {
            params: {
                task_id: task_id
            }
        });
        console.log('111111111', response)
        // 获取后端返回的任务详情数组
        task_details.value = response.data.data;
        console.log(task_details.value);

    } catch (error) {
        console.error('Error fetching task details:', error);
    }
}

const back = () => {
    router.go(-1);
}

const gpt = async () => {
    loading.value = true;
    axios.post('http://localhost:8081/api/summarySingleTask', task_details.value).then(
        response => {
            loading.value = false;
            console.log('plan:', response.data);
            plan.value = response.data.data;
        }
    )
}

// 完成任务，后端随意返回，主要把task.status改为1
const finish_task = async () => {
    axios.get('http://localhost:8081/api/editTaskStatus', {
        params: {
            task_id: task_id,
            task_status: 1,
        }
    }).then(
        response => {
            console.log('测试：', response.data);
            router.go(-1);
        }
    )
}

// 删除任务，后端随意返回，主要把task删除
const delete_task = async () => {
    axios.get('http://localhost:8081/api/deleteTask', {
        params: {
            task_id: task_id
        }
    }).then(
        response => {
            console.log('测试：', response.data);
            router.go(-1);
        }
    )
}

onMounted(() => {
    get_task_details();
});

// export default{
//     components:{comment},
//     data() {
//         return{
//             task_id: this.$route.params.task_id,
//             task_name: 'Task',
//             task_description: '芝士雪豹芝士雪豹芝士雪豹芝士雪豹芝士雪豹芝士雪豹芝士雪豹芝士雪豹芝士雪豹芝士雪豹芝士雪豹芝士雪豹芝士雪豹芝士雪豹芝士雪豹芝士雪豹芝士雪豹芝士雪豹芝士雪豹芝士雪豹芝士雪豹芝士雪豹芝士雪豹芝士雪豹芝士雪豹芝士雪豹芝士雪豹芝士雪豹芝士雪豹芝士雪豹',
//             start_time: '2024-01-01',
//             end_time: '2024-02-01',
//             task_members: ['ykn', 'ytw', 'zsh', 'xmy'],
//         }
//     }
// }
</script>

<style scoped>
.main {
    background-color: #fff;
    position: fixed;
    top: 90px;
    left: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 100px);
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    overflow-y: scroll;
}

.plan {
    float: left;
    margin-left: 15%;
    width: 50%;
    margin-top: 50px;
    margin-bottom: 50px;
    border-radius: 20px;
    background-color: #f4fcf0;
    /* padding: 30px; */
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    font-size: 16px;
    line-height: 24px;
}

.plan-text {
    padding: 40px;
    font-family: none;
}

pre {
    white-space: pre-line;
    word-wrap: break-word;
}

.time {
    float: left;
    width: 50%;
}

.main-body {
    height: 100%;
    width: 100%;
}

.body {
    float: left;
    width: 100%;
}

.right {
    float: right;
    width: 15%;
    /* height: 500px; */
    background-color: #f1faff;
    margin-top: 50px;
    margin-right: 15%;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}

.left {
    float: left;
    width: 50%;
    background-color: #fcf6f6;
    /* height: 500px; */
    margin-left: 15%;
    margin-top: 50px;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}

.btn {
    float: right;
    height: 40px;
    margin-top: 10px;
}

.test {
    height: 200px;
    width: 200px;
}

.main-head {
    width: 71%;
    height: 60px;
    font-size: 50px;
    padding-top: 50px;
    padding-left: 70px;
    margin-left: 13%;
    padding-bottom: 30px;
    border-bottom: 1px solid #ccc;
    /* background-color: #fff; */
}

.main-head p {
    display: inline-block;
    overflow: hidden;
    margin: 0;
    width: 50%;
    height: 60px;
}

.second-head {
    width: 80%;
    font-size: 20px;
    padding-top: 50px;
    padding-left: 10%;
    padding-right: 10%;
    padding-bottom: 10px;
    font-size: 20px;
    line-height: 30px;
}

.stime {
    width: 80%;
    font-size: 16px;
    padding-top: 20px;
    padding-left: 20%;
}

.etime {
    width: 80%;
    font-size: 16px;
    padding-top: 20px;
    padding-left: 20%;
    padding-bottom: 50px;
}

.time_title {
    color: #b3b0b0;
}

.comment {
    margin-left: 280px;
    width: 70%;
}

.member {
    padding-bottom: 20px;
}

.member-head {
    width: 100%;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 600;
    font-size: 20px;
}


.other p {
    font-size: 18px;
}

.member-name {
    /* float: left; */
    overflow: hidden;
    font-size: 16px;
    font-weight: 500;
    margin-left: calc(50% - 50px);
    margin-top: 20px;
    height: 30px;
    width: 100px;
    line-height: 30px;
    text-align: center;
    border-radius: 15px;
    background-color: rgb(224, 252, 224);
    color: rgb(4, 159, 32);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.comment_title {
    margin-left: 300px;
    font-size: 20px;
}

.finish-btn {
    float: left;
    margin-right: 30px;
    width: 100px;
    height: 40px;
    font-size: 16px;
    border-radius: 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.delete-btn {
    float: left;
    margin-left: 0px;
    width: 100px;
    height: 40px;
    font-size: 16px;
    border-radius: 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.gpt-btn {
    float: right;
    margin-right: 10%;
    margin-top: 30px;
    /* width: 120px; */
    height: 40px;
    font-size: 16px;
    border-radius: 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.back {
    float: left;
    margin-top: 10px;
    margin-right: 30px;
    width: 80px;
    height: 40px;
    font-size: large;
    border-radius: 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
</style>