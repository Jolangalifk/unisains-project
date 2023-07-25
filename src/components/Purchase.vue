<template>
    <div class="course-purchase">
        <div class="information">
            <h1>Tanggal : <span class="tanggal">17 April 2023</span></h1>
            <h1>Kode Pesanan : <span class="kode">PD-CC-6847716F5933696A6C363243</span></h1>
            <h1>Status : <span class="status">Berhasil</span></h1>
            <h1>Dijual Ke : <span class="penerima">Stefano Llipaly</span></h1>
        </div>
        <div class="menu">
            <div class="text-kursus">
                Kursus
            </div>
            <div class="text-menu">
                <p>Tanggal</p>
                <p>Status</p>
                <p>Harga</p>
                <p>Pembayaran</p>
            </div>
        </div>
        <div class="list">
            <div class="kursus">
                <p>Anatomi Tubuh Manusia : Jantung</p>
            </div>
            <div class="text">
                <!-- <div class="tanggal-p">
                    <p class="tanggal">17-01-1999</p>
                </div> -->
                <p>17-01-1999</p>
                <p>Berhasil</p>
                <p>Rp 200.000</p>
                <p>BCA</p>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
.course-purchase {
    width: 1000px;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.course-purchase .information {
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    margin-top: 20px;
}

.course-purchase .information h1 {
    font-size: 26px;
    font-weight: 600;
    color: #000000;
    margin-bottom: 20px;
}

.course-purchase .menu {
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    font-size: 20px;
    margin-top: 30px;
}

.course-purchase .menu .text-kursus {
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: #F08A5D;
    justify-content: center;
    font-weight: 600;
    font-size: 20px;
}

.course-purchase .menu .text-menu {
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 60px;
    font-size: 20px;
    color: #F08A5D;
}

.course-purchase .menu .text-menu p {
    font-weight: 600;
}

.course-purchase .list {
    width: 100%;
    height: 130px;
    display: flex;
    flex-direction: row;
    font-size: 18px;
    border: 1px solid #C1C1C1;
    border-radius: 20px;
    margin-bottom: 20px;
}

.course-purchase .list .kursus {
    width: 67%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: black;
    align-items: center;
    justify-content: center;
}

.course-purchase .list .kursus p {
    font-size: 20px;
    font-weight: 600;
}

.course-purchase .list .text {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 40px;
    gap: 45px;
}

.course-purchase .list .text p {
    font-size: 20px;
}
</style>