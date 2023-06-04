<template>
    <div class="body">
        <div class="container-login">
            <div class="login-wrapper">
                <div class="head-login">
                    <h1>Masuk</h1>
                    <p>dan cari kursus sains yang ingin anda pelajari!</p>
                </div>
                <form class="form-input" v-on:submit.prevent="Login">
                    <div class="form-group">
                        <label for="Email"></label>
                        <img src="@/assets/icon/email-icon.svg" alt="">
                        <input type="email" placeholder="Masukkan Email" v-model="email">
                    </div>
                    <div class="form-group">
                        <label for="Password"></label>
                        <img src="@/assets/icon/password-icon.svg" alt="">
                        <input type="password" placeholder="Masukkan Password" v-model="password">
                    </div>
                    <button type="submit" class="button-login">Login</button>
                </form>
                <div class="social-media-login">
                    <p>Atau masuk dengan</p>
                    <div class="social-media">
                        <button>
                            <img src="../assets/image/google-icon.png" alt="google">
                            <h3> Google </h3>
                        </button>
                        <button>
                            <img src="../assets/image/twitter-icon.png" alt="facebook">
                            <h3> Twitter </h3>
                        </button>
                    </div>
                </div>
                <br>
                <div class="register">
                    <p>Belum punya akun? <router-link to="/register">Daftar</router-link></p>
                </div>
            </div>

        </div>
        <img src="@/assets/image/astronomi-bg.png" alt="">
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        async Login() {
            try {
                let result = await axios.post('http://127.0.0.1:8000/api/v1/auth/login', {
                    email: this.email,
                    password: this.password,
                });
                console.log(result);
                if (result.status === 200 && result.data) {
                    alert('Login berhasil');
                    localStorage.setItem('user-info', JSON.stringify(result.data));
                    localStorage.setItem('token', JSON.stringify(result.data.token));
                    this.$router.push('/');
                }
            } catch (error) {
                console.error(error);
            }
        }

    },
}
</script>

<style scoped>
.body {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.container-login {
    width: 100%;
    padding: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-wrapper {
    width: 75%;
}

.head-login {
    padding-bottom: 30px;
}

.head-login h1 {
    text-align: left;
    font-size: 54px;
    font-weight: bold;
    color: black;
}

.head-login p {
    text-align: left;
    font-size: 20px;
    font-weight: normal;
    color: black;
}

.form-group {
    width: 100%;
    height: 80px;
    margin: 8px 0;
    padding: 0 8px;
    border: 1px solid #c1c1c1;
    border-radius: 30px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.form-group img {
    width: 35px;
    height: 35px;
    margin-right: 20px;
    margin-left: 20px;
}

.form-group input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 20px;
    font-family: poppins;
}

.button-login {
    width: 100%;
    height: 80px;
    border: none;
    border-radius: 30px;
    box-sizing: border-box;
    background-color: #F08A5D;
    color: white;
    font-size: 24px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    font-family: poppins;
}

.login {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-bottom: 30px;
}

.login .account {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-bottom: 30px;
}

.wrapper {
    width: 100%;
    height: 80px;
    margin: 8px 0;
    padding: 0 8px;
    border: 1px solid #c1c1c1;
    border-radius: 30px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.wrapper img {
    width: 35px;
    height: 35px;
    margin-right: 30px;
    margin-left: 30px;
}

.wrapper input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 20px;
    font-family: poppins;
    font-weight: normal;
    color: black;
}

.login .login-btn {
    width: 100%;
    height: 80px;
    border: none;
    border-radius: 30px;
    box-sizing: border-box;
    background-color: #F08A5D;
    color: white;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: poppins;
}

.social-media-login {
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: normal;
    color: black;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}

.social-media {
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: normal;
    color: black;
    display: flex;
    justify-content: space-around;

}

.social-media-login p {
    font-size: 16px;
    font-weight: normal;
    color: black;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding-bottom: 30px;
}

.social-media-login button {
    width: 210px;
    height: 80px;
    margin: 8px 0;
    padding: 0 8px;
    border: 1px solid #ccc;
    border-radius: 30px;
    box-sizing: border-box;
    background-color: white;
    color: white;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.social-media img {
    align-items: center;
    margin-right: 15px;
}

.social-media-login button img google {
    width: 35px;
    height: 35px;
}

.social-media-login button img twitter {
    width: 35px;
    height: 29px;
}

button h3 {
    font-family: poppins;
    text-align: left;
    font-size: 20px;
    font-weight: 600;
    color: black;
}

.register {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    color: black;
}

.register p {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    color: black;
}

.register p a {
    text-decoration: none;
    font-weight: 600;
    color: #F08A5D;
}

.background-login {
    width: 100%;
    height: 100vh;
}

.background-login img {
    width: 100%;
    height: 100vh;
}
</style>