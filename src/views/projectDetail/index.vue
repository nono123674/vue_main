<template>
    <div class="project">
        <el-container>
            <el-aside width="200px"  class="project-aside">
                <Nav :project="project"></Nav>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Nav from './components/Nav.vue';
import axios from 'axios';
//import taskcard from './components/taskcard.vue';
const route = useRoute();
// 使用 ref 创建响应式变量

const project = ref({
    id: 0,
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    admin: '',
    adminId:'',
    member: ''
})
onMounted(async () => {
    const projectId = route.params.id;
    console.log(projectId)
    axios.get('http://localhost:8081/api/project', {
        params: {
            id: projectId
        }
    }).then(
        response => {
            // console.log('project detail1111', response.data);
            project.value = response.data.data;
            //console.log('nihai',project.value.member)
        }
    );
});
</script>


<style scoped>
    .project {
        border-right: 1px solid #ccc;
        width: auto;
        height: auto;
    }
    .el-main {
        display: block;
        flex: 1;
        flex-basis: auto;
        overflow: auto;
        box-sizing: border-box;
        padding: 1px 30px;
    }
</style>