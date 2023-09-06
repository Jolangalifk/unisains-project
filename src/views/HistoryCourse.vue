<template>
    <main>
        <Navbar />
        <div class="history-transaction">
            <div class="text">
                <h1>Riwayat transaksi</h1>
                <div class="button">
                    <div class="text-kursus">
                        Kursus
                    </div>
                    <div class="text-menu">
                        <p>Tanggal</p>
                        <p>Status</p>
                        <p>Harga</p>
                        <p>Kode</p>
                    </div>
                </div>
                <div class="list">
                    <History/>
                </div>
            </div>
        </div>
        <Footer />
    </main>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import History from '@/components/History.vue'
</script>
    
<style scoped>
.history-transaction {
    width: 90%;
    height: auto;
}

.history-transaction .text {
    margin-left: 200px;
    padding-top: 50px;
}

.history-transaction .text h1 {
    width: 100%;
    height: 100%;
    font-size: 42px;
    font-weight: bold;
    color: black;
    margin-bottom: 50px;
}

.button {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    font-size: 24px;
    color: #F08A5D;
}

.text-kursus {
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    font-weight: 600;
}

.text-menu {
    height: 100%;
    margin-right: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 110px;
}

.text-menu p {
    font-weight: 600;
}

.list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    margin-bottom: 50px;
    gap: 20px;
}

.list-else {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px; 
    background-color: white; 
    border: 1px solid #ccc; 
    margin-top: 50px;
    border-radius: 10px; 
    font-size: 18px; 
    font-weight: 600;
    color: black; 
}
</style>