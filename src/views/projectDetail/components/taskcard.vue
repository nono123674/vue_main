<template>
    <div class="card" @click="linkTo">
      <div class="title-and-icon">
        <router-link :to="{ path: '/task', query: { task_id:task_id} }">
          <a class="title">{{ task.task_name }}</a>
        </router-link>
        <div class="status" :style="{ 'background-color': color }">{{ status }}</div>
      </div>
      <div class="info">
        <p>{{ task.task_description }}</p>
        <el-descriptions>
          <el-descriptions-item label="开始时间">{{ task.startDate }}</el-descriptions-item>
          <el-descriptions-item label="结束时间">{{ task.endDate }}</el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
import { useRouter } from 'vue-router';
const props = defineProps({
  task: Object
});
const router = useRouter();
  const task = ref(props.task);
  const task_id = ref();
  task_id.value = task.value.task_id;
  console.log('gadsgasd',task_id);
  
const status = ref('未完成');
const color = ref('#ff7b7b');

if(task.value.task_status == 0){
  status.value = '未完成';
  color.value = '#ff7b7b';
}
else if(task.value.task_status == 1){
  status.value = '已完成';
  color.value = '#7bf7a4';
}
const linkTo = () => {
  router.push(`/task?task_id=${task_id.value}`);
}

  // const taskid = ref()
  </script>
  
  <style scoped>
  .card {
    width: 80%;
    border: 1px solid #ccc;
    padding: 10px;
    margin: 20px 100px;
    border-radius: 20px;
    background-color: #fafcfd;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  }
  
  .card:hover {
    box-shadow: rgba(0, 0, 0, 0.20) 0px 4px 12px;
  }
  
  .title-and-icon {
    height: 50px;
    margin-left: 30px;
    margin-top: 15px;
  }
  
  .icon {
    float: left;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  
  .title {
    font-size: 25px;
    margin-left: 20px;
    line-height: 60px;
  
  }
  
  .info {
    margin: 10px 50px;
  }

  .info p {
    font-size: 16px;
    line-height: 24px;
  }
  
  a {
    color: #0969da;
    text-decoration: none;
  }

  .status {
  float: right;
  margin-right: 30px;
  margin-top: 10px;
  height: 40px;
  width: 100px;
  line-height: 40px;
  text-align: center;
  border-radius: 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
.status:hover {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 4px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}


  </style>