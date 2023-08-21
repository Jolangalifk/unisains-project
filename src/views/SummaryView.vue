<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios';
import { useRoute } from 'vue-router';

let isLoading = ref(true);
const route = useRoute();
let courseData = ref([]);
const summaryModules = ref({});

const getUserToken = () => {
    const token = localStorage.getItem('token');
    return token ? token.replace(/['"]+/g, '') : '';
};

const routeQuiz = computed(() => `/course/module/summary/quiz/${route.params.id}`);

const getSummaryModules = async () => {
    const token = getUserToken();
    try {
        const response = await axios.get(
            `https://admin.unisains.com/api/v1/course/learn/${route.params.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        summaryModules.value = response.data.course.summary_modules[0];
        courseData.value = response.data.course;
        console.log(summaryModules.value);
        console.log(courseData.value);
        isLoading.value = false;
    } catch (error) {
        console.log(error);
        isLoading.value = false;
    }
};

onMounted(getSummaryModules);
</script>
<template>
    <div class="summary-container" v-if="!isLoading">
        <div class="summary-title">
            <h1>Rangkuman {{ courseData.title_course }}</h1>
        </div>
        <div class="summary-content">
            <div class="border-left"></div>
            <div class="content">
                <div class="summary-video">
                    <iframe :src="summaryModules.video" frameborder="0" allowfullscreen></iframe>
                </div>
                <div class="summary-text">
                    <p>{{ summaryModules.summary }}</p>
                </div>
            </div>
            <div class="border-right"></div>
        </div>
        <div class="bottom-nav">
            <!-- <div class="btn btn-next_module">
                <img src="@/assets/icon/arrow-right.svg" alt="">
            </div> -->
            <!-- router link to /course/module/summary/quiz/score/:id dengan data id dari courseData.id -->
            <router-link :to="routeQuiz">
                <div class="btn btn-next_module">
                    <a>Quiz</a>
                    <img src="@/assets/icon/arrow-right.svg" alt="">
                </div>
            </router-link>
        </div>
    </div>
    <div v-else>
        <div class="else-content">
            <h3>Loading...</h3>
        </div>
    </div>
</template>
<style scoped>
.summary-container {
    width: 100vw;
    height: 100vh;
}

.summary-title {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    background-color: #fff;
    z-index: 9999;
}
.summary-content {
    padding-top: 100px;
    width: 100%;
    height: 750px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: relative;
}
.border-left {
    width: 130px;
    height: 70%;
    background-color: #6A2C70;
    border-radius: 0 20px 20px 0;
    position: fixed;
    top: 100px;
    left: 0;
}
.content{
    width: 60%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    padding-bottom: 100px;
}
.summary-text{
    width: 100%;
}

.summary-text p {
    font-size: 18px;
    font-weight: 500;
    text-align: justify;
}
.border-right {
    width: 130px;
    height: 70%;
    background-color: #6A2C70;
    border-radius: 20px 0 0 20px;
    position: fixed;
    top: 100px;
    right: 0;
}
.bottom-nav{
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 20px, #ffffff 90px);
    position: fixed;
    bottom: 0;
}
.bottom-nav .btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 170px;
    padding: 10px 15px 10px 30px;
    margin-right: 140px;
    border-radius: 50px;
    background-color: #6A2C70;
    transition: .5s;
    cursor: pointer;
}

.bottom-nav .btn:hover {
    background-color: #fff;
}

.bottom-nav .btn:hover a {
    color: #000;
}
.bottom-nav .btn img{
    transition: .5s;
}
.bottom-nav .btn:hover img {
    transform: translateX(10px);
}

.bottom-nav .btn a {
    font-size: 18px;
    font-weight: 500;
    color: #fff;
    text-decoration: none;
}
.summary-title h1 {
    font-size: 24px;
    font-weight: 600;
}

.summary-video {
    width: 100%;
    -moz-border-radius: 15px;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
    margin-bottom: 20px;
}

.summary-video iframe {
    width: 100%;
    height: 650px;
    -moz-border-radius: 15px;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
}

.else-content {
    width: 100%;
    height: 950px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
}

.else-content h3 {
    font-size: 24px;
    font-weight: 600;
    color: #6A2C70;
}
</style>