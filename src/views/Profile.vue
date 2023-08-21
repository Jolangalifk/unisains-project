<script setup>
import Navbar from '../components/Navbar.vue';
import Logout from '../components/Logout.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';

const myCourse = ref([]);
const profileData = ref(null);
const showPopup = ref(false);

const getUserToken = () => {
    const token = localStorage.getItem('token');
    return token ? token.replace(/['"]+/g, '') : '';
};

const logout = () => {
    showPopup.value = true;
}

const fetchProfileData = async () => {
    const userToken = getUserToken();
    console.log(userToken);
    try {
        const response = await axios.get('https://admin.unisains.com/api/v1/profile/show', {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
        profileData.value = response.data;
        myCourse.value = response.data.data.my_course;
        console.log(myCourse.value)
        console.log(profileData.value);
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    fetchProfileData();
})
</script>

<template>
    <main>
        <Navbar />
        <div class="profile">
            <div class="profile-sidebar">
                <div class="profile-wrapper">
                    <div class="profile-image">
                        <img :src="profileData && profileData.data.user.image" alt="">
                    </div>
                    <div class="profile-text">
                        <h3>{{ profileData && profileData.data.user.first_name }} {{ profileData &&
                            profileData.data.user.last_name }}</h3>
                        <p>{{ profileData && profileData.data.user.email }}</p>
                    </div>
                    <div class="profile-button">
                        <a><router-link to="/profile/profile-settings/edit-profile">Pengaturan akun</router-link></a>
                        <a><router-link to="/help-center">Bantuan</router-link></a>
                        <button @click="logout">Keluar</button>
                    </div>
                </div>
            </div>
            <div class="course-wrapper">
                <div class="my-course">
                    <div class="course-text">
                        <h1>Kursus saya</h1>
                    </div>
                    <div class="course-content">
                        <div class="course-content-row">
                            <div class="card-course" v-for="(my_course, index) in myCourse.slice(0, 3)" :key="my_course.id">
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
                <div class="more-course-btn" v-if="myCourse.length > 3">
                    <button>
                        <a><router-link to="/profile/my-course">Lihat lebih banyak</router-link></a>
                        <img src="@/assets/icon/arrow-right-orange.svg" alt="">
                    </button>
                </div>
            </div>
            <Logout v-if="showPopup" @close="showPopup = false" />
        </div>
    </main>
</template>

<style scoped>
.profile {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
}

.profile-sidebar {
    width: 400px;
    height: 100%;
}

.profile-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.profile-image img {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background-color: #fff;
    margin-top: 65px;
}

.profile-text h3 {
    font-size: 24px;
    font-weight: bold;
    color: #000000;
    margin-top: 40px;
    text-align: center;
}

.profile-text p {
    font-size: 18px;
    font-weight: 400;
    color: #989686;
    margin-top: 20px;
    text-align: center;
}

.profile-button {
    width: 265px;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 127px;
}

.profile-button a {
    font-size: 18px;
    font-weight: 400;
    color: #000000;
    margin-bottom: 20px;
    text-decoration: none;
}

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
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}

.profile-button button {
    width: 60px;
    height: 25px;
    border: none;
    display: flex;
    justify-content: start;
    align-items: start;
    background-color: transparent;
    cursor: pointer;
    font-size: 18px;
    color: #000000;
}

.course-wrapper {
    width: 1500px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.more-course-btn {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    margin-top: 50px;
}

.more-course-btn button {
    width: 260px;
    height: 75px;
    background-color: #F08A5D;
    border: none;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #FFFFFF;
}

.more-course-btn button a {
    font-size: 17px;
    font-weight: 700;
    color: #fff;
    text-decoration: none;
}

.more-course-btn button img {
    width: 45px;
    height: 45px;
    margin-left: 20px;
}

.course-content-row .card-course {
    width: 380px;
    height: fit-content;
    border: 1px solid #C1C1C1;
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.card-course:hover {
    transform: scale(1.01);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, .1);
}

.card-course a {
    text-decoration: none;
    color: #000000;
}

.card-course .card-course-image {
    position: relative;
    width: 100%;
    height: 190px;
    overflow: hidden;
}

.card-course .card-course-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.3s ease-in-out;
}

.card-course:hover .card-course-image img {
    transform: scale(1.1);
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

.more-course-btn button a,
.more-course-btn button img {
    transition: all 0.3s ease-in-out;
}

.more-course-btn button:hover a,
.more-course-btn button:hover img {
    color: #F08A5D;
    transform: translateX(20px);
}
</style>