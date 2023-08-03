<script setup>
import NavbarProfileSettings from '../components/NavbarProfileSettings.vue';
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';

const email = ref('');
const password = ref('');
const profileData = ref(null);

const getUserToken = () => {
    const token = localStorage.getItem('token');
    return token ? token.replace(/['"]+/g, '') : '';
};

const saveProfile = async () => {
    try {
        const token = getUserToken();
        if (token) {
            const formData = new FormData();
            formData.append('email', email.value);
            formData.append('password', password.value);

            await axios.post('https://admin.unisains.com/api/v1/profile/update', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Profile updated successfully!');
            // Show success notification
            alert('Data berhasil diubah');
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        // Show error notification
        alert('Data gagal diubah');
    }
};

onMounted(async () => {
    try {
        const token = getUserToken();
        if (token) {
            const timestamp = Date.now();
            const response = await axios.get(`https://admin.unisains.com/api/v1/profile/show?timestamp=${timestamp}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Response Data:', response.data);
            profileData.value = response.data;
            email.value = response.data.data.user.email;
            password.value = response.data.data.user.password;
            console.log('Email:', email.value);
        }
    } catch (error) {
        console.error('Error fetching profile data:', error);
    }
});
</script>

<template>
    <div class="profile-settings">
        <NavbarProfileSettings />
        <div class="profile-settings-content">
            <form @submit.prevent="saveProfile">
                <div class="wrapper-email">
                    <h1>Email</h1>
                    <div class="email-content">
                        <div class="custom-email">
                            <input v-model="email" type="text" name="" id="" placeholder="Email anda saat ini">
                        </div>
                        <button type="submit">Ubah</button>
                    </div>
                </div>
                <div class="wrapper-password">
                    <h1>Sandi</h1>
                    <div class="password-content">
                        <div class="custom-sandi">
                            <input type="text" name="" id="" placeholder="Kata sandi saat ini">
                        </div>
                        <div class="custom-sandi">
                            <input type="text" name="" id="" placeholder="Kata sandi baru">
                        </div>
                        <div class="custom-sandi">
                            <input type="text" name="" id="" placeholder="Konfirmasi kata sandi baru">
                        </div>
                    </div>
                    <button>Ubah sandi</button>
                </div>
            </form>
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
    align-items: flex-start;
}

form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.wrapper-email h1 {
    font-size: 20px;
    font-weight: 600;
    color: #000000;
    margin-bottom: 10px;
}

.wrapper-email {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;
}

.email-content {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.custom-email {
    width: 650px;
    height: 80px;
    border: 1px solid #c1c1c1;
    border-radius: 20px 0 0 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.custom-email input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 20px;
    font-family: poppins;
    font-weight: normal;
    color: black;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-left: 30px;
}

.email-content button {
    width: 150px;
    height: 80px;
    border: none;
    outline: none;
    border-radius: 0 20px 20px 0;
    background-color: #F08A5D;
    color: #fff;
    font-size: 20px;
    font-family: poppins;
    font-weight: 500;
    cursor: pointer;
}

.wrapper-password h1 {
    font-size: 20px;
    font-weight: 600;
    color: #000000;
    margin-bottom: 10px;
}

.wrapper-password {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;
}

.password-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.custom-sandi {
    width: 800px;
    height: 80px;
    border: 1px solid #c1c1c1;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-right: 30px;
    margin-bottom: 15px;
}

.custom-sandi input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 20px;
    font-family: poppins;
    font-weight: normal;
    color: black;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-left: 30px;
}

.wrapper-password button {
    width: 200px;
    height: 80px;
    border: none;
    outline: none;
    border-radius: 20px;
    background-color: #F08A5D;
    color: #fff;
    font-size: 20px;
    font-family: poppins;
    font-weight: 500;
    cursor: pointer;
    margin-top: 40px;
}
</style>