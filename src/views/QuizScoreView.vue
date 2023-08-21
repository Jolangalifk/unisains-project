<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
import { useRoute } from 'vue-router';
import router from '@/router/index.js';

const route = useRoute();
let courseData = ref([]);
// Ambil data dari local storage
const userScore = ref(localStorage.getItem('userScore'));
let showRetryButton = ref(false);
let showBackButton = ref(false);

const getUserToken = () => {
    const token = localStorage.getItem('token');
    return token ? token.replace(/['"]+/g, '') : '';
};

// buat function kembali ke kursus yang sedang diambil dan hapus data skor dari local storage
const backToCourse = () => {
    localStorage.removeItem('userScore');
    router.push(`/detail-course/${route.params.id}`);
};

const retryQuiz = () => {
    router.push(`/quiz/${route.params.id}`);
};

const getCourseData = async () => {
    try {
        const token = getUserToken();
        const response = await axios.get(
            `https://admin.unisains.com/api/v1/course/learn/${route.params.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        courseData.value = response.data.course;
        console.log(courseData.value);
    } catch (error) {
        console.log(error);
    }
};

onMounted(() => {
    userScore.value = localStorage.getItem('userScore');
    showRetryButton.value = userScore.value < 80;
    showBackButton.value = userScore.value >= 80;
    
    getCourseData();
});
</script>

<template>
    <div class="container-score">
        <div class="title-congratulation">
            <h1>Selamat anda telah menyelesaikan quiz dari kursus ini!</h1>
        </div>
        <div class="title">
            <h1>dengan skor :</h1>
        </div>
        <div class="score">
            <h1>{{ userScore }}!</h1>
        </div>
        <div class="title-greetings">
            <h1>Kami dengan senang hati akan mengirimkan sertifikat kamu sebagai penghargaan atas pencapaian kamu dalam
                Kursus {{ courseData.title_course }}. Teruslah bersemangat dan teruslah belajar!</h1>
        </div>
        <div class="btn-try-next">
            <div v-if="showRetryButton" class="btn-try">
                <button @click="retryQuiz">
                    <img src="@/assets/icon/arrow-left-purple.svg" alt="">
                    <p>Ulangi kuis!</p>
                </button>
            </div>
            <div v-if="showBackButton" class="btn-next">
                <button @click="backToCourse">
                    <img src="@/assets/icon/arrow-left-purple.svg" alt="">
                    <p>Kembali ke kursus</p>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container-score {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #F08A5D;
}

.title-congratulation h1 {
    font-size: 38px;
    color: #fff;
    margin-bottom: 15px;
    font-weight: 600;
}

.title h1 {
    font-size: 26px;
    color: #fff;
    margin-bottom: 55px;
    font-weight: 600;
}

.score h1 {
    font-size: 130px;
    color: #fff;
    margin-bottom: 55px;
    font-weight: 600;
}

.title-greetings {
    width: 1333px;
    text-align: center;
}

.title-greetings h1 {
    font-size: 32px;
    color: #fff;
    font-weight: 400;
    margin-bottom: 100px;
}

.btn-try-next {
    width: 1333px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.btn-try button {
    width: 250px;
    height: 70px;
    background-color: #6A2C70;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border: none;
    cursor: pointer;
}

.btn-try button img {
    margin-left: 10px;
}

.btn-try button p {
    font-size: 20px;
    color: #fff;
    font-weight: 600;
    margin-left: 20px;
}

.btn-next button {
    width: 300px;
    height: 70px;
    background-color: #6A2C70;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border: none;
    cursor: pointer;
}

.btn-next button img {
    margin-left: 10px;
}

.btn-next button p {
    font-size: 20px;
    color: #fff;
    font-weight: 600;
    margin-left: 20px;
}</style>
