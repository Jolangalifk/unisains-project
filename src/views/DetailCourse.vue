<template>
    <Navbar />
    <div class="main-page" v-if="courseData">
        <!-- Tampilan data kursus -->
        <div class="preview">
            <img :src="courseData.thumbnail" alt="">
            <h3>Rp {{ courseData.price }}</h3>
            <div class="button">
                <button class="pesan" @click="addToCart">Masukkan keranjang</button>
                <button class="keranjang">
                    <img src="@/assets/icon/heart-outline .svg" alt="">
                </button>
            </div>
            <div class="beli">
                <button class="pesan" @click="checkout(courseData.id)">Pesan Sekarang</button>
            </div>
            <p class="cover">Kursus ini meliputi:</p>
            <p class="item" v-for="item in courseData.contents" :key="item.id">{{ item.description }}</p>
        </div>
        <div class="info">
            <div class="text">
                <h3>{{ courseData.title_course }}</h3>
                <h4>UNI SAINS</h4>
                <p>{{ courseData.description }}</p>
            </div>
        </div>
    </div>
    <div v-else>
        <!-- Tampilkan pesan loading atau error jika data belum tersedia atau terjadi kesalahan -->
        <div v-if="isLoading" class="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <p v-else-if="error">Terjadi kesalahan saat mengambil data.</p>
    </div>
    <div class="wrapper-course">
        <div class="course-modul" v-if="courseData">
            <p>Konten kursus :</p>
            <p>3 Modul - 30 Materi - Total durasi 2j 15m</p>
            <ModulCourse :modules="courseData.modules" />
        </div>
        <div class="condition">
            <p class="wrapper">Persyaratan</p>
            <p class="item">1. Mac atau Windows</p>
            <p class="item">2. Mempunyai HP yang support Augmented Reality (AR)</p>
            <p class="item">3. Pemahaman dasar tentang anatomi</p>
        </div>
        <div class="rating-course">
            <h3>4.7 course rating . 11K ratings</h3>
            <div class="wrapper-review">
                <div class="rate1">
                    <RatingCourse />
                    <RatingCourse />
                    <RatingCourse />
                </div>
                <div class="rate2">
                    <RatingCourse />
                    <RatingCourse />
                    <RatingCourse />
                </div>
            </div>
            <button class="show">Show all reviews</button>
        </div>
        <div class="more-course">
            <h3>More Course</h3>
            <CardMain />
            <CardBiologi />
        </div>
    </div>
    <Footer />
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import ModulCourse from '../components/ModulCourse.vue'
import RatingCourse from '../components/RatingCourse.vue'
import CardMain from '../components/CardMain.vue'
import CardBiologi from '../components/CardBiologi.vue'
import axios from 'axios';

const courseData = ref(null);
const isLoading = ref(false);
const error = ref(null);
const router = useRouter();

// Fungsi untuk mengambil data dari API dengan menggunakan token dari local storage
const fetchData = async () => {
    isLoading.value = true;
    // const userToken = getUserToken();
    const getUserInfo = localStorage.getItem('user-info');
    // const idTrx = localStorage.getItem('idTrx');
    // return token ? JSON.parse(token) : '';
    const user = JSON.parse(getUserInfo);
    const token = user.token;
    try {
        const courseId = useRoute().params.id; // Ubah disini, langsung mengambil nilai dari useRoute().params.id
        const response = await axios.get(`https://admin.unisains.com/api/v1/course/show/${courseId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        courseData.value = response.data.data.course;
        isLoading.value = false;
    } catch (error) {
        console.error(error);
        isLoading.value = false;
        // Handle error response
        if (error.response && error.response.status === 401) {
            // Jika status kode 401 (Unauthorized), redirect ke halaman login
            router.push('/login');
        } else {
            // Jika ada error lain, tampilkan pesan error
            error.value = "Terjadi kesalahan saat mengambil data.";
        }
    }
};

const checkout = async (courseId) => { // Tambahkan courseId sebagai parameter
    // const userToken = getUserToken();
    const getUserInfo = localStorage.getItem('user-info');
    // const idTrx = localStorage.getItem('idTrx');
    // return token ? JSON.parse(token) : '';
    const user = JSON.parse(getUserInfo);
    const token = user.token;

    try {
        const response = await axios.post(
            "https://admin.unisains.com/api/v1/transaction/store",
            {
                course_id: courseId,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const idTrx = response.data.data.transaction.id;
        localStorage.setItem("idTrx", idTrx);
        localStorage.setItem("pembayaran", JSON.stringify(response.data));
        router.push({ name: 'detail-order', params: { id: idTrx } });
    } catch (error) {
        console.error(error);
        // Handle error jika terjadi kesalahan pada checkout
        alert("Terjadi kesalahan saat checkout");
    }
};

onMounted(() => {
    fetchData();
});

const addToCart = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      // Jika tidak ada token, minta pengguna untuk login terlebih dahulu
      alert('Anda harus login terlebih dahulu untuk menambahkan ke keranjang.');
      return;
    }

    const response = await axios.post(
      'https://admin.unisains.com/api/v1/course/cart/store',
      {
        course_id: courseData.value.id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      // Kursus berhasil ditambahkan ke keranjang (wishlist)
      alert('Kursus berhasil ditambahkan ke keranjang.');
    }
  } catch (error) {
    console.error(error);
    // Tangani kesalahan lainnya
    alert('Terjadi kesalahan saat menambahkan ke keranjang.');
  }
};

</script>
  
<style scoped>
.main-page {
    width: 100%;
    height: 980px;
    display: flex;
    align-items: center;
}

.preview {
    width: 430px;
    height: 700px;
    border-radius: 10px;
    margin-left: 200px;
    margin-right: 70px;
    border: 1px solid #c1c1c1;
    display: flex;
    flex-direction: column;
}

.preview img {
    border-radius: 10px 10px 0 0;
    width: 428px;
    height: 255px;
}

.preview h3 {
    width: 55%;
    font-size: 38px;
    font-weight: 700;
    color: #000000;
    margin: 20px 0 20px 30px;
}

.preview .button {
    margin-left: 30px;
    display: flex;
    align-items: center;
    gap: 30px;
}

.button .pesan {
    width: 260px;
    height: 75px;
    border-radius: 10px;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: white;
    color: #6A2C70;
    border: 2px solid #6A2C70;
    font-size: 18px;
    font-weight: bold;
    font-family: poppins;
}

.button .keranjang {
    width: 75px;
    height: 75px;
    border-radius: 10px;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: white;
    border: 2px solid #6A2C70;
    font-size: 18px;
    font-weight: 600;
    font-family: poppins;
}

.button .keranjang img {
    width: 40px;
    height: 40px;
}

.beli {
    margin-left: 30px;
    margin-top: 20px;
}

.beli .pesan {
    width: 365px;
    height: 75px;
    border-radius: 10px;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: #6A2C70;
    color: white;
    font-size: 18px;
    font-weight: 600;
    font-family: poppins;
}

.preview p {
    font-size: 18px;
    font-weight: 400;
    color: #000000;
    margin: 0 0 0 30px;
}

.preview .cover {
    margin-top: 30px;
    font-weight: 600;
}

.preview .item {
    margin-top: 15px;
    margin-left: 50px;
}

.info {
    width: 80%;
    height: 700px;
    margin-right: 200px;
    display: flex;
    flex-direction: column;
}

.info .text {
    width: 95%;
    margin-left: 30px;
    margin-bottom: 70px;
}

.info .text h3 {
    font-size: 60px;
    font-weight: 700;
    color: #000000;
}

.info .text h4 {
    font-size: 26px;
    font-weight: bold;
    color: #F08A5D;
}

.info .text p {
    font-size: 20px;
    font-weight: 600;
    color: #000000;
    margin-top: 50px;
}

.info .material {
    border-radius: 20px;
    border: 1px solid #c1c1c1;
    width: 950px;
    height: 393px;
    margin-left: 30px;
}

.info .material .cover {
    font-size: 20px;
    margin-left: 30px;
    margin-top: 30px;
    font-weight: 600;
}

.info .material .item {
    font-size: 20px;
    margin-top: 15px;
    margin-left: 50px;
}

.lds-facebook {
    display: inline-block;
    position: fixed;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
}

.lds-facebook div {
    display: inline-block;
    position: absolute;
    left: 6px;
    width: 13px;
    background: #6A2C70;
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}

.lds-facebook div:nth-child(1) {
    left: 6px;
    animation-delay: -0.24s;
}

.lds-facebook div:nth-child(2) {
    left: 26px;
    animation-delay: -0.12s;
}

.lds-facebook div:nth-child(3) {
    left: 45px;
    animation-delay: 0;
}

@keyframes lds-facebook {

    0%,
    100% {
        top: 6px;
        height: 51px;
    }

    50% {
        top: 19px;
        height: 26px;
    }
}

.wrapper-course {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-content: space-between;
}

.course-modul {
    width: 80%;
    height: fit-content;
    margin-left: 200px;
}

.course-modul p {
    font-size: 20px;
    font-weight: 600;
    color: #000000;
    margin-bottom: 20px;
}

.course-modul .wrapper {
    font-size: 20px;
    font-weight: 600;
    color: #000000;
    margin-top: 20px;
    margin-left: 30px;
}

.condition {
    width: 80%;
    height: 200px;
    display: flex;
    flex-direction: column;
    margin-left: 200px;
    margin-bottom: 50px;
}

.condition p {
    font-size: 20px;
    font-weight: 600;
    color: #000000;
    margin-top: 20px;
}

.condition .item {
    font-size: 20px;
    font-weight: 400;
    color: #000000;
    margin-top: 15px;
    margin-left: 20px;
}

.rating-course {
    width: 80%;
    height: 820px;
    display: flex;
    flex-direction: column;
    margin-left: 200px;
    border: 1px solid #c1c1c1;
    border-radius: 10px;
    margin-bottom: 100px;
}

.rating-course h3 {
    font-size: 30px;
    font-weight: 600;
    color: #000000;
    margin: 30px 0 20px 30px;
}

.rating-course .wrapper-review {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 100px;
}

.rating-course .wrapper-review .rate1 {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: row;
    padding-right: 30px;
}

.rating-course .wrapper-review .rate2 {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: row;
    padding-right: 30px;
}

.rating-course .show {
    width: 250px;
    height: 70px;
    border-radius: 10px;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: #6A2C70;
    color: white;
    font-size: 18px;
    font-weight: 600;
    font-family: poppins;
    margin-left: 30px;
    margin-top: 20px;
}

.rating-course .show:hover {
    background-color: #F08A5D;
    transition: 0.2s;
}

.rating-course .rating {
    width: 100%;
    height: 300px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
}

.rating-course .rating .item {
    width: 100%;
    height: 100px;
    border-radius: 20px;
    border: 1px solid #c1c1c1;
    display: flex;
    flex-direction: row;
    margin-top: 20px;
}

.rating-course .rating .item .img {
    width: 100px;
    height: 100px;
    border-radius: 20px;
    margin-left: 30px;
    margin-top: 20px;
}

.rating-course .rating .item .img img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
}

.rating-course .rating .item .text {
    width: 800px;
    height: 100px;
    margin-left: 30px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
}

.more-course {
    width: 65%;
    height: 950px;
    display: flex;
    flex-direction: column;
    margin-left: 200px;
    margin-bottom: 100px;
    border: 1px solid #c1c1c1;
    border-radius: 10px;
}

.more-course h3 {
    font-size: 30px;
    font-weight: 600;
    color: #000000;
    margin: 30px 0 20px 30px;
}

.more-course .cat1 {
    width: 80%;
    height: 400px;
    margin-bottom: 20px;
    display: flex;
}

.more-course .cat2 {
    width: 80%;
    height: 400px;
    margin-bottom: 20px;
    display: flex;
}
</style>
