<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();

const getUserToken = () => {
    const token = localStorage.getItem('token');
    return token ? token.replace(/['"]+/g, '') : '';
};

let isLoading = ref(true);
let courseData = ref([]);
const moduleData = ref([]);
const selectedModule = ref(null);
const getAr = ref(null);

const getCourseData = async () => {
    try {
        const token = getUserToken();
        const response = await axios.get(
            `https://admin.unisains.com/api/v1/course/learn/${route.params.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        courseData.value = response.data.course;
        moduleData.value = response.data.course.modules;
        getAr.value = response.data.course.ars[0].ar;
        console.log(getAr.value);
        console.log(courseData.value);
        console.log(moduleData.value);
        isLoading.value = false;
    } catch (error) {
        console.log(error);
        isLoading.value = false;
    }
};

function toLinkChat() {
    window.open(courseData.value.link_chat, '_blank');
}

const selectModule = (module) => {
    selectedModule.value = module;
    console.log(selectedModule.value);
};

const isLastModule = computed(() => {
    if (selectedModule.value !== null) {
        const selectedModuleId = selectedModule.value;
        return selectedModuleId === moduleData.value[moduleData.value.length - 1].id;
    }
    return false;
});

console.log(selectedModule.value);
const getSelectedModuleThumbnail = () => {
    if (selectedModule.value !== null) {
        const selectedModuleId = selectedModule.value;
        const selectedModuleData = moduleData.value.find(modul => modul.id === selectedModuleId);

        if (selectedModuleData) {
            return selectedModuleData.thumbnail_module;
        }
    }

    // Jika tidak ada modul yang dipilih atau thumbnail tidak ditemukan,
    // maka kembalikan thumbnail dari modul dengan id 1
    const moduleWithId1 = moduleData.value.find(modul => modul.id === 1);
    if (moduleWithId1) {
        return moduleWithId1.thumbnail_module;
    }

    return '';
};

const getSelectedModuleLesson = () => {
    if (selectedModule.value !== null) {
        const selectedModuleId = selectedModule.value;
        const selectedModuleData = moduleData.value.find(modul => modul.id === selectedModuleId);

        if (selectedModuleData) {
            return selectedModuleData.materi_module;
        }
    }

    // Jika tidak ada modul yang dipilih atau thumbnail tidak ditemukan,
    // maka kembalikan thumbnail dari modul dengan id 1
    const moduleWithId1 = moduleData.value.find(modul => modul.id === 1);
    if (moduleWithId1) {
        return moduleWithId1.materi_module;
    }

    return '';
};

const getSelectedModuleTitle = () => {
    if (selectedModule.value !== null) {
        const selectedModuleId = selectedModule.value;
        const selectedModuleData = moduleData.value.find(modul => modul.id === selectedModuleId);

        if (selectedModuleData) {
            return selectedModuleData.title_module;
        }
    }

    // Jika tidak ada modul yang dipilih atau thumbnail tidak ditemukan,
    // maka kembalikan thumbnail dari modul dengan id 1
    const moduleWithId1 = moduleData.value.find(modul => modul.id === 1);
    if (moduleWithId1) {
        return moduleWithId1.title_module;
    }

    return '';
};

const navigateToModule = (direction) => {
    const currentIndex = moduleData.value.findIndex(modul => modul.id === selectedModule.value);
    let newIndex = currentIndex + direction;

    if (newIndex < 0) {
        newIndex = 0; // Jika di modul pertama, tetap pada modul pertama
    } else if (newIndex >= moduleData.value.length) {
        newIndex = moduleData.value.length - 1; // Jika di modul terakhir, tetap pada modul terakhir
    }

    selectedModule.value = moduleData.value[newIndex].id;
};

onMounted(() => {
    getCourseData();
});

</script>
<template>
    <div class="module-container" v-if="!isLoading">
        <div class="course-title">
            <router-link to="/profile/my-course">
                <img src="../assets/icon/arrow-left-midnight.svg" alt="">
            </router-link>
            <h1>{{ courseData.title_course }}</h1>
        </div>
        <div class="container">
            <div class="content-module">
                <div class="thumbnail-module">
                    <img :src="getSelectedModuleThumbnail()" alt="Thumbnail">
                </div>
                <div class="container-text-ar">
                    <p>
                        {{ getSelectedModuleLesson() }}
                    </p>
                    <div class="ar-img">
                        <h1>Pindai AR Disini!</h1>
                        <img :src="getAr" :alt="getAr">
                    </div>
                </div> 
                <div class="shadow"></div>
                <div class="chat" @click="toLinkChat()">
                    <img src="../assets/icon/chat-module.svg" alt="">
                </div>
            </div>
            <div class="sidebar-module">
                <h1>Daftar Modul</h1>
                <ul v-for="modul in moduleData" :key="modul.id">
                    <li>
                        <a @click="selectModule(modul.id)">{{ modul.title_module }}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bottom-nav">
            <div class="btn btn-previous_module" @click="navigateToModule(-1)">
                <img src="../assets/icon/expand-left-midnight.svg" alt="">
                <a>Sebelumnya</a>
            </div>
            <h1>{{ getSelectedModuleTitle() }}</h1>
            <div v-if="isLastModule">
                <router-link :to="`/course/module/summary/${route.params.id}`" class="btn btn-next_module">
                    <a>Rangkuman</a>
                    <img src="../assets/icon/expand-right-midnight.svg" alt="">
                </router-link>
            </div>
            <div v-else>
                <div class="btn btn-next_module" @click="navigateToModule(1)">
                    <a>Selanjutnya</a>
                    <img src="../assets/icon/expand-right-midnight.svg" alt="">
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="else-content">
            <h3>Loading...</h3>
        </div>
    </div>
</template>
<style scoped>
.module-container {
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
}

.module-container .course-title {
    display: flex;
    position: absolute;
    top: 0;
    align-items: center;
    width: 100vw;
    height: 70px;
    background-color: #fff;
    padding: 0 50px;
    z-index: 999;
    border-bottom: 1px solid #00000031;
}

.course-title img {
    width: 50px;
    height: 50px;
    margin-right: 20px;
    margin-top: 5px;
}

.course-title h2 {
    font-size: 20px;
    font-weight: 600;
    color: #401A43;
}

.course-title h1 {
    font-size: 20px;
    font-weight: 600;
    color: #B83B5E;
    text-align: center;
}

.module-container .container {
    display: flex;
    width: 100vw;
    height: 100%;
    margin: 70px 0;
}

::-webkit-scrollbar {
    display: none;
}

.container .content-module {
    width: 80%;
    position: relative;
    height: 100%;
    background-color: #ffffff;
    padding: 20px 70px;
}

.container-text-ar{
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 70px;
    margin-top: 50px;
}

.container-text-ar p {
    text-indent: 50px;
}

.ar-img {
    width: 100%;
    height: 450px;
    display: flex;
    justify-content: flex-start;
    object-fit: cover;
    flex-direction: column;
    align-items: center;
    margin-left: 70px;
}

.ar-img h1 {
    font-size: 30px;
    font-weight: 600;
    color: #B83B5E;
    margin-bottom: 20px;
}

.ar-img img {
    width: 300px;
    height: 300px;
    object-fit: cover;
    border: 2px solid #00000031;
    border-radius: 10px;
    align-content: center;
}

.content-module .shadow {
    width: 80%;
    height: 100px;
    position: fixed;
    bottom: 80px;
    left: 0;
    z-index: 999;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
}

.content-module .chat {
    width: 80px;
    height: 80px;
    position: fixed;
    margin-top: 200px;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: white;
    border-radius: 0 10px 10px 0;
    border: 1px solid #00000031;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.content-module .thumbnail-module {
    width: 100%;
    height: 400px;
    border-radius: 20px;
    overflow: hidden;
}

.content-module p {
    margin-top: 50px;
    font-size: 18px;
    font-weight: 400;
    color: #000;
    text-align: justify;
    margin-bottom: 80px;
}

.thumbnail-module img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.container .sidebar-module {
    width: 20%;
    height: 100%;
    border-left: 1px solid #00000031;
    position: fixed;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.sidebar-module h1 {
    font-size: 20px;
    font-weight: 600;
    color: #B83B5E;
    margin-bottom: 20px;
    padding: 20px 0;
    border-bottom: 1px solid #00000031;
    width: 100%;
}

.sidebar-module ul {
    width: 100%;
    margin: 10px;
    border-bottom: 1px solid #00000031;

}

.sidebar-module ul li {
    list-style: none;
    margin-bottom: 30px;
    margin-right: 40px;
}

.sidebar-module ul li a {
    font-size: 18px;
    font-weight: 500;
    color: #000;
    text-decoration: none;
    cursor: pointer;
}

.module-container .bottom-nav {
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    height: 80px;
    background-color: #fff;
    padding: 0 50px;
    border-top: 1px solid #00000031;
}

.bottom-nav h1 {
    font-size: 20px;
    font-weight: 600;
    color: #B83B5E;
}

.bottom-nav .btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 200px;
    padding: 10px 15px 10px 30px;
    border-radius: 5px;
    background-color: #fff;
    transition: .5s;
    cursor: pointer;
    text-decoration: none;
}

.bottom-nav .btn:hover {
    background-color: #B83B5E;
}

.bottom-nav .btn:hover a {
    color: #fff;
}

.bottom-nav .btn:hover img {
    filter: invert(100%);
}

.bottom-nav .btn a {
    font-size: 18px;
    font-weight: 500;
    color: #000;
    text-decoration: none;
}

.else-content {
    width: 100%;
    height: 950px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
}

.else-content h3 {
    font-size: 24px;
    font-weight: 600;
    color: #6A2C70;
}
</style>