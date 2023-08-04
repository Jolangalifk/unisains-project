<template>
    <div class="scroll-course">
        <div v-for="(kursus, index) in courseData" :key="index">
            <div v-if="isLoggedIn" class="card" @click="goToDetailCourse(kursus.id)">
                <img :src="kursus.thumbnail" alt="">
                <h4>{{ kursus.title_course }}</h4>
                <p>{{ kursus.name_category }}</p>
                <h3>{{ kursus.price }}</h3>
            </div>
            <div v-else class="card" @click="handlePopup(kursus.id)">
                <img :src="kursus.thumbnail" alt="">
                <h4>{{ kursus.title_course }}</h4>
                <p>{{ kursus.name_category }}</p>
                <h3>{{ kursus.price }}</h3>
            </div>
        </div>
        <!-- Pop up preview -->
        <div v-if="popup" class="popup">
            <div class="two-preview">
                <div class="preview-image">
                    <img :src="previewData.thumbnail" alt="Thumbnail" />
                </div>
                <div class="preview-content">
                    <div class="tittle-btn">
                        <h4>{{ previewData.title_course }}</h4>
                        <button @click="closePreview">
                            <img src="@/assets/icon/close-icon.svg" alt="">
                        </button>
                    </div>
                    <h3>Kategori : {{ previewData.category.name_category }}</h3>
                    <h3>Harga : {{ previewData.price }}</h3>
                    <p class="text-deskripsi-preview">{{ previewData.description }}</p>
                    <button class="selengkapnya" @click="goToDetailCourse(previewCourseId)">
                        Selengkapnya
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const isLoggedIn = ref(false);
const router = useRouter();
const courseData = ref([]);
const popup = ref(false);
const previewData = ref(null);
const previewCourseId = ref(null);

const handlePopup = async (id) => {
    if (!isLoggedIn.value) {
        previewCourseId.value = id;
        await fetchPreviewData(id);
        popup.value = true;
    }
};

const closePreview = () => {
    popup.value = false;
};

const goToDetailCourse = (id) => {
    if (isLoggedIn.value) {
        router.push(`/detail-course/${id}`);
    } else {
        router.push('/login');
    }
};

onMounted(async () => {
    isLoggedIn.value = checkUserLoginStatus();
    await fetchData();
    fetchPreviewData(1);
});

const checkUserLoginStatus = () => {
    const token = localStorage.getItem('token');
    return token ? true : false;
};

const fetchData = async () => {
    try {
        const response = await axios.get('https://admin.unisains.com/api/v1/course/category');
        courseData.value = response.data.data.astronomi.slice(0, 1);
        console.log(courseData.value);
    } catch (error) {
        console.error(error);
    }
};

const fetchPreviewData = async (id) => {
  try {
    const response = await axios.get(
      `https://admin.unisains.com/api/v1/course/preview/${id}`
    );
    previewData.value = response.data.data.course; // Perbarui baris ini
    console.log(previewData.value);
  } catch (error) {
    console.error(error);
  }
};

</script>

  
  
<style  scoped>
.scroll-course {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.card {
    width: 350px;
    height: 360px;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #C1C1C1;
    margin: 20px;
    display: flex;
    flex-direction: column;
}

.card img {
    width: 348px;
    height: 175px;
    border-radius: 10px 10px 0 0;
}

.card h4 {
    font-size: 18px;
    font-weight: bold;
    margin-top: 20px;
    margin-left: 15px;
}

.card .svg {
    width: 65%;
    height: 65%;
    margin-left: 15px;
}

.card p {
    font-size: 14px;
    margin-top: 10px;
    margin-left: 15px;
    text-align: left;
}

.card h3 {
    font-size: 20px;
    font-weight: 600;
    margin-top: 20px;
    margin-left: 15px;
    margin-bottom: 10px;
}

/* CSS for Pop up preview */
.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.two-preview {
    width: 1200px;
    height: 600px;
    background-color: #fff;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.preview-image {
    width: 600px;
    height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: cover;
}

.preview-image img {
    width: 90%;
    height: 90%;
    border-radius: 20px;
}

.preview-content {
    width: 600px;
    height: 600px;
    background: transparent;
    padding: 20px;
}

.tittle-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.tittle-btn h4 {
    margin-right: auto;
    font-size: 24px;
    color: black;
    font-weight: bold;
}

.tittle-btn button {
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    background-color: transparent;
    color: black;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
}

.tittle-btn button img {
    width: 40px;
    height: 40px;
}

.preview-content h3 {
    font-size: 16px;
    font-weight: normal;
    color: black;
    margin-bottom: 10px;
}

.preview-content p {
    white-space: normal;
    /* Setiap baris teks akan dibungkus */
    max-height: 100px;
    /* Tinggi maksimum yang diinginkan */
    margin-top: 30px;
    margin-bottom: 70px;
}

button.selengkapnya {
    width: 180px;
    height: 60px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #F08A5D;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    font-family: poppins;
    cursor: pointer;
}

.selengkapnya a {
    text-decoration: none;
    color: #fff;
    font-weight: 600;
}

button.selengkapnya:hover {
    background-color: #F08A5D;
}
</style>
  