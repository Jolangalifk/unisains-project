<template>
    <main>
        <Navbar />
        <h1 class="wishlist-title">Wishlist</h1>
        <div class="wrapper">
            <div class="wishlist-course">
                <div v-for="(kursus, index) in wishlistData" :key="index" class="wishlist">
                    <div class="clickable-area" @click="goToDetailCourse(kursus.course.id)">
                        <img :src="kursus.course.thumbnail" alt="Course Thumbnail" />
                        <div class="wishlist-gap">
                            <div class="wishlist-info">
                                <h4>{{ kursus.course.title_course }}</h4>
                                <span>UNI SAINS</span>
                            </div>
                            <!-- <p class="description">{{ kursus.course.description }}</p> -->
                            <h3>Rp {{ formattedHarga(kursus.course.price) }}</h3>
                        </div>
                    </div>
                    <button @click="deleteFromWishlist(kursus.id)">
                        <img src="@/assets/icon/heart-inline.svg" alt="">
                    </button>
                </div>
            </div>
        </div>
        <Footer />
    </main>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import axios from 'axios';

const router = useRouter();
const wishlistData = ref([]);

const formattedHarga = (harga) => {
    return parseInt(harga).toLocaleString('id-ID');
};

const goToDetailCourse = (courseId) => {
    router.push(`/detail-course/${courseId}`);
};

const isCourseInWishlist = (courseId) => {
    return wishlistData.value.some(item => item.course.id === courseId);
};

const fetchWishlistData = async () => {
    try {
        const getUserInfo = localStorage.getItem('user-info');
        const user = JSON.parse(getUserInfo);
        const token = user.token;  

        const response = await axios.get(
            'https://admin.unisains.com/api/v1/course/wishlist/all',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.status === 200) {
            wishlistData.value = response.data.data.wishlist;
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

const deleteFromWishlist = async (courseId) => {
    try {
        // Tampilkan konfirmasi sebelum menghapus.
        const result = await Swal.fire({
            icon: 'warning',
            title: 'Yakin ingin menghapus?',
            text: 'Kursus akan dihapus dari wishlist.',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
        });

        // Jika pengguna menekan tombol "Ya" pada konfirmasi.
        if (result.isConfirmed) {
            const token = localStorage.getItem('token');

            const response = await axios.delete(
                `https://admin.unisains.com/api/v1/course/wishlist/delete/${courseId}`,
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
                    text: 'Kursus berhasil dihapus dari wishlist.',
                });

                fetchWishlistData();
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
            text: 'Terjadi kesalahan saat menghapus kursus dari wishlist.',
        });
    }
};

onMounted(() => {
    fetchWishlistData();
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

.wishlist-course {
    width: 75%;
    margin-bottom: 100px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
}

.wishlist-title {
    width: 82%;
    margin: 0 auto;
    font-size: 54px;
    font-weight: bold;
    color: black;
    margin-top: 100px;
    margin-bottom: 50px;
}

.wishlist {
    width: auto;
    height: 170px;
    background-color: #fff;
    border: 1px solid #C1C1C1;
    border-radius: 10px;
    margin: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.wishlist img {
    width: 200px;
    height: 120px;
    border-radius: 5px;
    object-fit: cover;
    margin-left: 30px;
}

.wishlist-gap {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: 30px;
    gap: 50px;
}

.wishlist-info {
    width: 400px;
    display: flex;
    flex-direction: column;
}

.wishlist h4 {
    width: auto;
    height: auto;
    font-size: 20px;
    font-weight: bold;
}

.wishlist span {
    font-size: 16px;
    font-weight: 600;
    color: #F08A5D;
}

.wishlist p {
    font-size: 14px;
    text-align: left;
}

.wishlist h3 {
    width: auto;
    font-size: 20px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 50px;
}

.wishlist button {
    width: 70px;
    height: 70px;
    background-color: #F08A5D;
    border: none;
    border-radius: 10px;
    margin-left: 50px;
    cursor: pointer;
    display: flex; 
    align-items: center;
    justify-content: center;
}

.wishlist button img {
    width: 35px;
    height: 35px;
    margin: auto;
}

.wishlist button:hover {
    background-color: #E0593F;
}

.clickable-area {
    width: 80%;
    height: 160px;
    background-color: #fff;
    display: flex;
    margin: 5px;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
}
</style>