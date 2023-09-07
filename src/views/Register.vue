<template>
    <div class="body">
        <div class="container-register">
            <div class="register-wrapper">
                <div class="head-register">
                    <h1>Daftar</h1>
                    <p>Daftarkan akun anda untuk memulai belajar sains!</p>
                </div>
                <form class="form-input" v-on:submit.prevent="Register">
                    <div class="wrapper-name">
                        <div class="name">
                            <input type="text" placeholder="Nama depan" v-model="first_name">
                        </div>
                        <div class="name">
                            <input type="text" placeholder="Nama belakang" v-model="last_name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="Username"></label>
                        <img src="@/assets/icon/user-icon.svg" alt="">
                        <input type="text" placeholder="Masukkan Username" v-model="username">
                    </div>
                    <div class="form-group">
                        <label for="Email"></label>
                        <img src="@/assets/icon/email-icon.svg" alt="">
                        <input type="email" placeholder="Masukkan Email" v-model="email">
                    </div>
                    <div class="form-group">
                        <label for="Password"></label>
                        <img src="@/assets/icon/password-icon.svg" alt="">
                        <input :type="showPassword ? 'text' : 'password'" placeholder="Masukkan Kata Sandi"
                            v-model="password">
                        <button type="button" class="toggle-password" @click="togglePasswordVisibility">
                            <img class="toggle-password-icon" src="../assets/icon/eye-icon.svg" v-if="!showPassword"
                                alt="" />
                            <img class="toggle-password-icon" src="../assets/icon/eye-off-icon.svg" v-if="showPassword"
                                alt="" />
                        </button>
                    </div>
                    <p class="error-message" v-if="loginError">{{ loginErrorMessage }}</p>
                    <button type="submit" class="button-register">Daftar</button>
                </form>
                <!-- <div class="social-media-register">
                    <p>Atau daftar dengan</p>
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
                </div> -->
                <br>
                <div class="login">
                    <p>Sudah punya akun? <router-link to="/login">Masuk</router-link></p>
                </div>
            </div>
            <div class="loading-overlay" v-if="isLoading">
                <div class="loading-spinner"></div>
            </div>
        </div>
        <img src="@/assets/image/anatomi-bg.png" alt="">
    </div>
</template>

<script setup>
import axios from 'axios'
import Swal from 'sweetalert2';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const first_name = ref('');
const last_name = ref('');
const username = ref('');
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const loginError = ref(false);
const loginErrorMessage = ref('');
const isLoading = ref(false);

const router = useRouter(); // Objek router

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

const Register = async () => {
    if (!email.value || !password.value) {
        loginError.value = true;
        loginErrorMessage.value = 'Silahkan isi data dengan lengkap terlebih dahulu.';
        return;
    }
    isLoading.value = true;
    try {
        const response = await axios.post('https://admin.unisains.com/api/v1/auth/register', {
            first_name: first_name.value,
            last_name: last_name.value,
            username: username.value,
            email: email.value,
            password: password.value,
        });

        if (response.status === 200 && response.data) {
            await Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Register berhasil. Silakan verifikasi email Anda.',
            });

            // Simpan token verifikasi ke local storage
            const verificationToken = response.data['token-verify'];
            localStorage.setItem('verification-token', verificationToken);

            router.push('/register-otp'); // Redirect to the RegisterOtp page
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        isLoading.value = false;
    }
};

</script>

<style>
.body {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-family: poppins;
}

.container-register {
    width: 100%;
    padding: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.register-wrapper {
    width: 75%;
}

.head-register {
    padding-bottom: 30px;
}

.head-register h1 {
    text-align: left;
    font-size: 54px;
    font-weight: bold;
    color: black;
}

.head-register p {
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
    margin-right: 30px;
    margin-left: 30px;
}

.form-group input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 20px;
    font-family: poppins;
    font-weight: normal;
    color: black;
}

.button-register {
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

.register {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.account {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.login {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-bottom: 30px;
}

.wrapper-name {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
}

.name {
    width: 235px;
    height: 80px;
    border: 1px solid #c1c1c1;
    border-radius: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
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

.register .register-btn {
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

.social-media-register {
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

.social-media-register p {
    font-size: 16px;
    font-weight: normal;
    color: black;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding-bottom: 30px;
    padding-top: 30px;
}

.social-media-register button {
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

.social-media-register button img google {
    width: 35px;
    height: 35px;
}

.social-media-register button img twitter {
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

.login {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    color: black;
}

.login p {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    color: black;
}

.login p a {
    text-decoration: none;
    font-weight: 600;
    color: #F08A5D;
}

.background-register {
    width: 100%;
    height: 100vh;
}

.background-register img {
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