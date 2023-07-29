<script setup>
import NavbarProfileSettings from '../components/NavbarProfileSettings.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
</script>

<template>
    <div class="profile-settings">
        <NavbarProfileSettings />
        <div class="profile-settings-content">
            <form action="">
                <div class="wrapper-email">
                    <h1>Email</h1>
                    <div class="email-content">
                        <div class="custom-email">
                            <input type="text" name="" id="" placeholder="Email anda saat ini">
                        </div>
                        <button>Ubah</button>
                    </div>
                </div>
                <div class="wrapper-password">
                    <h1>Sandi</h1>
                    <div class="password-content">
                        <div class="custom-sandi">
                            <input type="text" name="" id="" placeholder="Kata sandi saat ini">
                        </div>
                        <div class="custom-sandi">
                            <input type="text" name="" id="" placeholder="Kata sandi baru">
                        </div>
                        <div class="custom-sandi">
                            <input type="text" name="" id="" placeholder="Konfirmasi kata sandi baru">
                        </div>
                    </div>
                    <button>Ubah sandi</button>
                </div>
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

.wrapper-email h1 {
    font-size: 20px;
    font-weight: 600;
    color: #000000;
    margin-bottom: 10px;
}

.wrapper-email {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;
}

.email-content {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.custom-email {
    width: 650px;
    height: 80px;
    border: 1px solid #c1c1c1;
    border-radius: 20px 0 0 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.custom-email input {
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

.email-content button {
    width: 150px;
    height: 80px;
    border: none;
    outline: none;
    border-radius: 0 20px 20px 0;
    background-color: #F08A5D;
    color: #fff;
    font-size: 20px;
    font-family: poppins;
    font-weight: 500;
    cursor: pointer;
}

.wrapper-password h1 {
    font-size: 20px;
    font-weight: 600;
    color: #000000;
    margin-bottom: 10px;
}

.wrapper-password {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;
}

.password-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.custom-sandi {
    width: 800px;
    height: 80px;
    border: 1px solid #c1c1c1;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-right: 30px;
    margin-bottom: 15px;
}

.custom-sandi input {
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

.wrapper-password button {
    width: 200px;
    height: 80px;
    border: none;
    outline: none;
    border-radius: 20px;
    background-color: #F08A5D;
    color: #fff;
    font-size: 20px;
    font-family: poppins;
    font-weight: 500;
    cursor: pointer;
    margin-top: 40px;
}
</style>