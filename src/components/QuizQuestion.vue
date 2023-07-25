<template>
    <div class="container-question">
        <div class="quiz-question">
            <p>1. Berapa waktu yang diperlukan oleh Merkurius untuk mengelilingi Matahari?</p>
        </div>
        <div class="input-container">
            <textarea name="essayInput" id="" cols="30" rows="10" placeholder="Ketik jawabanmu disini"></textarea>
        </div>
    </div>
</template>

<style scoped>
.container-question {
    width: 100%;
    height: 410px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 60px;
    border-radius: 20px;
    background-color: #6A2C70;
}

.quiz-question {
    width: 1330px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0 20px 0;
}

.quiz-question p {
    font-size: 24px;
    font-weight: 600;
    color: #fff;
}

.input-container {
    width: 1380px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.input-container textarea {
    width: 1330px;
    height: 300px;
    border: 1px solid #c1c1c1;
    border-radius: 20px;
    padding: 40px;
    font-size: 18px;
    font-weight: 600;
    color: #000000;
    resize: none;
}

.input-container textarea::placeholder {
    font-size: 18px;
    font-weight: 600;
    color: #000;
}

.input-container textarea:focus {
    outline: none;
}
</style>