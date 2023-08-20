<template>
    <main>
        <Navbar />
        <div class="anatomi">
            <h1>Anatomi</h1>
            <CardBiologi />
        </div>
        <Footer />
    </main>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import CardBiologi from '../components/CardBiologi.vue'
import { onMounted } from 'vue';

const scrollToTopIfNeeded = () => {
  const queryParams = new URLSearchParams(window.location.search);
  if (queryParams.has('scrollToTop')) {
    // Pindahkan tampilan ke posisi atas halaman
    window.scrollTo(0, 0);
  }
};

onMounted(() => {
    scrollToTopIfNeeded();
});
</script>

<style scoped>

.anatomi {
    padding: 100px 200px 100px 200px;
}

.anatomi h1 {
    font-size: 42px;
    font-weight: bold;
    color: #000000;
    margin-bottom: 50px;
}

</style>