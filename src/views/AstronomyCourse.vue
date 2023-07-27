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
import CardBiologi from '../components/CardBiologi.vue'
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