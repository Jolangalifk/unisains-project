<script>
</script>

<template>
    <div class="footer">
        <div class="information">
            <img src="@/assets/icon/unisains-logo.svg" alt="">
            <p>Percepat proses peningkatan keterampilan dengan menemukan kursus yang cocok dengan gaya belajar anda.</p>
            <h3>© UniTeam 2023 | All rights reserved.</h3>
        </div>
        <div class="contact">
            <h3>KONTAK</h3>
            <p>Universteam2023@gmail.com</p>
            <h3>SOSIAL MEDIA</h3>
            <div class="social-media-logo">
                <button>
                    <img src="@/assets/icon/instagram-logo.svg" alt="">
                </button>
                <button>
                    <img src="@/assets/icon/youtube-logo.svg" alt="">
                </button>
                <button>
                    <img src="@/assets/icon/email-logo.svg" alt="">
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.footer {
    width: 100%;
    height: 600px;
    display: flex;
    background-color: #401A43;
    padding: 2rem 5rem;
}

.information {
    margin-left: 200px;
}

.information img {
    margin-top: 50px;
}

.information p {
    width: 50%;
    font-size: 18px;
    color: white;
    margin-top: 50px;
    font-weight: normal;
}

.information h3 {
    color: white;
    margin-top: 130px;
    font-weight: 600;
}

.contact {
    width: 50%;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
}

.contact h3 {
    color: white;
    font-weight: 600;
    margin-top: 50px;
}

.contact p {
    color: white;
    font-size: 18px;
    margin-top: 15px;
    font-weight: normal;
}

.social-media-logo {
    width: 30%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
}

.social-media-logo button {
    background-color: transparent;
    border: none;
}

.social-media-logo button img {
    width: 50px;
    height: 50px;
}
</style>