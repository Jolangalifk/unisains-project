<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const isLoggedIn = ref(false)
const router = useRouter()
const popup = ref(false)

function showPreview() {
    popup.value = true;
}

function closePreview() {
    popup.value = false;
}

function handlePopup() {
    if (isLoggedIn.value == false) {
        showPreview()
    }
}

function goToDetailCourse() {
    if (isLoggedIn.value) {
        // Logika untuk mengarahkan ke halaman detail kursus jika sudah login
        // Contoh: Menggunakan router untuk mengarahkan ke halaman detail kursus
        router.push('/detail-course');
    } else {
        // Logika untuk mengarahkan ke halaman login jika belum login
        // Contoh: Menggunakan router untuk mengarahkan ke halaman login
        router.push('/login');
    }
}

onMounted(async () => {
    isLoggedIn.value = checkUserloginStatus()

    function checkUserloginStatus() {
        // get token
        const token = localStorage.getItem('token')
        return token ? true : false
    }

})

// export default {
//     data() {
//         return {
//             isLoggedIn: false,
//             showPopup: false
//         };
//     },
//     methods: {
//         showPreview() {
//             this.showPopup = true;
//         },
//         closePreview() {
//             this.showPopup = false;
//         },
//         goToDetailCourse() {
//             if (this.isLoggedIn) {
//                 // Logika untuk mengarahkan ke halaman detail kursus jika sudah login
//                 // Contoh: Menggunakan router untuk mengarahkan ke halaman detail kursus
//                 this.$router.push('/detail-course');
//             } else {
//                 // Logika untuk mengarahkan ke halaman login jika belum login
//                 // Contoh: Menggunakan router untuk mengarahkan ke halaman login
//                 this.$router.push('/login');
//             }
//         }
//     }
// };

</script>

<template>
    <div>
        <div v-if="isLoggedIn" class="card" @click="goToDetailCourse()">
            <img src="@/assets/image/card-bg.png" alt="">
            <h4>Anatomi Tubuh Manusia : Jantung</h4>
            <p>UNI SAINS</p>
            <img class="svg" src="@/assets/icon/rating-ex.svg" alt="">
            <h3>Rp 300,000</h3>
        </div>
        <div v-else class="card" @click="handlePopup()">
            <img src="@/assets/image/card-bg.png" alt="">
            <h4>Anatomi Tubuh Manusia : Jantung</h4>
            <p>UNI SAINS</p>
            <img class="svg" src="@/assets/icon/rating-ex.svg" alt="">
            <h3>Rp 300,000</h3>
        </div>
    </div>
    <!-- Pop up preview -->
    <div v-if="popup" class="popup">
        <div class="two-preview">
            <div class="preview-image">
                <img src="@/assets/image/card-bg.png" alt="">
            </div>
            <div class="preview-content">
                <div class="tittle-btn">
                    <h4>Anatomi Tubuh Manusia : Jantung</h4>
                    <button @click="closePreview()">
                        <img src="@/assets/icon/close-icon.svg" alt="">
                    </button>
                </div>
                <h3>Kategori : Astronomi</h3>
                <h3>Harga : Rp 300,000</h3>
                <p class="text-deskripsi-preview">Lorem ipsum dolor sit amet consectetur. Ullamcorper cursus dictum
                    dolor
                    auctor. Vitae eget pellentesque id nunc nisi gravida. Lorem ipsum dolor sit amet consectetur.
                    Ullamcorper cursus dictum dolor auctor. Vitae eget pellentesque id nunc nisi gravida.</p>
                <button class="selengkapnya"><router-link to="/login">Selengkapnya</router-link></button>
            </div>
        </div>
    </div>
</template>
  

  
<style  scoped>
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
    margin-bottom: 30px;
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
  