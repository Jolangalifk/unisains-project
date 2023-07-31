<template>
    <div class="popup">
        <div class="popup-content">
            <div class="logout-logo">
                <img src="@/assets/icon/logout-logo.svg" alt="">
            </div>
            <h3>Anda yakin ingin keluar?</h3>
            <p>Anda akan kembali ke layar login, yakin ingin melanjutkan?</p>
            <div class="popup-buttons">
                <button @click="logout">Keluar</button>
                <button class="cancel" @click="hideLogoutConfirmation">Batal</button>
            </div>
        </div>
    </div>
</template>
  
<script>
import { defineEmits } from 'vue';
import axios from 'axios';

const emits = defineEmits(['close']);

const getUserToken = () => {
    return localStorage.getItem('token') || '';
};

export default {
    methods: {
        async logout() {
            const userToken = getUserToken();
            console.log('Token pengguna:', userToken);
            try {
                await axios.post('https://admin.unisains.com/api/v1/auth/logout', null, {
                    headers: { Authorization: `Bearer ${userToken}` },
                });
                console.log('Logout berhasil');

                localStorage.removeItem('user-info');
                localStorage.removeItem('token');

                this.$router.push('/login');
            } catch (error) {
                console.error('Gagal melakukan logout:', error);
            }
        },
        hideLogoutConfirmation() {
            this.$emit('close');
        },
    },
};
</script>
  
<style scoped>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.popup-content {
    width: 450px;
    height: 500px;
    background-color: #fff;
    padding: 20px;
    border-radius: 30px;
    align-items: center;
    justify-content: center;
}

.popup-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.popup-buttons button {
    width: 300px;
    height: 70px;
    border-radius: 30px;
    cursor: pointer;
    border: none;
    font-family: poppins;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    background-color: #F08A5D;
}

.popup-buttons .cancel {
    background-color: white;
    display: flex;
    color: #c1c1c1;
    border: none;
    align-items: center;
    justify-content: center;
}

.popup-content h3 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
}

.popup-content p {
    width: 70%;
    text-align: center;
    margin-bottom: 20px;
    font-size: 16px;
    margin-left: 60px;
}

.popup-content .logout-logo {
    width: 150px;
    height: 150px;
    margin: 0 auto;
    border-radius: 50%;
    background-color: #F5F5F5;
    margin-bottom: 20px;
}

.popup-content .logout-logo img {
    width: 50px;
    height: 77px;
    object-fit: cover;
    margin-top: 30px;
    margin-left: 50px;
}
</style>
  