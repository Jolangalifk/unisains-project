<template>
    <div class="container-question">
        <div class="quiz-question">
            <p>1. Berapa waktu yang diperlukan oleh Merkurius untuk mengelilingi Matahari?</p>
        </div>
        <div class="input-container">
            <div class="multiple-choice">
                <button class="btn btn-primary">A. <span>88 hari</span></button>
                <button class="btn btn-primary">B. <span>225 hari</span></button>
                <button class="btn btn-primary">C. <span>365 hari</span></button>
                <button class="btn btn-primary">D. <span>687 hari</span></button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container-question {
    width: 100%;
    height: 570px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
}

.quiz-question {
    width: 1330px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0 20px 0;
}

.quiz-question p {
    width: 100%;
    height: fit-content;
    font-size: 24px;
    font-weight: 600;
    color: #000000;
}

.input-container {
    width: 1380px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.multiple-choice {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 20px;
}

.multiple-choice button {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: start;
    align-content: start;
    font-size: 20px;
    font-weight: 600;
    color: #000000;
    background-color: #FEFAE0;
    border: 1px solid #FEFAE0;
    border-radius: 10px;
    padding-left: 70px;
    margin-bottom: 20px;
}

.multiple-choice button span {
    margin-left: 20px;
}

.multiple-choice button:hover {
    background-color: #6A2C70;
    color: #FFFFFF;
}

.multiple-choice button:active {
    background-color: #6A2C70;
    color: #FFFFFF;
}

.multiple-choice button:focus {
    background-color: #6A2C70;
    color: #FFFFFF;
}
</style>