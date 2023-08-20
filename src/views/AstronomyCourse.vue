<template>
    <main>
        <Navbar />
        <div class="astronomi">
            <h1>Astronomi</h1>
            <CardMain />
        </div>
        <Footer />
    </main>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import CardMain from '../components/CardMain.vue'
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

.astronomi {
    padding: 100px 200px 100px 200px;
}

.astronomi h1 {
    font-size: 42px;
    font-weight: bold;
    color: #000000;
    margin-bottom: 50px;
}

</style>