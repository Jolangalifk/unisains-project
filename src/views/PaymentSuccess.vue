<template>
    <div class="payment-success">
        <img src="@/assets/icon/payment-success.svg" alt="">
        <h1>Pembayaran Berhasil</h1>
        <div class="payment-success-detail">
            <p>Terima kasih telah melakukan pembayaran. Silahkan cek email anda untuk mendapatkan informasi lebih lanjut.</p>
        </div>
        <div class="button">
            <button><router-link to="/">Kembali ke beranda</router-link></button>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>

.payment-success {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.payment-success h1 {
    font-size: 42px;
    font-weight: bold;
    color: black;
    margin-top: 30px;
}

.payment-success-detail {
    width: 35%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.payment-success-detail p {
    font-size: 20px;
    color: black;
    text-align: center;
}

.button {
    width: 40%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.button button {
    width: 100%;
    height: 70px;
    background-color: #F08A5D;
    border-radius: 10px;
    border: none;
    font-size: 20px;
    font-weight: 600;
    color: black;
}

.button button a {
    color: white;
    font-weight: bold;
    font-family: poppins;
    text-decoration: none;
}

</style>