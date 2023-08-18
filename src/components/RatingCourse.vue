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
                    </div>
                </div>
                <div class="dot">
                    <img src="@/assets/icon/dot.svg" alt="">
                </div>
            </div>
            <p>{{ review.comment }}</p>
        </div>
        <div v-else>
            <p class="else">Kursus ini belum mempunyai ulasan.</p>
          </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const reviews = ref([]);
const userData = ref([]);
const userAvatar = ref('');
const userName = ref('');
const rating = ref(0);

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

onMounted(() => {
    fetchReviews();
});
</script>

<style scoped>

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

.review .user .dot {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.review .user .dot img {
    width: 35px;
    height: 35px;
}

.else {
    width: 100%;
    height: 50px;
    font-size: 18px;
    color: #000000;
}
</style>