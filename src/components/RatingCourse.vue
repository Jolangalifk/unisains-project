<script>
</script>

<template>
    <div class="review">
        <div class="user">
            <div class="image">
                <img src="@/assets/image/picture-example.png" alt="">
            </div>
            <div class="name">
                <h3>Aisyah Haziem</h3>
                <img src="@/assets/icon/rating.svg" alt="">
            </div>
            <div class="dot">
                <img src="@/assets/icon/dot.svg" alt="">
            </div>
        </div>
        <p>Lorem ipsum itu kenapa dan dijadikan sesuatu hal yan tidak senonoh sehingga menjadi diluar nalar</p>
    </div>
</template>

<style scoped>

.review {
    margin-left: 30px;
    width: 475px;
    height: 260px;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    border: 1px solid #c1c1c1;
    border-radius: 20px;
}

.review p {
    width: 92%;
    font-size: 18px;
    color: #000000;
    font-weight: normal;
    margin-top: 20px;
    margin-left: 20px;
}

.review .user {
    width: 92%;
    height: 70px;
    display: flex;
    flex-direction: row;
    margin: 20px 0 0 20px;
}

.review .user .image {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: #c4c4c4;
}

.review .user .image img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
}

.review .user .name {
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: column;
    margin-left: 20px;
}

.review .user .name h3 {
    font-size: 20px;
    font-weight: 600;
    color: #000000;
}

.review .user .name img {
    width: 100px;
    height: 20px;
    margin-top: 5px;
}

.review .user .dot {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.review .user .dot img {
    width: 35px;
    height: 35px;
}

</style>