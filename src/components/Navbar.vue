<script>
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
        <div class="account">
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

.account button {
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

.account .login a {
    text-decoration: none;
    color: black;
    font-size: 18px;
    font-weight: 600;
    margin-right: 20px;
}

.account .register {
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
</style>