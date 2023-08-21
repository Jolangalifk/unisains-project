<script setup>
import NavbarProfileSettings from '../components/NavbarProfileSettings.vue';
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';

const profileData = ref(null);

const getUserToken = () => {
    const token = localStorage.getItem('token');
    return token ? token.replace(/['"]+/g, '') : '';
};

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
        console.log(profileData.value);
        myCourseHasCourses.value = response.data.my_course.length > 0;
    } catch (error) {
        console.error(error);
    }
};

onMounted(fetchProfileData);
</script>

<template>
    <div class="profile-settings">
        <NavbarProfileSettings />
        <div class="profile-settings-content">
            <div class="title-edit-password">
                <h1>Halo {{ profileData && profileData.data.user.first_name }} {{ profileData &&
                    profileData.data.user.last_name }}!, jika anda ingin mengubah sandi
                    silahkan klik button di bawah ini</h1>
            </div>
            <div class="btn-edit">
                <router-link to="/forgot-password">
                    <button>Ubah sandi</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.profile-settings {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.profile-settings-content {
    width: 1300px;
    height: 700px;
    display: flex;
    margin-left: 305px;
    margin-top: 10px;
    flex-direction: column;
    align-items: center;
}

.title-edit-password {
    width: 800px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 200px;
}

.title-edit-password h1 {
    font-size: 24px;
    font-weight: 600;
}

.btn-edit button {
    width: 200px;
    height: 80px;
    border: none;
    outline: none;
    border-radius: 20px;
    background-color: #B83B5E;
    color: #fff;
    font-size: 20px;
    font-family: poppins;
    font-weight: 500;
    cursor: pointer;
    margin-top: 30px;
}
</style>