<template>
    <div class="review-container">
        <div class="review" v-if="reviews.length > 0" v-for="(review, index) in reviews" :key="index">
            <div class="user">
                <div class="image">
                    <!-- get user.avatar from userData -->
                    <img :src="userAvatar[index]" alt="Profile Thumbnail">
                </div>
                <div class="name">
                    <h3>{{ userName[index] }}</h3>
                    <!-- <input type="number" v-model="review.rate" :key="'rate-' + index" disabled> -->
                    <!-- <star-ratings :rating="review.rate" :star-size="20" :read-only="true"></star-ratings> -->
                    <div class="star-ratings">
                        {{ generateStars(review.rate) }}
                        <span>{{ review.date }}</span>
                    </div>
                </div>
                <button v-if="review.rated_by_me" class="dot-button" @click="openPopup(review.id)">
                    <img src="@/assets/icon/edit-icon.svg" alt="">
                </button>
            </div>
            <p>{{ review.comment }}</p>
        </div>
        <div v-else>
            <p class="else">Kursus ini belum mempunyai ulasan.</p>
        </div>
        <div v-if="isPopupVisible" class="popup-overlay">
            <div class="popup-content">
                <form @submit.prevent="submitForm">
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
                        placeholder="berikan ulsanmu disini!"></textarea>
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
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const route = useRoute();
const reviews = ref([]);
const userData = ref([]);
const userAvatar = ref('');
const userName = ref('');
const rating = ref(0);
const isPopupVisible = ref(false);
const rateText = ref('');
const comment = ref('');
const course_Id = ref(null);

const openPopup = async (commentId) => {
    const getUserInfo = localStorage.getItem('user-info');
    const user = JSON.parse(getUserInfo);
    const token = user.token;
    try {
        const response = await axios.get(`https://admin.unisains.com/api/v1/course/rate/edit/${commentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = response.data.data.rate;
        rateText.value = data.rate;
        comment.value = data.comment;
        course_Id.value = data.id;
        isPopupVisible.value = true;
    } catch (error) {
        console.error(error);
    }
};

const closePopup = () => {
    isPopupVisible.value = false;
};

const generateStars = (rating) => {
    const maxRating = 5;
    const fullStar = '★';
    const emptyStar = '☆';
    const stars = [];

    for (let i = 0; i < maxRating; i++) {
        if (i < rating) {
            stars.push(fullStar);
        } else {
            stars.push(emptyStar);
        }
    }

    return stars.join('');
};

// Fungsi untuk mengambil data dari API dengan menggunakan token dari local storage
const fetchReviews = async () => {
    const getUserInfo = localStorage.getItem('user-info');
    const user = JSON.parse(getUserInfo);
    const token = user.token;
    try {
        const courseId = route.params.id; // Ubah disini, langsung mengambil nilai dari useRoute().params.id
        const response = await axios.get(`https://admin.unisains.com/api/v1/course/show/${courseId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        reviews.value = response.data.data.course.rates;
        console.log(reviews.value);
        // get user data in rates array from API
        userData.value = reviews.value.map((review) => review.user);
        console.log(userData.value);
        userAvatar.value = userData.value.map((user) => user.image);
        console.log(userAvatar.value);
        userName.value = userData.value.map((user) => user.username);
        console.log(userName.value);
        rating.value = reviews.value.map((review) => review.rate);
        console.log(rating.value);

    } catch (error) {
        console.error(error);
    }
};

const submitForm = async () => {
    const url = `https://admin.unisains.com/api/v1/course/rate/update/${course_Id.value}`;
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
                text: 'Data berhasil diperbarui!',
            });
            console.log("Data updated successfully!");

            // Perbarui komentar pada indeks yang sesuai dalam array reviews
            const updatedReviewIndex = reviews.value.findIndex(review => review.id === course_Id.value);
            if (updatedReviewIndex !== -1) {
                reviews.value[updatedReviewIndex].comment = comment.value;
                reviews.value[updatedReviewIndex].rate = rateText.value; // Update juga rating
            }

            closePopup();
            course_Id.value = null;
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


onMounted(() => {
    fetchReviews();
});
</script>

<style scoped>
.star-ratings {
    font-size: 24px;
    color: #ffc700;
    margin-bottom: 10px;
}

.star-ratings span {
    font-size: 18px;
    color: #6d7588;
    margin-left: 10px;
}

.review-container {
    width: 100%;
    height: fit-content;
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 20px;
}

.review {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    border: 1px solid #c1c1c1;
    border-radius: 10px;
}

.review p {
    width: 92%;
    font-size: 18px;
    color: #000000;
    font-weight: normal;
    margin-top: 20px;
    margin-left: 20px;
    margin-bottom: 50px;
}

.review .user {
    width: auto;
    height: 70px;
    display: flex;
    flex-direction: row;
    margin: 20px;
}

.review .user .image {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: #c4c4c4;
}

.review .user .image img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
}

.review .user .name {
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: column;
    margin-left: 20px;
}

.review .user .name h3 {
    font-size: 20px;
    font-weight: 600;
    color: #000000;
}

.review .user .name img {
    width: 100px;
    height: 20px;
    margin-top: 5px;
}

.review .user .dot-button {
    width: auto;
    height: 50%;
    justify-content: center;
    align-items: center;
    display: flex;
    align-items: center;
    margin: 15px;
    border: none;
    background-color: white;
}

.review .user .dot-button img {
    width: 30px;
    height: 30px;
}

.else {
    width: 100%;
    height: 50px;
    font-size: 18px;
    color: #000000;
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