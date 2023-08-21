<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const myCourse = ref([]);

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
        myCourse.value = response.data.data.my_course;
        console.log(myCourse.value)
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    fetchMyCourseData();
})
</script>
<template>
    <div class="container-mycourse">
        <div class="nav">
            <div class="back-btn">
                <img src="../assets/icon/arrow-left-white.svg" alt="" />
                <router-link to="/profile">Kembali</router-link>
            </div>
            <div class="mycourse-text">
                <h1>Pengaturan akun</h1>
            </div>
        </div>
        <div class="course-container">
            <div class="course-content-row">
                <div class="card-course" v-for="my_course in myCourse" :key="my_course.id">
                    <router-link :to="'/course/module/' + my_course.course_id">
                        <div class="card-course-image">
                            <img :src="my_course.course.thumbnail" alt="">
                        </div>
                        <div class="card-course-text">
                            <h3>{{ my_course.course.title_course }}</h3>
                            <p>{{ my_course.course.description }}</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.container-mycourse {
    width: 100vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.nav{
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 50px 100px 30px 100px;
    background-color: white;
    z-index: 9999;
    position: fixed;
}
.back-btn {
    width: 170px;
    height: 70px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #B83B5E;
    border-radius: 50px;
}
.back-btn img {
    width: 45px;
    height: 45px;
    margin-left: 15px;
}
.back-btn a {
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    margin-left: 7px;
    text-decoration: none;
}
.mycourse-text h1 {
    font-size: 42px;
    font-weight: 600;
    color: #6A2C70;
    margin-left: 35px;
}

.course-container {
    width: 100%;
    height: fit-content;
    padding: 0 100px;
    position: relative;
    margin-top: 200px;
    margin-bottom: 100vh;
}

.course-container .course-content-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
}

.course-content-row .card-course {
    width: 380px;
    height: fit-content;
    border: 1px solid #C1C1C1;
    border-radius: 10px;
    overflow: hidden;
}

.card-course a {
    text-decoration: none;
    color: #000000;
}

.card-course .card-course-image {
    width: 100%;
    height: 190px;
}

.card-course .card-course-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.card-course .card-course-text {
    width: 100%;
    height: 100%;
    padding: 20px;
}

.card-course-text h3 {
    font-size: 18px;
    font-weight: bold;
    line-height: 1.5;
    margin-bottom: 10px;
    
}

.card-course-text p {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: justify;
}
</style>