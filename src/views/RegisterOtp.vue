<template>
    <div class="body">
        <img src="@/assets/image/astronomi-bg.png" alt="">
        <div class="container-forgot-password">
            <div class="forgot-password-wrapper">
                <div class="head-forgot-password">
                    <h1>Verifikasi Email</h1>
                    <p>Kode OTP telah dikirimkan ke email Anda. Silakan masukkan kode OTP untuk verifikasi.</p>
                </div>
                <div class="form-group">
                    <label for="Email"></label>
                    <img src="@/assets/icon/email-icon.svg" alt="">
                    <input type="text" placeholder="Masukkan Kode Otp" v-model="otp">
                </div>
                <button type="submit" class="button-forgot-password" @click="verifyEmail">Verifikasi</button>
            </div>
            <div class="loading-overlay" v-if="isLoading">
                <div class="loading-spinner"></div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const otp = ref('');
const verificationToken = localStorage.getItem('verification-token'); // Mengambil token verifikasi
const router = useRouter();

const verifyEmail = async () => {
    try {
        const response = await axios.post(
            'https://admin.unisains.com/api/v1/auth/verif-email',
            { otp: otp.value },
            { 
                headers: { 
                    Authorization: `Bearer ${verificationToken}` // Menggunakan token verifikasi dari local storage
                } 
            }
        );

        if (response.status === 200) {
            // Tampilkan SweetAlert untuk sukses
            await Swal.fire({
                icon: 'success',
                title: 'Sukses',
                text: 'Email berhasil terverifikasi',
            });

            router.push('/login'); // Ganti dengan halaman sukses
        }
    } catch (error) {
        console.error('Error verifying email:', error);

        // Tampilkan SweetAlert untuk gagal
        await Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Verifikasi email gagal',
        });
    }
};
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

.container-forgot-password {
    width: 100%;
    padding: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.forgot-password-wrapper {
    width: 75%;
}

.head-forgot-password {
    padding-bottom: 30px;
}

.head-forgot-password h1 {
    text-align: left;
    font-size: 54px;
    font-weight: bold;
    color: black;
    text-align: center;
}

.head-forgot-password p {
    text-align: left;
    font-size: 20px;
    font-weight: normal;
    color: black;
    text-align: center;
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

.button-forgot-password {
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

button h3 {
    font-family: poppins;
    text-align: left;
    font-size: 20px;
    font-weight: 600;
    color: black;
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

  