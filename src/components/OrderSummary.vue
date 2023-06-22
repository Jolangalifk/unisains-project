<script>
</script>

<template>
    <div class="order-summary">
        <div class="summary">
            <div class="text">
                <h3>Ringkasan Pesanan</h3>
                <p>Anatomi Tubuh Manusia : Jantung</p>
                <p>Anatomi Tubuh Manusia : Jantung</p>
            </div>
            <hr>
            <div class="price">
                <h3>Total</h3>
                <h1>Rp 500,000</h1>
                <button class="btn btn-primary">Bayar Sekarang</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.order-summary {
    width: 770px;
    display: flex;
    justify-content: center;
}

.summary {
    width: 660px;
    height: 460px;
    border-radius: 20px;
    border: 1px solid #c1c1c1;
}

.summary h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
}

.summary p {
    font-size: 18px;
    margin-bottom: 10px;
    color: #c1c1c1;
}

.summary h1 {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 10px;
}

.summary hr {
    width: 100%;
}

.summary button {
    display: block;
    width: 100%;
    height: 80px;
    padding: 10px 16px;
    margin-top: 20px;
    background-color: #F08A5D;
    border: none;
    color: white;
    font-size: 20px;
    font-weight: bold;
    font-family: poppins;
    text-align: center;
    text-decoration: none;
    border-radius: 20px;
    cursor: pointer;
}

.summary button:hover {
    background-color: #c0392b;
}

.text {
    padding: 30px;
}

.price {
    padding: 30px;
}

.price h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
}
</style>