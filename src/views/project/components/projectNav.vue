<template>
    <div class="aside">
        <router-link to="/createProject">
            <el-button type="success" class="create_project">新建项目</el-button>
        </router-link>
        <el-menu active-text-color="black" router :default-active="currentActive">
            <el-menu-item index="/project"><span>全部项目</span></el-menu-item>
            <el-menu-item index="/project/managed"><span>我管理的</span></el-menu-item>
            <el-menu-item index="/project/joined"><span>我参与的</span></el-menu-item>
        </el-menu>
    </div>
</template>
<style scoped>
.el-menu-item.is-active {
    background-color: #fafcfd;
    box-shadow: #e4e4e4 3px 3px 6px 0px inset, rgba(230, 230, 230, 0.961) -3px -3px 6px 1px inset;
}

.aside {
    width: 200px;
    height: calc(100% - 100px);
    position:fixed;
    top: 90px;
    left: 10px;
    border-radius: 20px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}

span {
    width: 180px;
    text-align: center;
    font-size: large;
    font-weight: 700;
}

.create_project {
        margin: 100px 25px;
        width: 150px;
        height: 40px;
        font-size: large;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        border-radius: 20px;
    }
.el-menu{
    border-right: none;
    margin: 0 10px;
    background-color: white;
}

.el-menu-item{
    margin: 10px 0;
    height: 40px;
    border-radius: 20px;
    background-color: white;
}
</style>
<script setup>
import {ref} from 'vue';
const currentActive = ref(window.location.pathname);
</script>