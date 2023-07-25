<template>
    <div class="list-history">
        <div class="list">
            <div class="kursus">
                <p>Anatomi Tubuh Manusia : Jantung</p>
            </div>
            <div class="text">
                <div class="tanggal-p">
                <p class="tanggal">17-01-1999</p>
            </div>
                <p>Berhasil</p>
                <p>Rp 200.000</p>
                <p>BCA</p>
            </div>
            <div class="button-detail">
                <button>Detail</button>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.list-history {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
}

.list-history .list {
    width: 100%;
    height: 130px;
    display: flex;
    flex-direction: row;
    font-size: 20px;
    border: 1px solid #C1C1C1;
    border-radius: 20px;
}

.list-history .list .kursus {
    width: 37%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: black;
    align-items: center;
    justify-content: center;
}

.list-history .list .kursus p {
    font-size: 20px;
    font-weight: 600;
}

.list-history .list .text {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.list-history .list .text p {
    width: 200px;
    text-align: center;
    color: black;
}

.list-history .list .button-detail {
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.list-history .list .button-detail button {
    width: 150px;
    height: 50px;
    background-color: #B83B5E;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    font-family: poppins;
}
</style>