<template>
  <div class="card" @click="linkTo">
    <div class="title-and-icon">
      <!-- <img src="/src/assets/images/logo.jpg" alt="项目图标" class="icon"> -->
      <router-link :to="`/project/${project.id}`">
        <a class="title">{{ project.name }}</a>
      </router-link>
      <div class="status" :style="{ 'background-color': color }">{{ status }}</div>
    </div>
    <div class="info">
      <p>{{ project.description }}</p>
      <el-descriptions class="admin">
        <el-descriptions-item label="管理员">{{ project.admin }}</el-descriptions-item>
        <el-descriptions-item label="开始时间">{{ project.startDate }}</el-descriptions-item>
        <el-descriptions-item label="结束时间">{{ project.endDate }}</el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps({
  project: Object
});
const project = ref(props.project);
const status = ref('');
const color = ref('');
const linkTo = () => {
  router.push(`/project/${project.value.id}`);
}
const getStatus = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // 月份从 0 开始，所以要加 1，并补零
  const day = ('0' + currentDate.getDate()).slice(-2); // 补零
  // 拼接成 yyyy-mm-dd 格式的字符串
  const formattedCurrentDate = `${year}-${month}-${day}`;
  if(formattedCurrentDate < project.value.startDate){
    status.value = '未开始';
    color.value = '#75bafa';
  }else if(formattedCurrentDate >= project.value.startDate && formattedCurrentDate <= project.value.endDate){
    status.value = '进行中';
    color.value = '#7bf7a4';
  }
  else{
    status.value = '已结束';
    color.value = '#ff7b7b';
  }
}
onMounted(() => {
  getStatus();
})
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

a {
  color: #0969da;
  text-decoration: none;
}
</style>