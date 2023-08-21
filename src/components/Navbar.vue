<script setup>
import { ref, onMounted } from 'vue';
import Logout from './Logout.vue';
import axios from 'axios';

const profileData = ref({});
const isLoggedIn = ref(false);
const showProfileMenu = ref(false);
const showPopup = ref(false);
const username = ref('');

const getUserToken = () => {
    const token = localStorage.getItem('token');
    return token ? token.replace(/['"]+/g, '') : '';
};

const toggleProfileMenu = () => {
    showProfileMenu.value = !showProfileMenu.value;
};

const logout = () => {
    showPopup.value = true;
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
        profileData.value = response.data.data.user;
    } catch (error) {
        console.error(error);
    }
};

onMounted(async () => {
    isLoggedIn.value = checkUserloginStatus();

    function checkUserloginStatus() {
        // get token
        const token = localStorage.getItem('token');
        return token ? true : false;
    }

    const userInfo = localStorage.getItem('user-info');
    if (userInfo) {
        const parsedUserInfo = JSON.parse(userInfo);
        username.value = parsedUserInfo.first_name + ' ' + parsedUserInfo.last_name;
    }

    console.log(isLoggedIn.value);
    await fetchProfileData();
});
</script>

<template>
    <div class="navbar">
        <div class="logo">
            <button>
                <router-link to="/"><img src="@/assets/icon/unisains-logo-dark.svg" alt=""></router-link>
            </button>
        </div>
        <div class="menu">
            <ul>
                <li>
                    <router-link to="/">Beranda</router-link>
                </li>
                <li>
                    <router-link to="/course">Kursus</router-link>
                </li>
                <li>
                    <router-link to="/about">Tentang Kami</router-link>
                </li>
            </ul>
        </div>
        <div class="account-after-login" v-if="isLoggedIn">
            <button class="search btn">
                <router-link to="/search">
                    <img src="@/assets/icon/search-icon.svg" alt="">
                </router-link>
            </button>
            <button class="cart btn">
                <router-link to="/cart-course">
                    <img src="@/assets/icon/cart-icon.svg" alt="">
                </router-link>
            </button>
            <div class="profile-container" v-if="profileData">
                <button class="profile-btn" @click="toggleProfileMenu">
                    <div class="avatar">
                        <img :src="profileData.image" alt="">
                    </div>
                </button>
                <!-- Profile Menu -->
                <div class="profile-menu" v-if="showProfileMenu" @click="hideProfileMenu">
                    <div class="profile-item-account">
                        <div class="profile-content-account">
                            <router-link to="/profile">
                                <img :src="profileData.image" alt="">
                            </router-link>
                            <div class="profile-info-account">
                                <h3>{{ profileData.first_name }} {{ profileData.last_name }}</h3>
                                <p>{{ profileData.email }}</p>
                            </div>
                        </div>
                        <hr class="profile-divider">
                    </div>
                    <div class="profile-item">
                        <div class="profile-content">
                            <div class="profile-info">
                                <ul>
                                    <li><router-link to="/learn-course">Pembelajaran saya</router-link></li>
                                    <li><router-link to="/cart-course">Keranjang</router-link></li>
                                    <li><router-link to="/wishlist">Daftar keinginan</router-link></li>
                                </ul>
                            </div>
                        </div>
                        <hr class="profile-divider">
                    </div>
                    <div class="profile-item">
                        <div class="profile-content">
                            <div class="profile-info">
                                <ul>
                                    <li><router-link to="/profile/profile-settings/edit-profile">Pengaturan Akun</router-link></li>
                                    <li><router-link to="/history-course">Riwayat transaksi</router-link></li>
                                </ul>
                            </div>
                        </div>
                        <hr class="profile-divider">
                    </div>
                    <div class="profile-item">
                        <div class="profile-content">
                            <div class="profile-info">
                                <ul>
                                    <li><router-link to="/help-center">Bantuan</router-link></li>
                                    <li><span @click="logout">Keluar</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <Logout v-if="showPopup" @close="showPopup = false" />
                </div>
            </div>
        </div>
        <div class="account-before-login" v-else>
            <button class="login"><router-link to="/login">Masuk</router-link></button>
            <button class="register"><router-link to="/register">Daftar</router-link></button>
        </div>
    </div>
</template>

<style scoped>
.navbar {
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 10%;
    background-color: #fff;
}

.logo {
    width: 10%;
}

.logo button {
    background-color: transparent;
    border: none;
    cursor: pointer;
}

.logo img {
    width: 150px;
    height: 60px;
}

.menu {
    width: 40%;
}

.menu ul {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.menu ul li {
    list-style: none;
}

.menu ul li a {
    text-decoration: none;
    color: #000;
    font-size: 18px;
    font-weight: 600;
}

.account-after-login {
    width: 16%;
    display: flex;
    justify-content: space-between;
}

.account-after-login .btn {
    display: flex;
    justify-content: center;
    align-items: center;
}

.account-after-login button {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    cursor: pointer;
    outline: none;
    font-family: poppins;
}

.account-after-login .search {
    background-color: transparent;
    display: flex;
    color: black;
    border: none;
    align-items: center;
    padding-left: 30px;
}

.account-after-login .search a {
    text-decoration: none;
    color: black;
    font-size: 18px;
    font-weight: 600;
    margin-right: 20px;
}

.account-after-login .cart {
    background-color: transparent;
    display: flex;
    color: black;
    border: none;
    align-items: center;
    padding-left: 30px;
}

.account-after-login .cart a {
    text-decoration: none;
    color: black;
    font-size: 18px;
    font-weight: 600;
    margin-right: 20px;
}

.account-after-login .profile {
    background-color: transparent;
    display: flex;
    color: black;
    border: none;
    align-items: center;
    padding-left: 30px;
}

.account-after-login .profile a {
    text-decoration: none;
    color: black;
    font-size: 18px;
    font-weight: 600;
    margin-right: 20px;
}

.account-after-login .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    overflow: hidden;
}

.account-after-login .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.account-before-login {
    width: 16%;
    display: flex;
    justify-content: space-between;
}

.account-before-login button {
    width: 120px;
    height: 50px;
    border-radius: 50px;
    cursor: pointer;
    outline: none;
    font-family: poppins;
}

.account-before-login .login {
    background-color: transparent;
    display: flex;
    color: black;
    border: none;
    align-items: center;
    padding-left: 30px;
}

.account-before-login .login a {
    text-decoration: none;
    color: black;
    font-size: 18px;
    font-weight: 600;
    margin-right: 20px;
}

.account-before-login .register {
    background-color: black;
    display: flex;
    color: white;
    border: none;
    align-items: center;
    padding-left: 30px;
}

.account-before-login .register a {
    text-decoration: none;
    color: white;
    font-size: 18px;
    font-weight: 600;
}

.profile-btn {
    border: none;
    background-color: transparent;
    cursor: pointer;
}

.avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.profile-container {
    position: relative;
    display: inline-block;
}

.profile-menu {
    width: 300px;
    height: auto;
    position: absolute;
    top: 100%;
    left: -250px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 999;
}

.profile-item-account {
    width: 100%;
    margin-bottom: 15px;
}

.profile-item {
    width: 100%;
    margin-bottom: 15px;
}

.profile-content-account {
    display: flex;
    align-items: center;
    justify-content: center;
}

.profile-content {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.profile-content-account {
    margin: 20px;
}

.profile-content-account img {
    margin-right: 10px;
    width: 80px;
    height: 80px;
    border-radius: 100px;
}

.profile-content-account h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 5px;
    max-width: 170px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.profile-info {
    flex: 1;
}

.profile-info-account {
    flex: 1;
}

.profile-info-account p {
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 5px;
    max-width: 170px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.profile-info ul {
    list-style: none;
    padding: 0;
    margin-left: 20px;
}

.profile-info li {
    margin-bottom: 10px;
}

.profile-info li span {
    margin-right: 10px;
    cursor: pointer;
}

.profile-info li span:hover {
    font-weight: bold;
}

.profile-info li a {
    text-decoration: none;
    color: #000;
    font-weight: normal;
}

.profile-info li a:hover {
    font-weight: bold;
}

.profile-divider {
    width: 100%;
    height: 1px;
    background-color: #000;
    margin-bottom: 5px;
}
</style>