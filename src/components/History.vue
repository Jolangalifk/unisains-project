<template>
    <div>
        <div v-for="(item, index) in listHistory" :key="index" class="list-history">
            <div class="list">
                <div class="kursus">
                    <!-- Tambahkan cek kondisional menggunakan v-if -->
                    <p v-if="item.course">{{ item.course.title_course }}</p>
                    <p v-else>Kursus Tidak Tersedia</p>
                </div>
                <div class="text">
                    <div class="tanggal-p">
                        <p class="tanggal">{{ formatDate(item.date) }}</p>
                    </div>
                    <p>{{ item.status }}</p>
                    <p>Rp {{ formattedHarga(item.total_price) }}</p>
                    <p>{{ item.code_transaction }}</p>
                </div>
                <div class="button-detail">
                    <button class="nilai" @click="openPopup(item.course.id)">Nilai</button>
                </div>
                <div class="button-detail">
                    <button @click="goToDetail(item.id)">Detail</button>
                </div>
            </div>
        </div>
        <div v-if="isPopupVisible" class="popup-overlay">
            <div class="popup-content">
                <form @submit.prevent="submitForm">
                    <br>
                    <p>Silahkan beri ulasan untuk kursus ini </p>
                    <div class="star-rating">
                        <input class="radio-input" type="radio" id="star5" name="star-input" value="5" v-model="rateText" />
                        <label class="radio-label" for="star5" title="5 stars">5 stars</label>
                        <input class="radio-input" type="radio" id="star4" name="star-input" value="4" v-model="rateText" />
                        <label class="radio-label" for="star4" title="4 stars">4 stars</label>
                        <input class="radio-input" type="radio" id="star3" name="star-input" value="3" v-model="rateText" />
                        <label class="radio-label" for="star3" title="3 stars">3 stars</label>
                        <input class="radio-input" type="radio" id="star2" name="star-input" value="2" v-model="rateText" />
                        <label class="radio-label" for="star2" title="2 stars">2 stars</label>
                        <input class="radio-input" type="radio" id="star1" name="star-input" value="1" v-model="rateText" />
                        <label class="radio-label" for="star1" title="1 star">1 star</label>
                    </div>
                    <br>
                    <textarea id="w3review" name="w3review" rows="10" cols="50" v-model="comment"
                        placeholder="berikan ulsanmu disini!"></textarea>
                    <br>
                    <!-- get hide course id with model course_Id -->
                    <input type="hidden" v-model="course_Id">
                    <div class="button-submit">   
                        <button class="close" @click="closePopup()">Tutup</button>
                        <input class="submit" type="submit" value="Kirim">
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import Swal from 'sweetalert2';

const listHistory = ref([]);
const router = useRouter();
const route = useRoute();
let rateText = ref(null);
let course_Id = ref(null);
let comment = ref("");

const isPopupVisible = ref(false);

const openPopup = (courseId) => {
    course_Id = courseId;
    isPopupVisible.value = true;
};

const closePopup = () => {
    isPopupVisible.value = false;
};

const submitForm = async () => {
    const url = "https://admin.unisains.com/api/v1/course/rate";
    const token = localStorage.getItem('token'); // Ganti dengan bearer token Anda

    const formData = new FormData();
    formData.append("course_id", course_Id);
    formData.append("rate", rateText.value);
    formData.append("comment", comment.value);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.ok) {
            // shwo success alert
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Data berhasil dikirim!',
            });
            console.log("Data submitted successfully!");
            closePopup();
            // Reset form fields if needed
            course_Id = null;
            rateText.value = null;
            comment.value = "";
        } else {
            // Show error alert
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Gagal mengirim rating. Silakan coba lagi nanti.',
            });
            closePopup();
            console.error("Failed to submit data.");
        }
    } catch (error) {
        // Show error alert
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Gagal mengirim rating. Silakan coba lagi nanti.',
        });
        console.error("An error occurred:", error);
    }
};

const formatDate = (date) => {
    // Implement your date formatting logic here
    // For example, you can use JavaScript Date object or a library like moment.js
    return date;
};

const goToDetail = (transactionId) => {
    router.push(`/detail-transaction/${transactionId}`);
    console.log(transactionId);
};

onMounted(async () => {
    try {
        const getUserInfo = localStorage.getItem('user-info');
        const user = JSON.parse(getUserInfo);
        const token = user.token;
        const response = await axios.get('https://admin.unisains.com/api/v1/transaction/all', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })

        listHistory.value = response.data.data.transactions;
        console.log(listHistory.value);
        // if (response.data.status === 200) {
        //     listHistory.value = response.data.data;
        // }
    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan saat mengambil data transaksi.');
    }
});

function formattedHarga(harga) {
    return harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

</script>

<style scoped>
.list-history {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
}

.list-history .list {
    width: 100%;
    height: 130px;
    display: flex;
    flex-direction: row;
    font-size: 20px;
    border: 1px solid #C1C1C1;
    border-radius: 20px;
}

.list-history .list .kursus {
    width: 21%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: black;
    align-items: center;
    justify-content: center;
}

.list-history .list .kursus p {
    font-size: 20px;
    font-weight: 600;
    text-align: center;
}

.list-history .list .text {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.list-history .list .text p {
    width: 200px;
    text-align: center;
    color: black;
}

.list-history .list .button-detail {
    width: auto;
    height: 100%;
    margin-left: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.list-history .list .button-detail button {
    width: 150px;
    height: 50px;
    background-color: #B83B5E;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    font-family: poppins;
}

.list-history .list .button-detail button:hover {
    background-color: white;
    color: #B83B5E;
    transition: 0.5s;
    border: 1px solid #B83B5E;
}

.list-history .list .button-detail .nilai {
    background-color: white;
    color: #B83B5E;
    border: 1px solid #B83B5E;
}

.list-history .list .button-detail .nilai:hover {
    background-color: #B83B5E;
    color: white;
    transition: 0.5s;
}

.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* Background semi-transparent untuk overlay */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    /* Pastikan popup muncul di atas konten lain */
}

.popup-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.popup-content form {
    width: 700px;
    height: 500px;
    display: flex;
    flex-direction: column;
}

.popup-content form p {
    font-size: 20px;
    font-weight: 600;
    color: black;
}

.popup-content form .star-rating {
    width: 50%;
    display: flex;
    justify-content: space-between;
}

.star-rating {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
  }
  
  .radio-input {
    position: fixed;
    opacity: 0;
    pointer-events: none;
  }
  
  .radio-label {
    cursor: pointer;
    font-size: 0;
    color: rgba(0,0,0,0.2);
    transition: color 0.1s ease-in-out;
  }
  
  .radio-label:before {
    content: "★";
    display: inline-block;
    font-size: 70px;
  }
  
  .radio-input:checked ~ .radio-label {
    color: #ffc700;
    color: gold;
  }
  
  .radio-label:hover,
  .radio-label:hover ~ .radio-label {
    color: goldenrod;
  }
  
  .radio-input:checked + .radio-label:hover,
  .radio-input:checked + .radio-label:hover ~ .radio-label,
  .radio-input:checked ~ .radio-label:hover,
  .radio-input:checked ~ .radio-label:hover ~ .radio-label,
  .radio-label:hover ~ .radio-input:checked ~ .radio-label {
    color: darkgoldenrod;
  }
  

.popup-content form textarea {
    width: 100%;
    height: 100%;
    border: 1px solid #C1C1C1;
    border-radius: 5px;
    margin-bottom: 20px;
    padding: 10px;
    font-size: 16px;
    font-family: poppins;
    color: black;
}

.popup-content form .button-submit {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.popup-content form .submit {
    width: 49%;
    height: 60px;
    background-color: #B83B5E;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    font-family: poppins;
}

.popup-content form .submit:hover {
    background-color: white;
    color: #B83B5E;
    transition: 0.5s;
    border: 1px solid #B83B5E;
}

.popup-content form .close {
    width: 49%;
    height: 60px;
    background-color: white;
    border: none;
    border-radius: 5px;
    color: #B83B5E;
    border: 1px solid #B83B5E;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    font-family: poppins;
}

.popup-content form .close:hover {
    background-color: #B83B5E;
    color: white;
    transition: 0.5s;
}
</style>