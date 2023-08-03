<template>
    <div v-if="isCoursePurchased" class="card-course">
        <div class="card-course-image">
            <img :src="courseData.image" alt="">
        </div>
        <div class="card-course-text">
            <h3>{{ courseData.name }}</h3>
            <p>{{ courseData.description }}</p>
            <ProgressBar :value="courseData.progress" />
        </div>
    </div>
    <div v-else>
        <p>Kursus belum dibeli.</p>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const courseId = routes.params.id; // Ganti dengan ID kursus yang sesuai
const courseData = ref(null);
const isCoursePurchased = ref(false);

const getUserToken = () => {
    const token = localStorage.getItem('token');
    return token ? token.replace(/['"]+/g, '') : '';
};

const fetchCourseData = async () => {
    try {
        const response = await axios.get(`https://admin.unisains.com/public/api/v1/course/learn/${courseId}`);
        courseData.value = response.data;
    } catch (err) {
        console.error('Gagal mengambil data kursus.');
    }
};

const fetchPurchasedCourses = async () => {
    const userToken = getUserToken();
    try {
        const response = await axios.get('https://admin.unisains.com/api/v1/profile/show', {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
        const myCourseIds = response.data.my_course.map(course => course.id);
        isCoursePurchased.value = myCourseIds.includes(courseId);
    } catch (err) {
        console.error('Gagal mengambil data profil.');
    }
};

onMounted(async () => {
    await fetchCourseData();
    await fetchPurchasedCourses();
});
</script>
  

<style scoped>
.card-course {
    width: 375px;
    height: 253px;
    border-radius: 20px;
    margin-right: 30px;
    margin-bottom: 30px;
    border: 1px solid #B83B5E;
    display: flex;
    flex-direction: column;
    padding: 10px;
    transition: all 0.3s ease-in-out;
}

.card-course:hover {
    transform: translateY(-5px);
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
}

.card-course-image img {
    width: 349px;
    height: 136px;
    border-radius: 20px;
}

.card-course-text {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 10px;
}

.card-course-text h3 {
    font-size: 14px;
    font-weight: 800;
    margin-bottom: 7px;
}

.card-course-text p {
    font-size: 11px;
    font-weight: 400;
    margin-bottom: 5px;
}
</style>