<template>
    <div class="main-head">
        全部任务
        <Search @search="handleSearch"></Search>
    </div>
    <div class="main-body">
      <div class="list">
        <InfoCard v-for="task in tasks" :key="task.task_id"  :task="task"></InfoCard>
      </div>
    </div>
    
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import Search from './search.vue'
    import InfoCard from './taskInfoCard.vue'
    import axios from 'axios';

    const tasks = ref([]);
    const taskList = ref([]);
    const userid = window.sessionStorage.getItem('userid');

    const fetchtasks = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/allTask',{
          params:{
            userid:userid,
          }
        })
        tasks.value = response.data.data;
        taskList.value = tasks.value;
        console.log(response.data.data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    
    const handleSearch = (input) => {// 根据搜索关键字过滤项目信息
      if(input==''){
          tasks.value = [];
          tasks.value = taskList.value;
          return;
        }
      tasks.value = taskList.value.filter(task => {
      return task.task_name.includes(input) || task.task_description.includes(input);
      })
    };

    onMounted(() => {
      fetchtasks();
    });
</script>

<style scoped>
.list {
  height: calc(100% - 270px);
  overflow-y: scroll;
}

.main-head {
  width: calc(70% - 20px);
  position: fixed;;
  font-size: 50px;
  padding-top: 50px;
  margin-left: 12%;
  margin-right: 12%;
  padding-bottom: 30px;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
}

.main-body {
  position: fixed;
  height: 100%;
  width: 100%;
  margin-top: 160px;
  margin-left: 80px;
}
</style>