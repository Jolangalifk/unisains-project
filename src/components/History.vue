<template>
    <div v-if="listHistory.length > 0">
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
                    <button v-if="item.course.is_purchased && !item.is_rated" class="nilai"
                        @click="openPopup(item.course.id, item)">
                        Ulasan
                    </button>
                    <button v-else-if="item.course.is_purchased && item.is_rated && item.rate.status === 'pending'"
                        class="nilai" @click="handlePendingClick(item.rate.id, item)">
                        Menunggu
                    </button>
                    <button v-else-if="item.course.is_purchased && item.is_rated" class="nilai"
                        @click="openPopupUpdate(item.rate.id, item)">
                        Ubah Ulasan
                    </button>
                </div>
                <div v-if="!item.course.is_purchased" class="button-detail-pending">
                    <button @click="goToDetail(item.id)">Detail</button>
                </div>
                <div v-else-if="item.course.is_purchased" class="button-detail">
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
                        placeholder="berikan ulasanmu disini!"></textarea>
                    <br>
                    <!-- get hide course id with model course_Id -->
                    <input type="hidden" v-model="course_Id.value">
                    <div class="button-submit">
                        <button class="close" @click="closePopup()">Tutup</button>
                        <input class="submit" type="submit" value="Kirim">
                    </div>
                </form>
            </div>
        </div>
        <div v-else-if="isPopupVisibleUpdate" class="popup-overlay">
            <div class="popup-content">
                <form @submit.prevent="submitFormUpdate">
                    <br>
                    <p>Silahkan ubah ulasan untuk kursus ini </p>
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
                        placeholder="berikan ulasanmu disini!"></textarea>
                    <br>
                    <!-- get hide course id with model course_Id -->
                    <input type="hidden" v-model="comment_Id.value">
                    <div class="button-submit">
                        <button class="close" @click="closePopupUpdate()">Tutup</button>
                        <input class="submit" type="submit" value="Kirim">
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div v-else class="list-else">
        <p>Belum ada transaksi untuk saat ini</p>
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
const comment = ref('');
const comment_Id = ref(null);

const isPopupVisible = ref(false);
const isPopupVisibleUpdate = ref(false);

const handlePendingClick = (rateId, item) => {
  // Simpan status ulasan ke database dengan status 'pending' di sini
  // Setelah berhasil, tampilkan pemberitahuan
  submitPendingReview(rateId, item);
};

const submitPendingReview = async (rateId, item) => {
  try {
    // Simpan ulasan dengan status 'pending' ke database di sini
    // Anda dapat menggunakan axios atau library lain untuk mengirim permintaan HTTP
    // Setelah berhasil menyimpan ulasan, tampilkan pemberitahuan
    await saveReviewWithPendingStatus(rateId);

    // Tampilkan pemberitahuan SweetAlert2
    Swal.fire({
      icon: 'info',
      title: 'Ulasan Anda terkirim!',
      text: 'Harap tunggu konfirmasi dari admin.',
      confirmButtonText: 'Ok',
    });
  } catch (error) {
    console.error('Gagal menyimpan ulasan:', error);
  }
};

const saveReviewWithPendingStatus = async (rateId) => {
  // Logika untuk menyimpan ulasan dengan status 'pending' ke database
};

const openPopup = (courseId, item) => {
    course_Id.value = courseId;
    if (item.is_rated) {
        Swal.fire({
            icon: 'info',
            title: 'Info',
            text: 'Anda sudah memberikan rating untuk kursus ini.',
        });
    } else {
        isPopupVisible.value = true;
    }
};

const openPopupUpdate = async (courseId, item) => {
    course_Id.value = courseId;
    if (!item.is_rated) {
        // Tambahkan logika untuk mengecek apakah item belum dirating
        Swal.fire({
            icon: 'info',
            title: 'Info',
            text: 'Anda belum memberikan rating untuk kursus ini.',
        });
    } else {
        // Tambahkan logika untuk menampilkan data ulasan yang sudah ada
        rateText.value = item.rate.rate;
        comment.value = item.rate.comment;
        comment_Id.value = item.rate.id;
        isPopupVisibleUpdate.value = true;
    }
};

const closePopup = () => {
    isPopupVisible.value = false;
};

const closePopupUpdate = () => {
    isPopupVisibleUpdate.value = false;
};

const submitForm = async () => {
    const url = "https://admin.unisains.com/api/v1/course/rate";
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append("course_id", course_Id.value);
    formData.append("rate", rateText.value);
    formData.append("comment", comment.value);

    try {
        const response = await axios.post(url, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Ulasan berhasil dikirim!, silahkan tunggu konfirmasi dari admin.',
            });
            console.log("Data submitted successfully!");
            closePopup();
            course_Id.value = null;
            rateText.value = null;
            comment.value = "";
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Gagal mengirim rating. Silakan coba lagi nanti.',
            });
            console.error("Failed to submit data.");
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Gagal mengirim rating. Silakan coba lagi nanti.',
        });
        console.error("An error occurred:", error);
    }
};

const submitFormUpdate = async () => {
    const url = `https://admin.unisains.com/api/v1/course/rate/update/${comment_Id.value}`;
    const token = localStorage.getItem('token');

    const requestData = {
        rate: rateText.value,
        comment: comment.value
    };

    try {
        const response = await axios.post(url, requestData, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Ulasan berhasil diperbarui!',
            });
            console.log("Data updated successfully!");

            // Perbarui komentar pada indeks yang sesuai dalam array listHistory
            const updatedReviewIndex = listHistory.value.findIndex(item => item.rate.id === comment_Id.value);
            if (updatedReviewIndex !== -1) {
                listHistory.value[updatedReviewIndex].rate.comment = comment.value;
                listHistory.value[updatedReviewIndex].rate.rate = rateText.value; // Update juga rating
            }

            closePopupUpdate();
            comment_Id.value = null;
            rateText.value = '';
            comment.value = "";

            // Memuat ulang data reviews setelah berhasil mengirim permintaan POST
            fetchReviews();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Gagal mengirim rating. Silakan coba lagi nanti.',
            });
            console.error("Failed to update data.");
        }
    } catch (error) {
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


const fetchReviews = async () => {
    try {
        const getUserInfo = localStorage.getItem('user-info');
        const user = JSON.parse(getUserInfo);
        const token = user.token;
        const response = await axios.get('https://admin.unisains.com/api/v1/transaction/all', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        if (response.status === 200) {
            listHistory.value = response.data.data.transactions;
            console.info(listHistory.value);
        } else {
            console.error('Failed to fetch data: Unexpected status code', response.status);
            // Handle the error here, e.g., by showing an error message to the user.
        }
    } catch (error) {
        console.error('An error occurred while fetching data:', error);
        // Handle the error here, e.g., by showing an error message to the user.
    }
};


onMounted(() => {
    fetchReviews(); // Panggil fungsi fetchReviews saat komponen di-mount
});

function formattedHarga(harga) {
    return harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
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
    font-size: 18px;
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

.list-history .list .button-detail-pending {
    width: auto;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.list-history .list .button-detail-pending button {
    width: 330px;
    height: 50px;
    background-color: #B83B5E;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    font-family: poppins;
}

.list-history .list .button-detail-pending button:hover {
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
    color: rgba(0, 0, 0, 0.2);
    transition: color 0.1s ease-in-out;
}

.radio-label:before {
    content: "★";
    display: inline-block;
    font-size: 70px;
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