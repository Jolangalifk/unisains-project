<template>
    <div class="profile-setting-container">
        <div class="nav-profile-settings">
            <div class="back-btn">
                <img src="../assets/icon/arrow-left-white.svg" alt="" />
                <router-link to="/profile">Kembali</router-link>
            </div>
            <div class="profile-settings-text">
                <h1>Pengaturan akun</h1>
            </div>
        </div>
        <div class="nav-edit">
            <a :class="{ 'selected': selectedBtn.value === 0 }" @click="selectBtn(0)">
                <router-link to="/profile/profile-settings/edit-profile">Edit profil</router-link>
            </a>
            <a :class="{ 'selected': selectedBtn.value === 1 }" @click="selectBtn(1)">
                <router-link to="/profile/profile-settings/account-privacy">Keamanan akun</router-link>
            </a>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';

const selectedBtn = ref(0);

function selectBtn(index) {
    selectedBtn.value = index;
}
</script>

<style scoped>
.profile-setting-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 100px;
}

.nav-profile-settings {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 35px;
}

.back-btn {
    width: 170px;
    height: 70px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #B83B5E;
    border-radius: 50px;
}

.back-btn img {
    width: 45px;
    height: 45px;
    margin-left: 15px;
}

.back-btn a {
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    margin-left: 7px;
    text-decoration: none;
}

.profile-settings-text h1 {
    font-size: 40px;
    font-weight: 600;
    margin-left: 40px;
    color: #6A2C70;
}

.nav-edit {
    width: 1300px;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 40px;
    margin-left: 205px;
    border-bottom: #55235A 3px solid;
}

.nav-edit a.selected {
  color: #b83b5e;
  border-bottom: 3px solid #b83b5e;
}

/* Default styles for non-selected buttons */
.nav-edit a {
  font-size: 24px;
  font-weight: 600;
  color: #6a2c70;
  margin-right: 30px;
  text-decoration: none;
}

.nav-edit a:not(.selected):hover {
  color: #b83b5e;
}
</style>