<template>
    <div>
        <main>
            <Navbar />
            <div class="receipt">
                <h1>Detail Transaksi</h1>
                <div class="receipt-detail">
                    <HistoryDetail :snapToken="snapToken" />
                </div>
            </div>
            <Footer />
        </main>
    </div>
</template>

<script setup>
import HistoryDetail from '../components/HistoryDetail.vue';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

const snapToken = localStorage.getItem('snapToken');
</script>

<style scoped>
.receipt {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 80px;
}

.receipt h1 {
    width: 58%;
    height: 100%;
    font-size: 42px;
    font-weight: bold;
    color: black;
    margin-bottom: 50px;
}

.receipt-detail {
    width: 58%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #C1C1C1;
    border-radius: 20px;
    padding: 20px;
    margin-bottom: 50px;
}
</style>