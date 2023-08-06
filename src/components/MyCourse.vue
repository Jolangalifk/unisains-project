<script setup>
import CardCourse from '../components/CardCourse.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';

const myCourseData = ref([]);
const myCourseExist = ref(false);

const getUserToken = () => {
    const token = localStorage.getItem('token');
    return token ? token.replace(/['"]+/g, '') : '';
};

const fetchMyCourseData = async () => {
    const userToken = getUserToken();
    console.log(userToken);
    try {
        const response = await axios.get('https://admin.unisains.com/api/v1/profile/show', {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
        if (response.data.my_course.length > 0) {
            myCourseData.value = response.data.my_course;
            myCourseExist.value = true;
        } else {
            myCourseExist.value = false;
        }
    } catch (error) {
        console.error('Gagal mengambil data kursus dari profil.');
    }
};

onMounted(fetchMyCourseData);
</script>

<template>
    <div class="my-course">
        <div class="course-text">
            <h1>Kursus saya</h1>
        </div>
        <div class="course-content" v-if="myCourseExist">
            <div class="course-content-row">
                <CardCourse v-for="course in myCourseData" :key="course.id" :course="course" />
            </div>
        </div>
        <div v-else>
            <p>Anda belum memiliki kursus.</p>
        </div>
    </div>
</template>

<style scoped>
.my-course {
    width: 1350px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 100px;
}

.course-text h1 {
    font-size: 32px;
    font-weight: 700;
    margin: 65px 0 50px 0;
}

.course-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.course-content-row {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
}
</style>