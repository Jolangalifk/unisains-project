<template>
    <main>
        <Navbar />
        <h1 class="cart-title">Keranjang</h1>
        <div class="wrapper">
            <div class="cart-course">
                <div v-for="(kursus, index) in cartData" :key="index" class="card">
                    <input type="checkbox" class="checkbox" v-model="kursus.isChecked" @change="toggleCheckbox(kursus)">
                    <img :src="kursus.course.thumbnail" alt="Course Thumbnail" />
                    <h4>{{ kursus.course.title_course }} <span>UNI SAINS</span></h4>
                    <!-- <p class="description">{{ kursus.course.description }}</p> -->
                    <h3>Rp {{ formattedHarga(kursus.course.price) }}</h3>
                    <button @click="deleteFromCart(kursus.id)">Hapus</button>
                </div>
            </div>
            <div class="summary-wp">
                <div class="ringkasan">
                    <h1>Ringkasan Pesanan</h1>
                    <ul>
                        <li v-for="(courseTitle, index) in dataCourse" :key="index">
                            {{ courseTitle.title_course }}
                        </li>
                    </ul>
                </div>
                <div class="total">
                    <p>Total</p>
                    <!-- <h1>Rp 500.000</h1> -->
                    <h1 v-for="(courseTitle, index) in dataCourse" :key="index">
                        Rp {{ formattedHarga(courseTitle.price) }}
                    </h1>
                </div>
                <button>Bayar sekarang</button>
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

const cartData = ref([]);
const dataCourse = ref([]);

const formattedHarga = (harga) => {
    return harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const toggleCheckbox = (kursus) => {
    kursus.isChecked = kursus.isChecked;

    if (kursus.isChecked) {
        dataCourse.value.push(kursus.course);
    } else {
        const index = dataCourse.value.indexOf(kursus.course);
        if (index !== -1) {
            dataCourse.value.splice(index, 1);
        }
    }
};


const fetchCartData = async () => {
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
}

.cart-course {
    width: 62%;
    margin-right: 70px;
    margin-bottom: 100px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
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
    width: 200px;
    height: 120px;
    border-radius: 5px;
    object-fit: cover;
}

.card h4 {
    width: 22%;
    height: auto;
    font-size: 20px;
    font-weight: bold;
    margin: 20px;
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

.card h3 {
    width: auto;
    font-size: 20px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 40px;
    margin-right: 40px;
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
    margin-left: 40px;
}

.card button:hover {
    background-color: #E0593F;
}

.summary-wp {
    width: 30%;
    height: fit-content;
    color: black;
    border-radius: 10px;
    border: 1px solid #C1C1C1;
    margin-top: 20px;
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
