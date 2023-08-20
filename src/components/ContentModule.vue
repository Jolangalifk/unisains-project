<template>
    <div class="container-content-module">
        <div v-if="currentModule">
            <div class="container-module">
                <!-- Content for the currently displayed module -->
                <div class="module-cover-container">
                    <img :src="currentModule.thumbnail_module" alt="Module Thumbnail" />
                </div>
                <h2>{{ currentModule.title_module }}</h2>
                <h1>{{ currentModule.description }}</h1>
                <p>{{ currentModule.materi_module }}</p>
                <!-- <div class="content-ar-img">
                    <img :src="currentModule.image_module" alt="Module Image" />
                </div> -->
            </div>
        </div>
        <!-- Pass the courseContent data to the ModuleListView component -->
        <!-- <ModuleListView :courseContent="courseContent" @changeModule="handleChangeModule" /> -->
        <ModuleListView />
    </div>
</template>
  
<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import ModuleListView from './ModuleListView.vue';
import { useRoute } from 'vue-router';

const courseId = useRoute().params.id;
const courseContent = ref(null);
const isCoursePurchased = ref(false);
const currentModule = ref(null);
let currentIndex = 0;

const getUserToken = () => {
    const token = localStorage.getItem('token');
    return token ? token.replace(/['"]+/g, '') : '';
};

const fetchCourseContent = async () => {
    try {
        // Simulate the course has been purchased.
        isCoursePurchased.value = true;

        const token = getUserToken();
        const response = await axios.get(
            `https://admin.unisains.com/api/v1/course/learn/${courseId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        courseContent.value = response.data;
        // Assuming the API response contains the course content details.
        currentModule.value = courseContent.value.course.modules[0];
    } catch (error) {
        console.error('Failed to fetch course content:', error);
    }
};

onMounted(fetchCourseContent);

const handleChangeModule = (module) => {
    currentModule.value = module;
};
</script>
  
  

<style scoped>
.container-content-module {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.container-module {
    width: 1390px;
    height: 745px;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    padding: 40px 40px 40px 40px;
    overflow: auto;
}

.module-cover-container {
    width: 1300px;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    margin-bottom: 40px;
    object-fit: contain;
}

.container-module h1 {
    font-size: 26px;
    font-weight: 600;
    color: #000000;
    margin: 40px 0;
}

.content-ar-img {
    width: 1300px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    margin-top: 30px;
}

.content-ar-img img {
    width: 300px;
    height: 300px;
    border-radius: 20px;
    border: 1px solid #CBC8B3;
}

.module-cover-container img {
    width: 1300px;
    height: 300px;
    border-radius: 20px;
    border: 1px solid #CBC8B3;
}

.container-module h2 {
    font-size: 36px;
    font-weight: 600;
    color: #000000;
}
.container-module p {
    font-size: 20px;
    color: #000000;
}

.container-module::-webkit-scrollbar {
    width: 10px;
}

.container-module::-webkit-scrollbar-thumb {
    background: #cccccc;
    border-radius: 10px;
}

.container-module::-webkit-scrollbar-thumb:hover {
    background: #cccccc;
}
</style>