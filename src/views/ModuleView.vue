<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();

const getUserToken = () => {
    const token = localStorage.getItem('token');
    return token ? token.replace(/['"]+/g, '') : '';
};

let courseData = ref([]);
const moduleData = ref([]);
const selectedModule = ref(null);

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
        console.log(courseData.value);
        console.log(moduleData.value);
    } catch (error) {
        console.log(error);
    }
};

const selectModule = (module) => {
    selectedModule.value = module;
    console.log(selectedModule.value);
};

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
    <div class="module-container">
        <div class="course-title">
            <img src="../assets/icon/arrow-left-midnight.svg" alt="">
            <h1>{{ courseData.title_course }}</h1>
        </div>
        <div class="container">
            <div class="content-module">
                <div class="thumbnail-module">
                    <img :src="getSelectedModuleThumbnail()" alt="Thumbnail">
                </div>
                <p>
                    {{ getSelectedModuleLesson() }}
                </p>
                <div class="shadow"></div>
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
            <div class="btn btn-previous_module"  @click="navigateToModule(-1)">
                <img src="../assets/icon/expand-left-midnight.svg" alt="">
                <a>Sebelumnya</a>
            </div>
            <h1>{{ getSelectedModuleTitle() }}</h1>
            <div class="btn btn-next_module" @click="navigateToModule(1)">
                <a>Selanjutnya</a>
                <img src="../assets/icon/expand-right-midnight.svg" alt="">
            </div>
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
}

.course-title h1 {
    font-size: 20px;
    font-weight: 600;
    color: #B83B5E;
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

.content-module .shadow {
    width: 80%;
    height: 100px;
    position: fixed;
    bottom: 80px;
    left: 0;
    z-index: 999;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
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
</style>