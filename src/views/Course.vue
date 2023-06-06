<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import CardMain from '../components/CardMain.vue'
import Modal from '../components/Modal.vue'

</script>

<template>
    <main>
        <Navbar />
        <div class="main-page">
            <h1><span class="orange"> Belajar </span> Menjadi lebih mudah dengan <span class="orange"> Unisains. </span>
            </h1>
        </div>
        <div class="course-category">
            <h3>Cari kursus dengan kategori</h3>
            <p>cari kursus yang ingin kamu pelajari dengan memilih kategori dibawah ini ya!</p>
            <div class="wrapper-box">
                <div class="course">
                    <img src="@/assets/image/astronomi-category.png" alt="">
                    <h3>Astronomi</h3>
                </div>
                <div class="course">
                    <img src="@/assets/image/biologi-category.png" alt="">
                    <h3>Biologi</h3>
                </div>
            </div>
            <div class="wrapper-box">
                <div class="course">
                    <img src="@/assets/image/kimia-category.png" alt="">
                    <h3>Kimia</h3>
                </div>
                <div class="course">
                    <img src="@/assets/image/fisika-category.png" alt="">
                    <h3>Fisika</h3>
                </div>
            </div>
        </div>
        <div class="astronomi">
            <div class="text">
                <h3>Astronomi</h3>
                <p>Astronomi adalah ilmu yang mempelajari benda-benda langit seperti bintang, komet, planet, dan galaksi.
                    Astronomi berasal dari kata Yunani "astron" dan "nomos" yang berarti "bintang" dan "hukum". Ilmu ini
                    berkaitan dengan pembentukan dan perkembangan alam semesta, gerak benda-benda langit, serta evolusi
                    fisika
                    dan kimia benda langit. Sejak abad ke-20, bidang astronomi dibagi menjadi dua cabang: pengamatan dan
                    teoritis.
                    Astronomi pengamatan menekankan pada pengumpulan dan analisis data menggunakan prinsip-prinsip dasar
                    fisika.
                    Sedangkan astronomi teoritis berfokus pada analisa dan pengembangan model komputer untuk menjelaskan
                    obyek
                    dan fenomena astronomi.</p>
            </div>
            <div class="fun-fact">
                <div class="fact">
                    <div class="fact-p">
                        <p>FAKTA MENARIK</p>
                    </div>
                </div>
                <img src="@/assets/icon/bumi.svg" alt="">
                <h4>Satu Juta Bumi Bisa Terpasang di Dalam Matahari</h4>
                <p>Tahukah kalian, Matahari memiliki luas yang sangat besar? Akibatnya luasnya ini diperkirakan matahari
                    dapat menampung sebanyak 1,3 juta bumi dengan posisi bumi tergencet. Namun, jika bumi tetap
                    mempertahankan bentuk bulatnya maka matahari dapat menampung sebanyak 960.000 bumi</p>
            </div>
        </div>
        <div class="biologi">
            <div class="fun-fact">
                <div class="fact">
                    <div class="fact-p">
                        <p>FAKTA MENARIK</p>
                    </div>
                </div>
                <img src="@/assets/icon/femur.svg" alt="">
                <h4>Tulang Paha merupakan tulang terbesar yang ada di tubuh manusia</h4>
                <p>Tulang paha, atau femur, adalah tulang terbesar di tubuh manusia. Tulang ini merentang sepanjang dari
                    pinggul hingga lutut. Tulang paha juga sangat kuat dan tidak mudah patah. Fungsinya membantu menjaga
                    postur dengan mendukung kerangka</p>
            </div>
            <div class="text">
                <h3>Biologi</h3>
                <p>Biologi atau ilmu hayat adalah kajian tentang kehidupan, dan organisme hidup, termasuk struktur, fungsi,
                    pertumbuhan, evolusi, persebaran, dan taksonominya. Ilmu biologi modern membahas pengetahuan yang sangat
                    luas, eklektik, serta terdiri dari berbagai macam cabang dan subdisiplin. Secara umum, seluruh cabang
                    keilmuan biologi disatukan oleh konsep dasar yang mengatur semua penelitian biologi, yaitu konsep
                    tentang sel, gen, dan evolusi. Sel diakui sebagai satuan dasar kehidupan, gen diakui sebagai satuan
                    dasar pewarisan, dan evolusi diasumsikan sebagai mekanisme yang mendorong terciptanya spesies baru.
                    Selain itu, kelangsungan hidup dari makhluk hidup diyakini terjadi karena adanya perilaku konsumsi,
                    perubahan energi serta dengan regulasi yang menjaga kestabiilan dan vitaltas keadaan dalam tubuh.</p>
            </div>
        </div>
        <div class="list-course">
            <div class="text">
                <h3>Perluas kemampuan anda dengan astronomi</h3>
                <p>Ikuti salah atu kursus Astronomi dan pelajari apa saja yang ada didalamnya. Anda akan belajar mulai dari
                    mempelajari materi hingga tantangan atau quizz yang akan diberikan ketika selesai mempelajarinya. Pilih
                    dari berbagai kursus yang menarik.</p>
                <button class="explore">Jelajahi Astronomi</button>
            </div>
            <div class="card-main">
                <div class="card-scroll">
                    <CardMain />
                    <CardMain />
                    <CardMain />
                    <CardMain />
                    <CardMain />
                    <CardMain />
                    <CardMain />
                    <CardMain />
                </div>
            </div>
        </div>
        <div class="list-course">
            <div class="text">
                <h3>Perluas kemampuan anda dengan biologi</h3>
                <p>Ikuti salah atu kursus Biologi dan pelajari apa saja yang ada didalamnya. Anda akan belajar mulai dari
                    mempelajari materi hingga tantangan atau quizz yang akan diberikan ketika selesai mempelajarinya. Pilih
                    dari berbagai kursus yang menarik.</p>
                <!-- <button class="explore">Jelajahi Biologi</button> -->
            </div>
            <div class="card-main">
                <div class="card-scroll">
                    <CardMain />
                    <CardMain />
                    <CardMain />
                    <CardMain />
                    <CardMain />
                    <CardMain />
                    <CardMain />
                    <CardMain />
                </div>
            </div>
        </div>
        <Footer />
    </main>
</template>

<style scoped>
.main-page {
    width: 100%;
    height: 980px;
    background-image: url('@/assets/image/course-bg.png');
}

.main-page h1 {
    width: 50%;
    font-size: 110px;
    font-weight: bold;
    color: black;
    padding-top: 200px;
    margin-left: 200px;
    line-height: 1.3;
}

.main-page h1 .orange {
    color: #F08A5D;
    font-weight: bold;
}

.course-category {
    width: 100%;
    height: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 100px;
}

.course-category h3 {
    font-size: 54px;
    font-weight: bold;
    color: black;
}

.course-category p {
    font-size: 20px;
    font-weight: normal;
    color: black;
}

.wrapper-box {
    width: 83%;
    height: 360px;
    display: flex;
    justify-content: space-evenly;
    padding-top: 50px;
}

.course {
    width: 700px;
    height: 300px;
    background-color: #F08A5D;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

.course img {
    width: 100%;
    height: 100%;
    border-radius: 30px;
    transition: transform 0.5s ease-in-out;
}

.course img:hover {
    transform: scale(1.1);
}


.course h3 {
    font-size: 36px;
    font-weight: bold;
    color: #F08A5D;
    position: absolute;
}

.astronomi {
    width: 100%;
    height: 1000px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 100px;
}

.astronomi .text {
    width: 55%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 100px;
}

.astronomi .text h3 {
    width: 300px;
    margin-left: 200px;
    font-size: 54px;
    font-weight: bold;
    color: black;
}

.astronomi .text p {
    font-size: 20px;
    font-weight: normal;
    color: black;
    text-align: justify;
    padding: 0 200px;
}

.astronomi .fun-fact {
    width: 600px;
    height: 950px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 100px;
    background-color: #401A43;
    border-radius: 30px;
}

.astronomi .fun-fact .fact {
    width: 60%;
    height: 60px;
    background-color: #F08A5D;
    border-radius: 0 10px 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 240px;
    margin-bottom: 50px;
}

.astronomi .fun-fact .fact p {
    font-size: 20px;
    font-weight: 600;
    color: white;
}

.astronomi .fun-fact img {
    width: 400px;
    height: 400px;
}

.astronomi .fun-fact h4 {
    width: 70%;
    font-size: 26px;
    font-weight: bold;
    color: white;
    padding-top: 50px;
    text-align: center;
    margin-bottom: 20px;
}

.astronomi .fun-fact p {
    font-size: 16px;
    font-weight: normal;
    color: white;
    text-align: center;
    padding: 0 100px;
}

.biologi {
    width: 100%;
    height: 1000px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 100px;
}

.biologi .text {
    width: 55%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 100px;
}

.biologi .text h3 {
    width: 300px;
    margin-left: 200px;
    font-size: 54px;
    font-weight: bold;
    color: black;
}

.biologi .text p {
    font-size: 20px;
    font-weight: normal;
    color: black;
    text-align: justify;
    padding: 0 200px;
}

.biologi .fun-fact {
    width: 600px;
    height: 950px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 100px;
    background-color: #401A43;
    border-radius: 30px;
    margin-left: 200px;
}

.biologi .fun-fact .fact {
    width: 60%;
    height: 60px;
    background-color: #F08A5D;
    border-radius: 0 10px 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 240px;
    margin-bottom: 50px;
}

.biologi .fun-fact .fact p {
    font-size: 20px;
    font-weight: 600;
    color: white;
}

.biologi .fun-fact img {
    width: 400px;
    height: 400px;
}

.biologi .fun-fact h4 {
    width: 70%;
    font-size: 26px;
    font-weight: bold;
    color: white;
    padding-top: 50px;
    text-align: center;
    margin-bottom: 20px;
}

.biologi .fun-fact p {
    font-size: 16px;
    font-weight: normal;
    color: white;
    text-align: center;
    padding: 0 100px;
}

.list-course {
    width: 100%;
    height: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 100px;
}

.list-course h3 {
    margin-left: 200px;
    font-size: 54px;
    font-weight: bold;
    color: black;
}

.list-course p {
    width: 80%;
    font-size: 20px;
    font-weight: normal;
    color: black;
    padding: 0 200px;
    margin-bottom: 50px;
    text-align: justify;
}

.explore {
    width: 300px;
    height: 70px;
    border-radius: 10px;
    margin-left: 200px;
    font-size: 20px;
    font-weight: bold;
    font-family: poppins;
    align-items: center;
    justify-content: center;
    border: none;
    box-shadow: inset 0 0 0 0 #6A2C70;
    color: #6A2C70;
    padding: 0 .25rem;
    transition: color .3s ease-in-out, box-shadow .3s ease-in-out;
}

.explore:hover {
    box-shadow: inset 300px 0 0 0 #6A2C70;
    color: white;
}

.card-main {
    width: 1560px;
    height: 500px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 50px;
    overflow-x: scroll;
    white-space: nowrap;
}

.card-main::-webkit-scrollbar {
    display: none;
}

.card-scroll {
    padding: 10px;
    display: flex;
    flex-direction: row;
}
</style>