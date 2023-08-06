<template>
    <main>
        <Navbar />
        <div class="wishlist">
            <WishlistCourse />
        </div>
        <Footer />
    </main>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import WishlistCourse from '../components/WishlistCourse.vue';
</script>

<style scoped>

.wishlist {
    width: 100%;
    height: 100%;
}

</style>