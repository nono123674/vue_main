<template>
    <div class="header">
        <div class="logo-and-appname">
            <div class="app-name">易+PM</div>
        </div>
        <div class="menu">
            <el-menu :default-active="currentActive" mode="horizontal" :ellipsis="false" router>
                <el-menu-item index="/">工作台</el-menu-item>
                <el-menu-item index="/project">项目</el-menu-item>
            </el-menu>
        </div>
        <router-link to="/login">
            <el-button type="danger" class="cancel-btn" @click="exit">退出</el-button>
        </router-link>
        <div class="username">{{ username }}</div>
    </div>

</template>
<script setup>
import {ref} from 'vue';
let path = window.location.pathname
let current = path.toLowerCase().includes('project') ? '/project' : '/'
const currentActive = current
const username = ref(window.sessionStorage.username);
const exit = () => {
    sessionStorage.clear();
}
</script>
<style scoped>
.app-name {
    float: left;
    color: black;
    text-align: center;
    font-size: larger;
    font-weight: 600;
    line-height: 60px;
    margin-left: 30px;
    margin-right: 50px;
}

.menu {
    display: inline-block;
    width: 500px;
    position: fixed;
}

.el-menu-item {
    font-size: large;
    font-weight: 500;
}

.el-menu--horizontal.el-menu {
    border-bottom: none;
    background-color: white;
}

.cancel-btn {
    float: right;
    margin-top: 15px;
    margin-left: 10px;
    margin-right: 30px;
    width: 70px;
    height: 30px;
    font-size: 13px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    border-radius: 20px;
}

.username {
    float: right;
    color: black;
    font-size: 18px;
    width: auto;
    height: 30px;
    margin-top: 15px;
    text-align: center;
    line-height: 30px;
    margin-right: 10px;
    border-radius: 15px;
}
.header {
    margin: 10px;
    width: auto;
    height: 60px;
    position: fixed;
    left: 0;
    right: 0;
    background-color: white;
    border-radius: 20px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}
</style>