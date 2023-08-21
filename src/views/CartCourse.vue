<template>
    <main>
        <Navbar />   
        <h1>keranjang</h1>
        <div class="cart-course">
            <div v-for="(kursus, index) in cartData" :key="index" class="card">
                <img :src="kursus.course.thumbnail" alt="Course Thumbnail" />
                <h4>{{ kursus.course.title_course }}</h4>
                <!-- <p class="description">{{ kursus.course.description }}</p> -->
                <h3>Rp {{ kursus.course.price }}</h3>
                <button @click="deleteFromCart(kursus.id)">Hapus</button>
            </div>
        </div>
        <Footer />
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import axios from 'axios';

const cartData = ref([]);


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
            cartData.value = response.data.data.cart;
        }
    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan saat mengambil data keranjang.');
    }
};

const deleteFromCart = async (courseId) => {
    try {
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
            fetchCartData();
        } else {
            console.error('Unexpected response status:', response.status);
        }
    } catch (error) {
        console.error('Delete request failed:', error);
        if (error.response) {
            console.error('Error response from server:', error.response);
        }
        alert('Terjadi kesalahan saat menghapus kursus dari keranjang.');
    }
};

onMounted(() => {
    fetchCartData();
});

</script>

<style scoped>
.cart-course {
    width: 82%;
    margin: 0 auto;
    margin-bottom: 100px;
    display: flex;
    flex-wrap: wrap;
}

h1 {
    width: 82%;
    margin: 0 auto;
    font-size: 54px;
    font-weight: bold;
    color: black;
    margin-top: 100px;
    margin-bottom: 50px;
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
    object-fit: cover;
}

.card h4 {
    font-size: 18px;
    font-weight: bold;
    margin-top: 20px;
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

.card button {
    width: 150px;
    height: 45px;
    margin-top: 5px;
    margin-left: 175px; 
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
</style>
