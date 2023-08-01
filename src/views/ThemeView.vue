<script setup>
import NavbarProfileSettings from '../components/NavbarProfileSettings.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
</script>

<template>
    <div class="profile-settings">
        <NavbarProfileSettings />
        <div class="profile-settings-content">
            <h3>THIS PAGE STILL WIP, PLEASE WAIT:)</h3>
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

.profile-settings-content h3 {
    font-size: 24px;
    font-weight: 600;
    color: #000000;
    margin-top: 10px;
}
</style>