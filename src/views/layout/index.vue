<template>
    <div class="common-layout">
      <el-container>
        <el-header class="header">
            <Header />
        </el-header>
        
        <router-view></router-view>
      </el-container>
    </div>
  </template>
<script setup>
    import Header from './components/header.vue'
</script>
<style scoped>
    .el-header {
      padding: 0;
    }
</style>
<style>
    html {
      background-color: whitesmoke;
      overflow-x: hidden;
    }
    .admin .el-descriptions__body {
    background-color: #fafcfd;
    }
    .info .el-descriptions__body {
    background-color: #fafcfd;
    }
</style>
