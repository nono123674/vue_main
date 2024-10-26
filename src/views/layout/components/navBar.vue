<template>
  
  <div class="menu">
    <el-menu
      :default-active="currentActive"
      mode="horizontal"
      :ellipsis="false"
      router
    >
      <el-menu-item index="/">工作台</el-menu-item>
      <el-menu-item index="/project">项目</el-menu-item>
    </el-menu>
  </div>

</template>

<script setup>
  let path = window.location.pathname
  let current = path.toLowerCase().includes('project') ? '/project' : '/'
  const currentActive = current
</script>

<style scoped>
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
    background-color: whitesmoke;
  }
</style>