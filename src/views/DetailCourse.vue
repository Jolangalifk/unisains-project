<template>
    <Navbar />
    <div class="main-page" v-if="courseData">
        <!-- Tampilan data kursus -->
        <div class="preview">
            <img :src="courseData.thumbnail" alt="">
            <h3>Rp {{ formattedHarga(courseData.price) }}</h3>
            <p> {{ courseData.title_course }} </p>
            <div class="button">
                <button class="pesan" @click="addToCart">Masukkan keranjang</button>
                <button class="keranjang" @click="addToWishlist">
                    <img :src="wishlistButtonImage" alt="">
                </button>
            </div>
            <div class="beli">
                <button class="pesan" @click="checkout(courseData.id)">Beli Sekarang</button>
            </div>
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
            <div class="avgrate">
                <h3>Ulasan Pembeli</h3>
                <div class="rate">
                    <input class="radio-input" type="radio" id="star1" name="star-input" value="1" />
                    <label class="radio-label" for="star1" title="1 star">1 star</label>
                    <p>{{ courseData && courseData.avgRate }} <span>/5.0</span> </p>
                </div>
            </div>
            <div class="wrapper-review">
                <div class="rate1">
                    <RatingCourse />
                </div>
            </div>
            <!-- <button class="show">Show all reviews</button> -->
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
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import ModulCourse from '../components/ModulCourse.vue'
import RatingCourse from '../components/RatingCourse.vue'
import CardMain from '../components/CardMain.vue'
import CardBiologi from '../components/CardBiologi.vue'
import axios from 'axios';
import Swal from 'sweetalert2';
import heartOutlineImage from '@/assets/icon/heart-outline.svg';
import heartInlineFillImage from '@/assets/icon/heart-inline-fill.svg';

const courseData = ref(null);
const isLoading = ref(false);
const error = ref(null);
const router = useRouter();
const route = useRoute();
const wishlistData = ref([]);


const isCourseInWishlist = (courseId) => {
    return wishlistData.value.some(item => item.course.id === courseId);
};

const wishlistButtonImage = computed(() => {
    return courseData.value.is_wishlist ? heartInlineFillImage : heartOutlineImage;
});

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
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Kursus berhasil ditambahkan ke keranjang.',
            });
        }
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Terjadi kesalahan saat menambahkan kursus ke keranjang.',
        });
    }
};

const addToWishlist = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Anda harus login terlebih dahulu untuk menambahkan ke wishlist.');
            return;
        }

        const courseId = courseData.value.id;

        // Cek apakah kursus sudah ada di wishlist
        if (isCourseInWishlist(courseId)) {
            Swal.fire({
                icon: 'info',
                title: 'Info',
                text: 'Kursus ini sudah pernah ditambahkan ke wishlist.',
            });
        } else {
            const response = await axios.post(
                'https://admin.unisains.com/api/v1/course/wishlist/store',
                {
                    course_id: courseId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data && response.data.message === 'Course already in wishlist') {
                Swal.fire({
                    icon: 'info',
                    title: 'Info',
                    text: 'Kursus ini sudah pernah ditambahkan ke wishlist.',
                });
            } else if (response.status === 200) {
                // Update properti is_wishlist
                courseData.value.is_wishlist = true;

                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Kursus berhasil ditambahkan ke wishlist.',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Terjadi kesalahan saat menambahkan kursus ke wishlist.',
                });
            }
        }
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Terjadi kesalahan saat menambahkan kursus ke wishlist.',
        });
    }
};
onMounted(() => {
    fetchData();
});

function formattedHarga(harga) {
    return harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

</script>
  
<style scoped>
.main-page {
    width: 100%;
    height: 750px;
    display: flex;
    align-items: center;
}

.preview {
    width: 430px;
    height: fit-content;
    border-radius: 10px;
    margin-left: 200px;
    margin-right: 70px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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
    margin-top: 30px;
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
    margin-bottom: 30px;
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
    height: fit-content;
    margin-right: 200px;
    display: flex;
    flex-direction: column;
}

.info .text {
    width: 95%;
    margin-left: 30px;
    margin-bottom: 300px;
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
    margin-top: 30px;
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
    height: fit-content;
    display: flex;
    flex-direction: column;
    margin-left: 200px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    margin-bottom: 100px;
}

.rating-course .avgrate {
    width: auto;
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-left: 30px;
}

.rating-course .avgrate .rate {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-right: 50px;
}

.rating-course .avgrate p {
    font-size: 36px;
    font-weight: 600;
    color: #000000;
    margin-left: 10px;
}

.rating-course .avgrate p span {
    font-size: 18px;
    color: black;
}

.radio-input {
    position: fixed;
    opacity: 0;
    pointer-events: none;
}

.radio-label {
    cursor: pointer;
    font-size: 0;
    color: rgba(0, 0, 0, 0.2);
    transition: color 0.1s ease-in-out;
}

.radio-label:before {
    color: #ffc700;
    content: "★";
    display: inline-block;
    font-size: 40px;
}

.radio-input:checked~.radio-label {
    color: #ffc700;
    color: gold;
}

.radio-label:hover,
.radio-label:hover~.radio-label {
    color: goldenrod;
}

.radio-input:checked+.radio-label:hover,
.radio-input:checked+.radio-label:hover~.radio-label,
.radio-input:checked~.radio-label:hover,
.radio-input:checked~.radio-label:hover~.radio-label,
.radio-label:hover~.radio-input:checked~.radio-label {
    color: darkgoldenrod;
}

.rating-course h3 {
    font-size: 30px;
    font-weight: bold;
    color: #000000;
    margin: 30px 50px 20px 30px;
}

.rating-course .wrapper-review {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 100px;
}

.rating-course .wrapper-review form {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
}

.rating-course .wrapper-review form textarea {
    width: auto;
    height: 200px;
    border-radius: 10px;
    border: 1px solid #c1c1c1;
    outline: none;
    padding: 10px;
    margin: 30px;
    font-size: 18px;
    font-family: poppins;
    color: #000000;
}

.rating-course .wrapper-review form textarea::placeholder {
    font-size: 18px;
    font-family: poppins;
}

.rating-course .wrapper-review form .submit {
    width: 120px;
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
    margin-bottom: 50px;
    margin-left: 90%;
}

.rating-course .wrapper-review .rate1 {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    padding: 30px;
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
    margin-bottom: 50px;
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
    width: 80%;
    height: 950px;
    display: flex;
    flex-direction: column;
    margin-left: 200px;
    margin-bottom: 100px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}

.more-course h3 {
    font-size: 30px;
    font-weight: bold;
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