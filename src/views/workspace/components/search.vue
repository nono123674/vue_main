<template>
    <el-input
        v-model="input"
        placeholder="搜索"
        class="search" @input="search"
    />
</template>

<script setup>
    import { ref,  defineEmits} from 'vue'
    const input = ref('')
    const emit = defineEmits(['search']); // 声明组件支持的自定义事件
    const search = () => {
        emit('search', input.value);
    };
</script>

<style scoped>
    .search {
        margin-left: 100px;
        height: 40px;
        width: 50%;
        font-size: large;
    }
    .search:hover {
        height: 42px;
    }
</style>