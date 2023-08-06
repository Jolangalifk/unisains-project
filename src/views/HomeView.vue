<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import HcAstronomi from '../components/HcAstronomi.vue';
import HcBiologi from '../components/HcBiologi.vue';
</script>

<template>
  <main>
    <Navbar />
    <div class="main-page">
      <div class="unisains-text">
        <h1>UNISAINS.</h1>
      </div>
    </div>
    <div class="informasi">
      <div class="iklan">
        <h3>Tingkatkan Keterampilan <span class="purple"> Sains </span> Anda dengan <span class="orange"> kursus online
          </span> kami.</h3>
      </div>
      <div class="cta">
        <h3>Bergabung dengan kursus kami</h3>
        <p>Kursus dengan fitur menarik yang belum dimiliki kursus pada umumnya.</p>
        <button>
          <router-link to="/register">Daftar!</router-link>
          <img src="@/assets/icon/arrow-right.svg" alt="">
        </button>
      </div>
      <div class="img-wrapper">
        <img src="@/assets/icon/bumi.svg" alt="">
      </div>
    </div>
    <div class="promotion">
      <div class="ilustration">
        <img src="@/assets/image/ilustrasi1.png" alt="">
      </div>
      <div class="promotion-teks">
        <h3>Kami menyediakan Kursus Online cerdas</h3>
        <p>Kursus kami dilengkapi dengan projek yang ditugaskan, Interaksi langsung dengan pengguna lain, Fitur yang
          membantu anda pada saat pembelajaran.</p>
      </div>
    </div>
    <div class="features">
      <div class="special-features">
        <div class="suggested">
          <h3>Fitur kami khusus untuk Anda!</h3>
          <p>Terdapat beberepa fitur-fitur menarik yang kami sediakan disini, tentunya agar membuat pengguna lebih nyaman
            dan lebih semangat untuk mempelajari kursus.</p>
        </div>
        <div class="ar">
          <div class="icon">
            <img src="@/assets/icon/ar-icon.svg" alt="">
          </div>
          <h3>Augmented Reality</h3>
          <p>Pengguna dapat SCAN Objek yang bertanda khusus di setiap modul kemudian muncul visualisasi Objek 3D. Agar
            pembelajaran menjadi menyenangkan.</p>
        </div>
      </div>
      <div class="other-features">
        <div class="wrapper-features">
          <div class="icon">
            <img src="@/assets/icon/lifetime-access-icon.svg" alt="">
          </div>
          <h3>Akses Seumur Hidup</h3>
          <p>Semua kursus yang sudah dibeli bisa digunakan tanpa ada batasan waktu atau diakses seumur hidup.</p>
        </div>
        <div class="wrapper-features">
          <div class="icon">
            <img src="@/assets/icon/tutorial-icon.svg" alt="">
          </div>
          <h3>Video Pelajaran</h3>
          <p>Rekaman tentang materi dari kami untuk meningkatkan produktivitas anda.</p>
        </div>
        <div class="wrapper-features">
          <div class="icon">
            <img src="@/assets/icon/certificate-icon.svg" alt="">
          </div>
          <h3>Sertifikat</h3>
          <p>Mendapatkan Sertifikat, yang bertujuan untuk mengetes keberhasilan pengguna dalam mengikuti kursus.</p>
        </div>
      </div>
    </div>
    <div class="popular-course">
      <div class="text">
        <h3>Kursus Populer</h3>
        <p>Terdapat kursus populer juga yang diambil dari rating dan pembelian terbanyak dari pengguna kursus tersebut.
        </p>
      </div>
      <div class="two-course">
        <div class="course">
          <HcAstronomi />
        </div>
        <div class="course">
          <HcBiologi />
        </div>
      </div>
    </div>
    <div class="practical">
      <div class="text">
        <h3>Mudah Untuk Memulai Belajar</h3>
        <p>Proses Masuk Kami Memungkinkan Anda Memulai Perjalanan Belajar Anda Tanpa Banyak Kerepotan. Tujuan Kami Adalah
          Untuk Menciptakan Pengalaman Belajar Yang Luar Biasa Untuk Anda.</p>
        <div class="step">
          <div class="step-by-step">
            <img src="@/assets/icon/ceklist-icon.svg" alt="">
            <p>Buat Akun</p>
          </div>
          <div class="step-by-step">
            <img src="@/assets/icon/ceklist-icon.svg" alt="">
            <p>Membeli Kursus</p>
          </div>
          <div class="step-by-step">
            <img src="@/assets/icon/ceklist-icon.svg" alt="">
            <p>Mulai Belajar</p>
          </div>
        </div>
      </div>
      <div class="image">
        <img src="@/assets/image/ilustration2.png" alt="">
      </div>
    </div>
    <div class="start-learn">
      <div class="wrapper">
        <div class="image">
          <img src="@/assets/image/ilustration3.png" alt="">
        </div>
        <div class="text">
          <h3>Bersiaplah untuk Memulai!</h3>
          <p>Jadi gimana? Ini akan menjadi solusi kamu buat yang mau belajar sains, yuk coba tantangan dan keseruan
            lainnya dengan mempelajari kursus yang ada disini ya!</p>
          <div class="button">
            <button>
              <router-link to="/course">Mulai!</router-link>
              <img src="@/assets/icon/arrow-right-orange.svg" alt="">
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </main>
</template>

<style scoped>
.main-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/image/background-page.png');
}


.main-page .unisains-text {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 0 0 100px 100px;
  flex-direction: column;
  position: relative;
}

.informasi {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 8rem 2rem;
  position: relative;
  background-image: url('@/assets/image/background-page.png');
}

.informasi .iklan {
  width: 20%;
  margin-left: 4rem;
}

.informasi .iklan h3 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #401A43;
}

.informasi .iklan h3 .purple {
  color: #6a2c70;
  font-weight: bold;
}

.informasi .iklan h3 .orange {
  color: #F08A5D;
  font-weight: bold;
}


.informasi .cta {
  width: 25%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: relative;
}

.informasi .cta h3 {
  width: 100%;
  font-size: 1.5rem;
  font-size: 24px;
  font-weight: 600;
  color: black;
}

.informasi .cta p {
  width: 80%;
  font-size: 1rem;
  font-size: 20px;
  font-weight: normal;
  color: black;
}

.informasi button {
  width: 200px;
  height: 70px;
  background-color: #6A2C70;
  border: none;
  border-radius: 50px;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
}

.informasi button a {
  text-decoration: none;
  color: white;
  font-family: poppins;
  font-size: 20px;
  font-weight: 600;
  margin-left: 30px;
  margin-top: 17px;
}

.informasi button img {
  width: 50px;
  height: 50px;
  margin-left: 30px;
  margin-top: 8px;
}

.informasi .img-wrapper {
  width: 750px;
  height: 750px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.informasi .img-wrapper img {
  width: 100%;
  height: 100%;
  border-radius: 0 0 100px 100px;
  animation: rotate-horizontal 10s infinite linear;
  transform-origin: center;
}


@keyframes rotate-horizontal {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}


.main-page .unisains-text h1 {
  font-size: 300px;
  font-weight: bold;
  color: #401A43;
}

.promotion {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 100px;
  padding-top: 100px;
  padding-bottom: 40px;
  background-color: white;
}

.promotion .ilustration {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.promotion .ilustration img {
  width: 100%;
  height: 100%;
}

.promotion .promotion-teks {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.promotion .promotion-teks h3 {
  width: 70%;
  font-size: 48px;
  font-weight: bold;
  color: black;
  margin-bottom: 25px;
  line-height: 1.3;
}

.promotion .promotion-teks p {
  width: 80%;
  font-size: 20px;
  font-weight: normal;
  color: black;
  line-height: 1.5;
  text-align: justify;
}

.features {
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 100px;
  box-sizing: border-box;
  padding-top: 100px;
  padding-bottom: 100px;
  background-color: #fff;
}

.features .special-features {
  width: 87%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  margin-left: 120px;
}

.features .special-features .suggested {
  width: 978px;
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #401A43;
  border-radius: 30px;
}

.features .special-features .suggested h3 {
  width: 84%;
  font-size: 48px;
  font-weight: bold;
  color: black;
  margin-bottom: 25px;
  line-height: 1.3;
  color: white;
}

.features .special-features .suggested p {
  width: 80%;
  font-size: 20px;
  font-weight: normal;
  color: black;
  line-height: 1.5;
  color: white;
  text-align: center;
}

.features .special-features .ar {
  width: 464px;
  height: 450px;
  justify-content: center;
  align-items: center;
  background-color: #F5F5F5;
  border-radius: 30px;
  padding-top: 40px;
  padding-left: 25px;
}

.features .special-features .ar .icon {
  width: 120px;
  height: 120px;
  border-radius: 10px;
  background-color: #F08A5D;
  margin-left: 25px;
}

.features .special-features .ar .icon img {
  width: 70px;
  height: 70px;
  margin-top: 25px;
  margin-left: 25px;
}

.features .special-features .ar h3 {
  width: 80%;
  font-size: 26px;
  font-weight: 600;
  color: #401A43;
  margin-top: 25px;
  margin-left: 25px;
}

.features .special-features .ar p {
  width: 80%;
  font-size: 20px;
  font-weight: normal;
  color: black;
  line-height: 1.5;
  margin-top: 25px;
  margin-left: 25px;
}

.features .other-features {
  width: 87%;
  height: 100%;
  margin-left: 120px;
  padding-top: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.features .other-features .wrapper-features {
  width: 464px;
  height: 450px;
  justify-content: center;
  align-items: center;
  background-color: #F5F5F5;
  border-radius: 30px;
  padding-top: 40px;
  padding-left: 25px;
}

.features .other-features .wrapper-features .icon {
  width: 120px;
  height: 120px;
  border-radius: 10px;
  background-color: #F08A5D;
  margin-left: 25px;
}

.features .other-features .wrapper-features .icon img {
  width: 70px;
  height: 70px;
  margin-top: 25px;
  margin-left: 25px;
}

.features .other-features .wrapper-features h3 {
  width: 80%;
  font-size: 26px;
  font-weight: 600;
  color: #401A43;
  margin-top: 25px;
  margin-left: 25px;
}

.features .other-features .wrapper-features p {
  width: 80%;
  font-size: 20px;
  font-weight: normal;
  color: black;
  line-height: 1.5;
  margin-top: 25px;
  margin-left: 25px;
}

.popular-course {
  width: 100%;
  height: 100%;
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #401A43;
}

.popular-course .text {
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 220px;
}

.popular-course .text h3 {
  width: 100%;
  font-size: 40px;
  font-weight: 600;
  color: white;
}

.popular-course .text p {
  width: 100%;
  font-size: 20px;
  font-weight: normal;
  color: white;
  line-height: 1.5;
  margin-top: 25px;
  text-align: justify;
}

.popular-course .two-course {
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: row;
  margin-left: 200px;
}

.practical {
  width: 100%;
  height: 100%;
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.practical .text {
  width: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 220px;
}

.practical .text h3 {
  width: 80%;
  font-size: 48px;
  font-weight: bold;
  color: black;
}

.practical .text p {
  width: 90%;
  font-size: 20px;
  font-weight: normal;
  color: black;
  line-height: 1.5;
  margin-top: 25px;
  margin-bottom: 20px;
  text-align: justify;
}

.practical .step {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
}

.practical .step .step-by-step {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.practical .step .step-by-step p {
  width: 100%;
  font-size: 24px;
  font-weight: 600;
  color: black;
  line-height: 1.5;
  margin-left: 25px;
}

.start-learn {
  width: 100%;
  height: 100%;
  padding-top: 50px;
  padding-bottom: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  background-image: url('@/assets/image/background-page.png');
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: 100% 50%;
}

.start-learn .wrapper {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #401A43;
  margin-left: 200px;
  border-radius: 50px;
}

.start-learn .wrapper .image {
  width: 600px;
  height: 530px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.start-learn .wrapper .image img {
  width: 600px;
  height: 530px;
}

.start-learn .wrapper .text {
  width: 58%;
  height: 530px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.start-learn .wrapper .text h3 {
  width: 100%;
  font-size: 48px;
  font-weight: bold;
  color: white;
}

.start-learn .wrapper .text p {
  width: 75%;
  font-size: 20px;
  font-weight: normal;
  color: white;
  line-height: 1.5;
  margin-top: 25px;
  margin-bottom: 20px;
  text-align: justify;
}

.start-learn .wrapper .text .button {
  width: 200px;
  height: 70px;
  border-radius: 50px;
  background-color: #F08A5D;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
}

.start-learn .wrapper .text .button button {
  width: 100%;
  height: 100%;
  font-size: 18px;
  font-weight: 600;
  color: white;
  text-align: center;
  font-family: poppins;
  background-color: transparent;
  border: none;
  display: flex;
  cursor: pointer;
}

.start-learn .wrapper .text .button button a {
  width: 100%;
  height: 50%;
  font-size: 20px;
  font-weight: 600;
  color: white;
  text-align: center;
  font-family: poppins;
  background-color: transparent;
  border: none;
  text-decoration: none;
  margin-top: 20px;
  margin-left: 10px;
}

.start-learn .wrapper .text .button button img {
  width: 50px;
  height: 50px;
  margin-top: 8px;
  margin-right: 10px;
}
</style>
