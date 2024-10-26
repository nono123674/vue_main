<template>
    <div class="aside">

        <div class="info">
            <div class="projectName">{{ project.name }}</div>
            <div class="description">
                {{ project.description }}
            </div>
            <span class="start-time">开始时间:{{ project.startDate }}</span><br>
            <span class="end-time">结束时间:{{ project.endDate }}</span>
        </div>

        <div class="member">
            <div class="member-head">项目成员</div>
            <div class=admin>
                <p>管理员</p>
                <div class="admin-name">{{ project.admin }}</div>
            </div>
            <div class=other>
                <p>其他成员</p>
                <el-scrollbar max-height="250px">
                    <p v-for="(member, index) in project.member" :key="index" class="scrollbar-demo-item">
                        {{ member.username }}
                    </p>
                </el-scrollbar>
            </div>
        </div>





    </div>
</template>

<script setup>

import { ref, watch } from 'vue';
const props = defineProps({
    project: Object
});
const project = ref(props.project);
console.log('nav', project);

watch(() => props.project, () => {
    console.log('jieshou', props.project);
    project.value = props.project;
})

</script>

<style scoped>
.projectName {
    color: #000;
    font-size: 20px;
    font-weight: 600;
    width: 200px;
    margin-left: 18px;
    margin-top: 10px;
    padding-top: 20px;
    overflow: hidden;
}

.aside {
    position: fixed;
    top: 90px;
    left: 10px;
    width: 240px;
    height: calc(100% - 100px);
    position: fixed;
    background-color: #fff;
    border-radius: 20px;
    border-right: 1px solid #ccc;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    overflow-y: scroll;
    overflow-x: hidden;
}

.info {
    width: 90%;
    margin-left: 5%;
    background-color: #fcf6f6;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}

.create_project {
    margin: 35px 25px;
    width: 150px;
    height: 40px;
    font-size: large;
    border: 1px solid #000;
}

.description {
    display: inline-block;
    width: 180px;
    animation: marquee 10s linear infinite;
    font-size: 15px;
    line-height: 22.5px;
    color: #000;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 18px;
}


.start-time,
.end-time {
    display: block;
    margin-left: 18px;
    font-size: 14px;
    font-weight: 500;
    color: grey;
    height: 10px;
    text-align: left;
}

.end-time{
    padding-bottom: 20px;
}

.member {
    width: 90%;
    margin-left: 5%;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    background-color: #f1faff;
    overflow: hidden;
}

.member-head {
    text-align: left;
    padding-top: 20px;
    margin-left: 18px;
    font-size: 18px;
    font-weight: 600;
}

.admin {
    margin-top: 30px;
    margin-left: 18px;
}

.admin-name {
    font-size: 16px;
    font-weight: 500;
    margin-left: 20px;
    height: 30px;
    width: 100px;
    line-height: 30px;
    text-align: center;
    overflow: hidden;
    border-radius: 20px;
    background-color: rgb(255, 233, 213);
    color: rgb(224, 115, 6);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.other {
    margin-left: 18px;
    margin-top: 20px;
    width: 93%;
}

.scrollbar-demo-item {
    float: left;
    font-size: 16px;
    font-weight: 500;
    margin-left: 20px;
    margin-top: 10px;
    height: 30px;
    width: 100px;
    line-height: 30px;
    text-align: center;
    overflow: hidden;
    border-radius: 20px;
    background-color: rgb(224, 252, 224);
    color: rgb(4, 159, 32);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
</style>