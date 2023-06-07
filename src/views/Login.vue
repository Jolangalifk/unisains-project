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
                        <input :type="showPassword ? 'text' : 'password'" placeholder="Masukkan Password"
                            v-model="password">
                        <button type="button" class="toggle-password" @click="togglePasswordVisibility">
                            <img class="toggle-password-icon" src="../assets/icon/eye-icon.svg" v-if="!showPassword"
                                alt="" />
                            <img class="toggle-password-icon" src="../assets/icon/eye-off-icon.svg" v-if="showPassword"
                                alt="" />
                        </button>
                    </div>
                    <p class="error-message" v-if="loginError">{{ loginErrorMessage }}</p>
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
            <div class="loading-overlay" v-if="isLoading">
                <div class="loading-spinner"></div>
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
            showPassword: false,
            loginError: false,
            loginErrorMessage: '',
            isLoading: false,
        }
    },
    methods: {
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword; // Membalikkan nilai status
        },
        async Login() {
            if (!this.email || !this.password) {
                this.loginError = true;
                this.loginErrorMessage = 'Silahkan isi email dan password terlebih dahulu.';
                return;
            }
            try {
                this.isLoading = true;
                let result = await axios.post('http://127.0.0.1:8000/api/v1/auth/login', {
                    email: this.email,
                    password: this.password,
                });
                console.log(result);
                if (result.status === 200 && result.data) {
                    alert('Login berhasil');
                    localStorage.setItem('user-info', JSON.stringify(result.data.token));
                    this.$router.push('/home');
                }
            } catch (error) {
                console.error(error);
                this.loginError = true; // Set nilai loginError menjadi true
                this.loginErrorMessage = 'Email atau password yang anda masukkan salah.'; // Set pesan kesalahan yang ingin ditampilkan
            } finally {
                this.isLoading = false; // Nonaktifkan overlay loading setelah proses login selesai
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
    font-family: poppins;
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

.form-input {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.form-group {
    width: 100%;
    height: 80px;
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
    width: 90%;
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

.toggle-password {
    border: none;
    background-color: white;
}

.error-message {
    color: red;
    font-size: 15px;
    margin-bottom: 20px;
}

.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.loading-spinner {
    border: 10px solid #f3f3f3;
    border-top: 10px solid #F08A5D;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

</style>