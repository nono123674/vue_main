<template>
    <div class="task">
        <el-main>
            <tasks />
        </el-main>
    </div>
</template>

<script setup>
import tasks from './components/tasks.vue'
</script>

<style scoped>
.task {
    position: fixed;
    top: 90px;
    left: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 100px);
    border-radius: 20px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.el-main {
    height: calc(100% - 10px);
    padding: 0px 30px;
}
</style>