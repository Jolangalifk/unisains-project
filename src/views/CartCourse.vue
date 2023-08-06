<template>
    <main>
        <Navbar />
        <div class="card">
        </div>
        <Footer />
    </main>
</template>
  
<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>
  
<style scoped>
.card {
    display: flex;
    justify-content: row;
    margin-top: 80px;
}
</style>
  