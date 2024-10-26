<template>
  <div class="main">
    <div class="main-head">
      <div class="head">我管理的
        <Search @search="handleSearch"></Search>
      </div>
    </div>
    <div class="main-body">
      <div class="list">
        <InfoCard v-for="project in projects" :key="project.id" :project="project"></InfoCard>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import Search from './components/search.vue'
import InfoCard from './components/projectInfoCard.vue'
import { fetchProjects } from '@/apis/api';

const projects = ref([]);
const projectList = ref([]);
const userid = window.sessionStorage.getItem('userid');

const fetch_all_projects = async () => {
  try {
    projectList.value = await fetchProjects('managed', userid);
    projects.value = projectList.value;

    console.log('列表', projectList.value)
  } catch (error) {
    console.log('获取项目列表失败：', error);
  }
}

const handleSearch = (input) => {// 根据搜索关键字过滤项目信息
  if (input == '') {
    projects.value = [];
    projects.value = projectList.value;
    return;
  }
  let searched_projects = projectList.value.filter(project => {
    return project.name.includes(input) || project.description.includes(input);
  });
  projects.value = JSON.parse(JSON.stringify(searched_projects));
};

onMounted(() => {
  fetch_all_projects();
});
</script>
<style scoped>
.head {
  margin-top: 40px;
  margin-left: 50px;
}

.main-head {
  position: fixed;
  top: 90px;
  left: 300px;
  width: 75%;
  height: 120px;
  font-size: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
}

.main-body {
  position: fixed;
  top: 230px;
  width: 100%;
  height: calc(100% - 200px);
}

.list {
  width: 85%;
  height: calc(100% - 50px);
  overflow-y: scroll;
}

.main {
  position: fixed;
  top: 90px;
  height: calc(100% - 100px);
  width: calc(100% - 240px);
  background-color: white;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
}
</style>