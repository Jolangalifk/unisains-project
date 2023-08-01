<script setup>
import NavbarProfileSettings from '../components/NavbarProfileSettings.vue';
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';

const firstName = ref('');
const lastName = ref('');
const username = ref('');
const avatar = ref(null);
const previewImage = ref('');

const getUserToken = () => {
    const token = localStorage.getItem('token');
    return token ? token.replace(/['"]+/g, '') : '';
};

const handleFileChange = (event) => {
    avatar.value = event.target.files[0];
    // Show preview image before upload
    if (avatar.value) {
        const reader = new FileReader();
        reader.onload = () => {
            previewImage.value = reader.result;
        };
        reader.readAsDataURL(avatar.value);
    } else if (profileData.value && profileData.value.data.user.image) {
        // If there is no new avatar selected, show the current profile image as preview
        previewImage.value = profileData.value.data.user.image;
    } else {
        // Show default avatar if there is no current avatar
        previewImage.value = '../assets/img/avatar.png';
    }
};

const saveProfile = async () => {
    try {
        const token = getUserToken();
        if (token) {
            const formData = new FormData();
            formData.append('first_name', firstName.value);
            formData.append('last_name', lastName.value);
            formData.append('username', username.value);
            if (avatar.value) {
                formData.append('avatar', avatar.value);
            }

            await axios.post('https://admin.unisains.com/api/v1/profile/update', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Profile updated successfully!');
            // Show success notification
            alert('Data berhasil di ubah');
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        // Show error notification
        alert('Terjadi kesalahan saat mengedit data');
    }
};

const profileData = ref(null);

onMounted(async () => {
    try {
        const token = getUserToken();
        if (token) {
            // Append a random query parameter to the URL to avoid caching
            const timestamp = Date.now();
            const response = await axios.get(`https://admin.unisains.com/api/v1/profile/show?timestamp=${timestamp}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            profileData.value = response.data;

            // Set initial values for firstName, lastName, and username
            firstName.value = profileData.value.data.user.first_name;
            lastName.value = profileData.value.data.user.last_name;
            username.value = profileData.value.data.user.username;

            // Set initial preview image
            if (profileData.value && profileData.value.data.user.image) {
                previewImage.value = profileData.value.data.user.image;
            } else {
                previewImage.value = '../assets/img/avatar.png';
            }
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
                <div class="wrapper-name">
                    <h1>Nama pengguna</h1>
                    <div class="input-wrapper">
                        <div class="name">
                            <input type="text" placeholder="Nama depan" v-model="firstName">
                        </div>
                        <div class="name">
                            <input type="text" placeholder="Nama belakang" v-model="lastName">
                        </div>
                    </div>
                </div>
                <div class="username">
                    <h1>Username</h1>
                    <div class="username-input">
                        <input type="text" placeholder="Username" v-model="username">
                    </div>
                </div>
                <div class="avatar">
                    <h1>Tambah atau ganti avatar anda</h1>
                    <div class="avatar-wrapper">
                        <div class="preview-avatar">
                            <img :src="previewImage" alt="Preview Avatar">
                        </div>
                        <div class="upload-avatar">
                            <div class="custom-file-upload">
                                <span v-if="avatar">{{ avatar.name }}</span>
                                <label for="avatar">
                                    <img src="../assets/icon/upload_icon.svg">
                                </label>
                                <input type="file" name="avatar" id="avatar" @change="handleFileChange">
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn-save">Simpan</button>
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

.wrapper-name h1 {
    font-size: 20px;
    font-weight: 600;
    color: #000000;
    margin-bottom: 10px;
}

.wrapper-name {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;
}

.input-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.name {
    width: 400px;
    height: 80px;
    border: 1px solid #c1c1c1;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-right: 30px;
}

.name input {
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

.username h1 {
    font-size: 20px;
    font-weight: 600;
    color: #000000;
    margin-bottom: 10px;
}

.username-input {
    width: 400px;
    height: 80px;
    border: 1px solid #c1c1c1;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
}

.username-input input {
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

.avatar-wrapper {
    width: 1300px;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.avatar h1 {
    font-size: 20px;
    font-weight: 600;
    color: #000000;
}

.preview-avatar {
    width: 200px;
    height: 200px;
    border: 1px solid #c1c1c1;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    margin-right: 60px;
}

.preview-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
}

.upload-avatar {
    width: 570px;
    height: 80px;
    border: 1px solid #c1c1c1;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
}

.custom-file-upload {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 20px;
    font-family: poppins;
    font-weight: normal;
    color: black;
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    border-radius: 30px;
}

.custom-file-upload img {
    width: 40px;
    height: 40px;
}

.custom-file-upload label {
    width: 200px;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #401A43;
    border-radius: 0 20px 20px 0;
    cursor: pointer;
}

.custom-file-upload span {
    width: 370px;
    height: 100%;
    border: none;
    outline: none;
    font-size: 20px;
    font-family: poppins;
    font-weight: normal;
    color: black;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    padding-left: 30px;
}

input[type="file"] {
    display: none;
}

.btn-save {
    width: 200px;
    height: 80px;
    border: none;
    outline: none;
    font-size: 20px;
    font-family: poppins;
    font-weight: 500;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #F08A5D;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 70px;
}
</style>