<template>
    <main>
        <Navbar />
        <h1 class="cart-title">Keranjang</h1>
        <div class="wrapper">
            <div class="cart-course">
                <div v-for="(kursus, index) in cartData" :key="index" class="card">
                    <input type="checkbox" class="checkbox" v-model="kursus.isChecked" @change="toggleCheckbox(kursus)">
                    <div class="clickable-area" @click="goToDetailCourse(kursus.course.id)">
                        <img :src="kursus.course.thumbnail" alt="Course Thumbnail" />
                        <div class="title">
                            <h4>{{ kursus.course.title_course }} </h4>
                            <span>UNI SAINS</span>
                        </div>
                        <!-- <p class="description">{{ kursus.course.description }}</p> -->
                        <h3>Rp {{ formattedHarga(kursus.course.price) }}</h3>
                    </div>
                    <button @click="deleteFromCart(kursus.id)">Hapus</button>
                </div>
                <div class="not-found" v-if="cartData.length === 0 && !isLoading">
                    <p class="empty-cart">Keranjang kosong. Tambahkan kursus ke keranjang Anda!</p>
                </div>
            </div>
            <div v-if="isLoading" class="lds-facebook">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="summary-wp">
                <div class="ringkasan">
                    <h1>Ringkasan Pesanan</h1>
                    <ul v-if="dataCourse.length > 0">
                        <li v-for="(course, index) in dataCourse" :key="index">
                            {{ course.title_course }}
                        </li>
                    </ul>
                    <li v-else>Belum ada kursus yang dipilih (0)</li>
                </div>
                <div class="total">
                    <p>Total</p>
                    <h1 v-if="dataCourse.length > 0">
                        Rp {{ formattedHarga(dataCourse.reduce((total, course) => total + course.price, 0)) }}
                    </h1>
                    <h1 v-else>Rp 0</h1>
                </div>
                <button class="pesan" @click="checkout()">Pesan Sekarang</button>
            </div>
        </div>
        <Footer />
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Swal from 'sweetalert2';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { updateCartCount } from '@/utils/eventBus.js';

const cartData = ref([]);
const dataCourse = ref([]);
const router = useRouter();
const selectedCourseId = ref(null);
const isLoading = ref(false);
const cartCount = ref(0);
const store = useStore();


const formattedHarga = (harga) => {
    return parseInt(harga).toLocaleString('id-ID');
};

const goToDetailCourse = (courseId) => {
    router.push(`/detail-course/${courseId}`);
};

const toggleCheckbox = (kursus) => {
    if (kursus.isChecked) {
        if (dataCourse.value.length > 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Maaf, hanya bisa memilih satu kursus.',
            });
            kursus.isChecked = false;
            return;
        }

        // Uncheck semua kursus lainnya
        cartData.value.forEach(item => {
            if (item !== kursus) {
                item.isChecked = false;
            }
        });

        dataCourse.value = [kursus.course];
        selectedCourseId.value = kursus.course.id;
    } else {
        dataCourse.value = [];
        selectedCourseId.value = null;
    }
};

const fetchCartData = async () => {
    isLoading.value = true;
    try {
        const getUserInfo = localStorage.getItem('user-info');
        const user = JSON.parse(getUserInfo);
        const token = user.token;

        const response = await axios.get(
            'https://admin.unisains.com/api/v1/course/cart/all',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.status === 200) {
            const cartItems = response.data.data.cart;

            cartData.value = cartItems.map(item => {
                return {
                    course: item.course,
                    isChecked: false,
                    id: item.id, // Anda perlu menyesuaikan ini dengan atribut id yang ada di respons API
                };
            });
            cartCount.value = cartData.value.length;
            console.log(cartCount.value);
            // store.commit('updateCartCount', cartCount.value);
            // eventBus.$emit('updateCartCount', cartCount.value);
            updateCartCount(cartCount.value);
            // set cartCount di localStorage
            localStorage.setItem('cart-count', cartCount.value);
        }
        isLoading.value = false;
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Terjadi kesalahan saat menambahkan kursus ke keranjang.',
        });
    }
};

const deleteFromCart = async (courseId) => {
    try {
        // Tampilkan konfirmasi sebelum menghapus.
        const result = await Swal.fire({
            icon: 'warning',
            title: 'Yakin ingin menghapus?',
            text: 'Kursus akan dihapus dari keranjang.',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
        });

        // Jika pengguna menekan tombol "Ya" pada konfirmasi.
        if (result.isConfirmed) {
            const token = localStorage.getItem('token');

            const response = await axios.delete(
                `https://admin.unisains.com/api/v1/course/cart/delete/${courseId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                // Tampilkan alert konfirmasi jika berhasil menghapus.
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Kursus berhasil dihapus dari keranjang.',
                });

                fetchCartData();
            } else {
                console.error('Unexpected response status:', response.status);
            }
        }
        fetchCartData();
    } catch (error) {
        console.error('Delete request failed:', error);
        if (error.response) {
            console.error('Error response from server:', error.response);
        }

        // Tampilkan alert error jika gagal menghapus.
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Terjadi kesalahan saat menghapus kursus dari keranjang.',
        });
    }
};

// Di dalam fungsi checkout
const checkout = async () => {
    const courseId = selectedCourseId.value;
    if (!courseId) {
        // Tampilkan pesan bahwa tidak ada kursus yang dipilih
        // ...
    }

    const getUserInfo = localStorage.getItem('user-info');
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

        // Set selectedCourseId ke localStorage untuk digunakan di DetailPesanan
        localStorage.setItem("selectedCourseId", courseId);

        // Navigasi ke halaman detail-order dengan parameter idTrx
        router.push({ name: 'detail-order', params: { id: idTrx } });
    } catch (error) {
        console.error(error);
        // Handle error jika terjadi kesalahan pada checkout
        alert("Terjadi kesalahan saat checkout");
    }
};


onMounted(() => {
    fetchCartData();
});
</script>

<style scoped>
main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.wrapper {
    width: 82%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    margin-bottom: 100px;
}

.cart-course {
    width: 62%;
    margin-right: 70px;
    margin-bottom: 100px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
}

.not-found {
    width: 100%;
    height: 325px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 1px solid #c1c1c1;
    border-radius: 10px;
    margin-top: 20px;
}

.not-found .empty-cart {
    text-align: center;
    padding: 20px;
    color: black;
    font-size: 18px;
    font-weight: 600;
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

.cart-title {
    width: 82%;
    margin: 0 auto;
    font-size: 54px;
    font-weight: bold;
    color: black;
    margin-top: 100px;
    margin-bottom: 50px;
}

.card {
    width: auto;
    height: 170px;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #C1C1C1;
    margin: 20px;
    margin-left: 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.card input {
    width: 20px;
    height: 20px;
    margin-left: 20px;
    margin-right: 20px;
    cursor: pointer;
}

.card img {
    width: auto;
    height: 120px;
    border-radius: 5px;
    object-fit: cover;
}

.card .title {
    width: 30%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    margin-left: 40px;
}

.card h4 {
    width: auto;
    height: auto;
    font-size: 20px;
    font-weight: bold;
}

.card span {
    font-size: 16px;
    font-weight: 600;
    color: #F08A5D;
}

.card p {
    font-size: 14px;
    text-align: left;
}

.card .clickable-area h3 {
    width: auto;
    font-size: 20px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 50px;
}

.card button {
    width: 150px;
    height: 45px;
    margin-top: 5px;
    background-color: #F08A5D;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    font-family: poppins;
    cursor: pointer;
}

.card button:hover {
    background-color: #E0593F;
}

.clickable-area {
    width: 70%;
    height: 160px;
    background-color: #fff;
    display: flex;
    margin: 5px;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
}

.clickable-area img {
    width: 200px;
    height: 120px;
    object-fit: cover;
    border-radius: 5px;
    object-fit: cover;
}

.summary-wp {
    width: 30%;
    height: fit-content;
    color: black;
    border-radius: 10px;
    border: 1px solid #C1C1C1;
    margin-top: 20px;
    margin-bottom: 50px;
}

.summary-wp .ringkasan {
    width: auto;
    height: fit-content;
    margin: 30px;
    margin-bottom: 50px;
}

.summary-wp .ringkasan h1 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
}

.summary-wp .ringkasan ul li {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
}

.summary-wp .ringkasan li {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
}

.summary-wp .total {
    width: auto;
    align-items: center;
    height: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 30px;
    margin-bottom: 0;
}

.summary-wp .total p {
    font-size: 20px;
    font-weight: bold;
}

.summary-wp .total h1 {
    font-size: 26px;
    font-weight: bold;
}

.summary-wp button {
    width: 405px;
    height: 60px;
    background-color: #F08A5D;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    font-family: poppins;
    cursor: pointer;
    margin: 30px;
}
</style>
