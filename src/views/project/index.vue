<template>
    <div class="project">
        <el-container>
            <el-aside width="200px"  class="project-aside">
                <projectNav />
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>
<script setup>
    import projectNav from './components/projectNav.vue'
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