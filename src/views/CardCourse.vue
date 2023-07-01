<template>
    <main>
        <Navbar />
        <div class="card">
            <ListCourse />
            <OrderSummary />
        </div>
        <Footer />
    </main>
</template>
  
<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import ListCourse from '@/components/ListCourse.vue'
import OrderSummary from '@/components/OrderSummary.vue'
</script>
  
<style scoped>
.card {
    display: flex;
    justify-content: row;
    margin-top: 80px;
}
</style>
  