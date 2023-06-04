<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import ModulCourse from '../components/ModulCourse.vue'
import RatingCourse from '../components/RatingCourse.vue'
import CardMain from '../components/CardMain.vue'
</script>

<template>
    <main>
        <Navbar />
        <div class="main-page">
            <div class="preview">
                <img src="@/assets/image/card-bg.png" alt="">
                <h3>Rp 300,000</h3>
                <div class="button">
                    <button class="cart">Keranjang</button>
                    <button class="favorit">
                        <img src="@/assets/icon/favorite-icon.svg" alt="">
                    </button>
                </div>
                <p class="cover">Kursus ini meliputi:</p>
                <p class="item">1. Dapet sertifikat tanah</p>
                <p class="item">2. Dapet sertifikat tanah</p>
                <p class="item">3. Dapet sertifikat tanah</p>
            </div>
            <div class="info">
                <div class="text">
                    <h3>Judul Kursus - Anatomi Buaya Udara</h3>
                    <p>UNISAINS</p>
                </div>
                <div class="material">
                    <p class="cover">Apa yang akan Anda pelajari</p>
                    <p class="item">a. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nibh.</p>
                    <p class="item">b. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nibh.</p>
                    <p class="item">c. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nibh.</p>
                </div>
            </div>
        </div>
        <div class="modul-course">
            <p>Konten kursus :</p>
            <p>3 Modul - 30 Materi - Total durasi 2j 15m</p>
            <ModulCourse />
        </div>
        <div class="condition">
            <p class="wrapper">Persyaratan</p>
            <p class="item">1. Mac atau Windows</p>
            <p class="item">2. Mempunyai HP yang support Augmented Reality (AR)</p>
            <p class="item">3. Pemahaman dasar tentang anatomi</p>
        </div>
        <div class="rating-course">
            <h3>4.7 course rating . 11K ratings</h3>
            <div class="wrapper-review">
                <div class="rate1">
                    <RatingCourse />
                    <RatingCourse />
                    <RatingCourse />
                </div>
                <div class="rate2">
                    <RatingCourse />
                    <RatingCourse />
                    <RatingCourse />
                </div>
            </div>
            <button class="show">Show all reviews</button>
        </div>
        <div class="more-course">
            <h3>More Course</h3>
            <div class="cat1">
                <CardMain />
                <CardMain />
                <CardMain />
                <CardMain />
            </div>
            <div class="cat2">
                <CardMain />
                <CardMain />
                <CardMain />
                <CardMain />
            </div>
        </div>
        <Footer />
    </main>
</template>

<style scoped>
.main-page {
    width: 100%;
    height: 980px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.preview {
    width: 430px;
    height: 700px;
    border-radius: 20px;
    margin-left: 200px;
    margin-right: 70px;
    border: 1px solid #c1c1c1;
    display: flex;
    flex-direction: column;
}

.preview img {
    border-radius: 20px 20px 0 0;
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
    width: 85%;
    margin-left: 30px;
    display: flex;
    align-items: center;
}

.preview .button button {
    width: 250px;
    height: 70px;
    border-radius: 30px;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 20px;
}

.preview .button .cart {
    background-color: #6A2C70;
    color: white;
    font-size: 18px;
    font-weight: 600;
    font-family: poppins;
    margin-right: 20px;
}

.preview .button .favorit {
    width: 85px;
    height: 70px;
    background-color: white;
    border: 1px solid #c1c1c1;
    font-size: 18px;
    font-weight: 600;
}

.preview .button .favorit img {
    color: #6A2C70;
    width: 70%;
    height: 70%;
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
    height: 700px;
    margin-right: 200px;
    display: flex;
    flex-direction: column;
}

.info .text {
    width: 95%;
    margin-left: 30px;
    margin-bottom: 70px;
}

.info .text h3 {
    font-size: 60px;
    font-weight: 700;
    color: #000000;
}

.info .text p {
    font-size: 26px;
    font-weight: 600;
    color: #000000;
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

.modul-course {
    width: 80%;
    height: 600px;
    display: flex;
    flex-direction: column;
    margin-left: 200px;
}

.modul-course p {
    font-size: 20px;
    font-weight: 600;
    color: #000000;
    margin-bottom: 20px;
}

.modul-course .wrapper {
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
    height: 820px;
    display: flex;
    flex-direction: column;
    margin-left: 200px;
    border: 1px solid #c1c1c1;
    border-radius: 20px;
    margin-bottom: 100px;
}

.rating-course h3 {
    font-size: 30px;
    font-weight: 600;
    color: #000000;
    margin: 30px 0 20px 30px;
}

.rating-course .wrapper-review {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 100px;
}

.rating-course .wrapper-review .rate1 {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: row;
    padding-right: 30px;
}

.rating-course .wrapper-review .rate2 {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: row;
    padding-right: 30px;
}

.rating-course .show {
    width: 250px;
    height: 70px;
    border-radius: 20px;
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
    height: 850px;
    display: flex;
    flex-direction: column;
    margin-left: 200px;
    margin-bottom: 100px;
}

.more-course h3 {
    font-size: 30px;
    font-weight: 600;
    color: #000000;
    margin: 30px 0 20px 0;
}

.more-course .cat1 {
    width: 100%;
    height: 380px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

.more-course .cat2 {
    width: 100%;
    height: 380px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

</style>