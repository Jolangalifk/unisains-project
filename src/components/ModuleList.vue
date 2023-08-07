<script setup>
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';

const getUserToken = () => {
    const token = localStorage.getItem('token');
    return token ? token.replace(/['"]+/g, '') : '';
};
</script>

<template>
    <div class="module-list-container">
        <div class="modul-container">
            <a href="">
                <h3>Judul Modul</h3>
            </a>
        </div>
    </div>
</template>

<style scoped>
.module-list-container {
    width: 100%;
    height: 75px;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    justify-content: center;
    border-bottom: 1px solid #CBC8B3;
}

.modul-container {
    width: 100%;
    height: 75px;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    margin-left: 40px;
}

.modul-container h3 {
    font-size: 20px;
    font-weight: 600;
    color: #401A43;
}

.modul-container a {
    text-decoration: none;
}
</style>