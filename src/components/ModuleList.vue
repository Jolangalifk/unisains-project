<script setup>
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const moduleList = ref([]);
const courseId = useRoute().params.id;
const apiUrl = `https://admin.unisains.com/api/v1/course/learn/${courseId}`;
const token = localStorage.getItem('token');

onMounted(async () => {
  try {
    const response = await axios.get(apiUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    // Simpan data moduleList dari hasil respons API
    moduleList.value = response.data.course.modules;
    console.log(moduleList.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

</script>

<template>
    <div class="module-list-container" v-for="(module, index) in moduleList" :key="index">
        <div class="modul-container">
            <!-- create routerlink and change index contentModule -->
            <!-- <router-link :to="`/course/module/${courseId}/${module.id}`">
                <h3>{{ module.title_module }}</h3>
            </router-link> -->
            <a :href="`/course/module/${courseId}/${module.id}`">
                {{ console.log(module.id) }}
                <h3>{{ module.title_module }}</h3>
            </a>
        </div>
    </div>
</template>

<style scoped>
.module-list-container {
    width: 100%;
    padding-right: 60px;
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