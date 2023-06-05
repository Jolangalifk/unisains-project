<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
  <main>
    <Navbar />
    <div class="about">
      <div class="text">
        <h1>Temukan <span class="orange"> Individu Terampil </span> Kamu.</h1>
      </div>
      <div class="div-purple">
        <img src="@/assets/image/ilustration-astronomi.png" alt="">
      </div>
      <div class="img-wrapper">
        <img src="@/assets/image/ilustration-unisains.png" alt="">
      </div>
    </div>
    <div class="unisains">
      <div class="text">
        <h3>Apa itu Unisains?</h3>
        <p>Unisains adalah sebuah website untuk media belajar atau kursus Sains yang di dukung teknologi Augmented Reality
          yang ditujukan kepada masyarakat umum.</p>
      </div>
      <img src="@/assets/image/ilustration4.png" alt="">
    </div>
    <div class="wrapper">
      <div class="wrapper-box">
        <div class="box-head">
          <h3>Kamu bisa belajar dan berkembang
            dengan nyaman</h3>
        </div>
        <div class="box">
          <h3>Dengan tim support</h3>
          <p>Dari profesional industri teknologi yang membagi pengalaman dan mengecek pengetahuanmu, hingga mentor yang
            siap memastikan keberhasilanmu.</p>
        </div>
      </div>
      <div class="wrapper-box">
        <div class="box">
          <h3>Platform pembelajaran interaktif</h3>
          <p>Dengan teknologi Augmented Reality (AR), kami membantu kamu mendapatkankan pembelajaran baru dengan nyaman.
          </p>
        </div>
        <div class="box">
          <h3>Dengan Program berorientasi Praktik</h3>
          <p>Di Unisains kamu belajar dengan memecahkan beberapa soal tes, soal diambil dari materi yang ada didalam
            kursus yang dipelajari.</p>
        </div>
      </div>
    </div>
    <div class="team">
      <h3>Tim kita</h3>
      <div class="team-person">
        <div class="person">
          <div class="image">
            <img src="@/assets/image/picture-example.png" alt="">
          </div>
          <h3>Darrell Ahmed Galen</h3>
          <h4>JABATAN</h4>
          <p>“Lorem ipsum dolor sit amet consectetur. Ullamcorper cursus dictum dolor auctor. Vitae eget pellentesque id
            nunc nisi gravida”.</p>
        </div>
        <div class="person">
          <div class="image">
            <img src="@/assets/image/picture-example.png" alt="">
          </div>
          <h3>Husnul Khotimah</h3>
          <h4>JABATAN</h4>
          <p>“Lorem ipsum dolor sit amet consectetur. Ullamcorper cursus dictum dolor auctor. Vitae eget pellentesque id
            nunc nisi gravida”.</p>
        </div>
        <div class="person">
          <div class="image">
            <img src="@/assets/image/picture-example.png" alt="">
          </div>
          <h3>Jolang Alif Khan</h3>
          <h4>JABATAN</h4>
          <p>“Unisains sangat cocok untuk membantu menambah pengetahuanmu tentang sains. ditambah dengan fitur menarik, tentu akan membuatmu semakin tertarik”.</p>
        </div>
      </div>
    </div>
    <div class="help-center">
      <div class="wrapper">
        <img src="@/assets/image/solution-ilustration.png" alt="">
        <div class="text">
          <h3>Kami hadir untuk membantu</h3>
          <p>Tapi langkah pertama bergantung padamu.Ada pertanyaan atau masih ragu? <span class="email">
              universeteam2023@gmail.com </span></p>
        </div>
      </div>
    </div>
    <Footer />
  </main>
</template>

<style scoped>
.about {
  width: 100%;
  height: 980px;
  display: flex;
  align-items: center;
}

.about .text {
  margin-left: 200px;
  line-height: 1.3;
  width: 30%;
  height: 60%;
}

.about h1 {
  width: 100%;
  height: 100%;
  font-size: 110px;
  font-weight: bold;
  color: black;
}

.about h1 .orange {
  color: #F08A5D;
  font-weight: bold;
}

.div-purple {
  width: 40%;
  height: 100%;
  background-color: #401A43;
  margin-left: 400px;
}

.div-purple img {
  margin-top: 15%;
  margin-left: 45%;
}

.about .img-wrapper {
  width: 750px;
  height: 750px;
  position: absolute;
  top: 49.7%;
  left: 60%;
  transform: translate(-50%, -50%);
}

.unisains {
  width: 100%;
  height: 1080px;
  align-items: center;
  justify-content: center;
}

.unisains .text {
  width: 25%;
  margin-left: 36%;
  padding-top: 100px
}

.unisains .text h3 {
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  color: black;
}

.unisains .text p {
  font-size: 20px;
  text-align: center;
  color: black;
}

.unisains img {
  margin-left: 20%;
  margin-top: 50px;
}

.wrapper {
  width: 100%;
  height: 980px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.wrapper .wrapper-box {
  width: 78%;
  height: 5 0%;
  display: flex;
  flex-direction: row;
}

.wrapper .wrapper-box .box {
  width: 700px;
  height: 350px;
  display: flex;
  flex-direction: column;
  margin: 20px;
  background-color: #401A43;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.box h3 {
  font-size: 48px;
  font-weight: bold;
  color: white;
  margin-bottom: 25px;
  line-height: 1.3;
}

.box p {
  width: 70%;
  font-size: 20px;
  color: white;
}

.wrapper .wrapper-box .box-head {
  width: 700px;
  height: 350px;
  display: flex;
  flex-direction: column;
  margin: 20px;
  background-color: #F5F5F5;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.box-head h3 {
  font-size: 48px;
  font-weight: bold;
  color: black;
}

.team h3 {
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  margin-top: 50px;
  color: black;
}

.team-person {
  width: 100%;
  height: 980px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.person {
  width: 450px;
  height: 800px;
  justify-content: center;
  align-items: center;
  margin: 20px;
  background-color: #F08A5D;
  border-radius: 30px;
}

.image {
  width: 200px;
  height: 200px;
  margin-left: 130px;
  margin-bottom: 50px;
  margin-top: 50px;
}

.person h3 {
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 0;
}

.person h4 {
  font-size: 20px;
  color: white;
  text-align: center;
  margin-bottom: 60px;
}

.person p {
  width: 70%;
  font-size: 26px;
  font-weight: 600;
  color: white;
  margin-left: 70px;
  text-align: center;
  font-family: josefin sans;
}

.help-center {
  width: 100%;
  height: 980px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.help-center .wrapper {
  width: 1400px;
  height: 600px;
  border-radius: 30px;
  background-color: #F5F5F5;
  display: flex;
  flex-direction: row;
}

.help-center img {
  margin-left: 50px;
}

.help-center .text {
  margin-left: 50px;
  margin-bottom: 200px;
}

.help-center .text h3 {
  width: 90%;
  font-size: 48px;
  font-weight: bold;
  color: black;
}

.help-center .text p {
  width: 90%;
  font-size: 24px;
  margin-top: 30px;
}

.help-center .text .email {
  font-size: 24px;
  font-weight: bold;
  color: #401A43;
}
</style>
