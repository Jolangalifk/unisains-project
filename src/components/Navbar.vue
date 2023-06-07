<script>
import { ref, onMounted } from 'vue'
const isLoggedIn = ref(false)
const username = ref('')

onMounted(async () => {
    isLoggedIn.value = checkUserloginStatus()

    function checkUserloginStatus() {
        // get token
        const token = localStorage.getItem('token')
        return token ? true : false
    }

    const userInfo = localStorage.getItem('user-info')
    if (userInfo) {
        username.value = JSON.parse(userInfo)
    }

    console.log(isLoggedIn.value)
})

</script>

<template>
    <div class="navbar">
        <div class="logo">
            <img src="@/assets/icon/unisains-logo-dark.svg" alt="">
        </div>
        <div class="menu">
            <ul>
                <li><a href="#">Beranda</a></li>
                <li><a href="#">Kursus</a></li>
                <li><a href="#">Tentang kami</a></li>
            </ul>
        </div>
        <div class="account">
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
                <router-link to="/cart">
                    <img src="@/assets/icon/cart-icon.svg" alt="">
                </router-link>
            </button>
            <button class="profile btn">
                <router-link to="/profile">
                    <div class="avatar">
                        <img src="@/assets/image/profile-ex.png" alt="">
                    </div>
                </router-link>
            </button>
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
    width: 50%;
    align-items: center;
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

.account {
    width: 16%;
    display: flex;
    justify-content: space-between;
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

.account button {
    width: 120px;
    height: 50px;
    border-radius: 50px;
    cursor: pointer;
    outline: none;
    font-family: poppins;
}

.account-before-login button {
    width: 120px;
    height: 50px;
    border-radius: 50px;
    cursor: pointer;
    outline: none;
    font-family: poppins;
}

.account .login {
    background-color: transparent;
    display: flex;
    color: black;
    border: none;
    align-items: center;
    padding-left: 30px;
}

.account-before-login .login {
    background-color: transparent;
    display: flex;
    color: black;
    border: none;
    align-items: center;
    padding-left: 30px;
}

.account .login a {
    text-decoration: none;
    color: black;
    font-size: 18px;
    font-weight: 600;
    margin-top: 28px;
    margin-right: 20px;
}

.account-before-login .login a {
    text-decoration: none;
    color: black;
    font-size: 18px;
    font-weight: 600;
    margin-top: 28px;
    margin-right: 20px;
}

.account .register {
    background-color: black;
    display: flex;
    color: white;
    border: none;
    align-items: center;
    padding-left: 30px;
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

.account .register a {
    text-decoration: none;
    color: white;
    font-size: 18px;
    font-weight: 600;
}

.account-before-login .register a {
    text-decoration: none;
    color: white;
    font-size: 18px;
    font-weight: 600;
}
</style>