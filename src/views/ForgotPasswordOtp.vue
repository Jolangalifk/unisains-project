<template>
    <div class="body">
        <div class="container-password">
            <div class="password-wrapper">
                <div class="head-password">
                    <h1>Lupa Password</h1>
                    <p>Isi data dibawah ini untuk melanjutkan proses ubah kata sandi!</p>
                </div>
                <form class="form-input" v-on:submit.prevent="resetPassword">
                    <div class="form-group">
                        <label for="OTP"></label>
                        <img src="@/assets/icon/email-icon.svg" alt="">
                        <input type="text" placeholder="Masukkan Kode OTP" v-model="otp">
                    </div>
                    <div class="form-group">
                        <label for="Password"></label>
                        <img src="@/assets/icon/password-icon.svg" alt="">
                        <input :type="showPassword ? 'text' : 'password'" placeholder="Masukkan Kata Sandi Baru"
                            v-model="newPassword">  
                        <button type="button" class="toggle-password" @click="togglePasswordVisibility">
                            <img class="toggle-password-icon" src="../assets/icon/eye-icon.svg" v-if="!showPassword"
                                alt="" />
                            <img class="toggle-password-icon" src="../assets/icon/eye-off-icon.svg" v-if="showPassword"
                                alt="" />
                        </button>
                    </div>
                    <div class="form-group">
                        <label for="ConfirmPassword"></label>
                        <img src="@/assets/icon/password-icon.svg" alt="">
                        <input :type="showPassword ? 'text' : 'password'" placeholder="Konfirmasi Kata Sandi Baru"
                            v-model="confirmPassword">
                        <button type="button" class="toggle-password" @click="togglePasswordVisibility">
                            <img class="toggle-password-icon" src="../assets/icon/eye-icon.svg" v-if="!showPassword"
                                alt="" />
                            <img class="toggle-password-icon" src="../assets/icon/eye-off-icon.svg" v-if="showPassword"
                                alt="" />
                        </button>
                    </div>
                    <p class="error-message" v-if="passwordError">{{ passwordErrorMessage }}</p>
                    <button type="submit" class="button-password">Ubah Kata Sandi</button>
                </form>
            </div>
            <div class="loading-overlay" v-if="isLoading">
                <div class="loading-spinner"></div>
            </div>
        </div>
        <img src="@/assets/image/astronomi-bg.png" alt="">
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const otp = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const isLoading = ref(false);
const passwordError = ref(false);
const passwordErrorMessage = ref('');

const router = useRouter();

function togglePasswordVisibility() {
    showPassword.value = !showPassword.value;
}
async function resetPassword() {
    // Mendefinisikan variabel config dengan header yang sesuai di sini
    const token = localStorage.getItem('userToken');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    if (otp.value && newPassword.value === confirmPassword.value) {
        isLoading.value = true;
        passwordError.value = false;
        try {
            const response = await axios.post(
                'https://admin.unisains.com/api/v1/auth/reset-password',
                {
                    otp: otp.value,
                    password: newPassword.value,
                    password: confirmPassword.value,
                },
                config
            );

            console.log('Response:', response.data);
            if (response.status === 200) { // Memeriksa kode status yang benar
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Password berhasil diubah.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    router.push('/login');
                });
            } else {
                // Menghandle kesalahan atau kode status yang tidak diharapkan
                passwordError.value = true;
                passwordErrorMessage.value = 'Terjadi kesalahan. Silakan coba lagi.';
            }
        } catch (error) {
            console.error('Error:', error);
            passwordError.value = true;
            passwordErrorMessage.value = 'Terjadi kesalahan. Silakan coba lagi.';
        } finally {
            isLoading.value = false;
        }
    } else {
        passwordError.value = true;
        passwordErrorMessage.value = 'Pastikan kode OTP valid dan password baru sesuai.';
    }
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

.container-password {
    width: 100%;
    padding: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.password-wrapper {
    width: 75%;
}

.head-password {
    padding-bottom: 30px;
}

.head-password h1 {
    text-align: left;
    font-size: 54px;
    font-weight: bold;
    color: black;
    text-align: center;
}

.head-password p {
    text-align: left;
    font-size: 20px;
    font-weight: normal;
    color: black;
    text-align: center;
}

.form-input {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.form-input a {
    text-decoration: none;
    font-size: 18px;
    font-weight: normal;
    color: black;
    display: flex;
    justify-content: flex-end;
    padding-bottom: 20px;
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

.button-password {
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

.password .password-btn {
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

.social-media-password {
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: normal;
    color: black;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}

.social-media-password a {
    font-size: 18px;
    text-decoration: none;
    color: black;
}

.social-media-password p {
    font-size: 16px;
    font-weight: normal;
    color: black;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding-bottom: 30px;
}

.social-media-password button {
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

.social-media-password button img google {
    width: 35px;
    height: 35px;
}

.social-media-password button img twitter {
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

.background-password {
    width: 100%;
    height: 100vh;
}

.background-password img {
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