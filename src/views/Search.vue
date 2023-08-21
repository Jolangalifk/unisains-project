<template>
  <div class="search-results">
    <Navbar />
    <h2>Hasil Pencarian</h2>
    <div class="scroll-course">
      <div class="course" v-for="course in searchResults" :key="course.id">
        <div class="card" @click="goToDetailCourse(course.id)">
          <img :src="course.thumbnail" alt="">
          <h4>{{ course.title_course }}</h4>
          <h3>Rp {{ formattedHarga(course.price) }}</h3>
          <p>{{ course.category.name_category }}</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

const router = useRouter();
const isLoggedIn = ref(false);
const searchResults = ref([]);

const goToDetailCourse = (id) => {
  if (isLoggedIn.value) {
      router.push(`/detail-course/${id}`);
      scrollToTop();
  } else {
      router.push('/login');
  }
};

onMounted(async () => {
    isLoggedIn.value = checkUserLoginStatus();
});

const checkUserLoginStatus = () => {
    const token = localStorage.getItem('token');
    return token ? true : false;
};

const scrollToTop = () => {
  // Pindahkan tampilan ke posisi atas halaman
  window.scrollTo(0, 0);
};

const fetchSearchResults = async () => {
  const searchQuery = router.currentRoute.value.query.search;
  try {
    const response = await axios.get(`https://admin.unisains.com/api/v1/course/search?search=${searchQuery}`);
    searchResults.value = response.data.data.courses;
    console.log(searchResults.value);
  } catch (error) {
    console.error(error);
  }
};

function formattedHarga(harga) {
  return harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

onMounted(() => {
  fetchSearchResults();
});
</script>
  
<style scoped>
.search-results {
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.search-results h2 {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 50px;
  margin-top: 50px;
  color: black;
}

.search-results .course {
  display: flex;
  flex-direction: row;
}

.search-results .scroll-course {
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  width: auto;
  height: auto;
  margin-bottom: 100px;
  overflow: hidden;
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
  height: 190px;
  border-radius: 10px 10px 0 0;
  object-fit: cover;
  object-position: center;
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
  font-size: 16px;
  margin-top: 10px;
  margin-left: 15px;
  text-align: left;
}

.card h3 {
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
  margin-left: 15px;
}
</style>
  