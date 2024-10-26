<template>
    <router-link to="/login">
        <el-button type="danger" class="cancel-btn" @click="exit">退出</el-button>
    </router-link>
    <div class="username">{{ username }}</div>
</template>

<script setup>
import { ref } from 'vue';
const username = ref(window.sessionStorage.username);
const exit = () => {
    sessionStorage.clear();
}
</script>
<style scoped>
.cancel-btn {
    float: right;
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 20px;
    width: 50px;
    height: 20px;
    font-size: 13px;
    border: 0.5px solid black;
}

.username {
    float: right;
    color: black;
    font-size: large;
    width: auto;
    height: 30px;
    margin-top: 15px;
    text-align: center;
    line-height: 30px;
    margin-right: 0px;
    border-radius: 15px;
    /* background-color: rgb(255, 233, 213); */
    /* color: rgb(224, 115, 6); */
}

.admin-name {
    font-size: 16px;
    font-weight: 500;
    margin-left: 20px;


    line-height: 30px;
    text-align: center;

}
</style>