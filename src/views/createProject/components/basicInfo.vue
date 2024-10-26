<template>
    <el-form :model="form" label-width="auto" style="max-width: 600px" class="form" size="large">
      <el-form-item label="项目名称" class="label">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="项目描述">
        <el-input v-model="form.description" type="textarea" :rows="3"/>
      </el-form-item>
      <el-form-item label="开始时间">
          <el-date-picker
            v-model="form.startDate"
            type="date"
            placeholder="选择开始时间"
            style="width: 100%"
          />
      </el-form-item>
      <el-form-item label="结束时间">
          <el-date-picker
            v-model="form.endDate"
            type="date"
            placeholder="选择结束时间"
            style="width: 100%"
          />
      </el-form-item>
      <div class="space"></div>
    </el-form>
  </template>
  
<script lang="ts" setup>
  import { reactive } from 'vue'
  
  // do not use same name with ref
  const form = reactive({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    // delivery: false,
    // type: [],
    // resource: '',
    // desc: '',
  })
  
  const onSubmit = () => {
    console.log('submit!')
  }
</script>

<style scoped>
    .form {
        position: absolute;
        left: 10%;
        top: 10%;
        width: 80%;
    }
    .el-form-item--large {
        --el-form-label-font-size: 18px;
        margin-bottom: 30px;
        
    }
    .space {
        height: 50px;
    }
</style>