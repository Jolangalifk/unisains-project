<template>
    <div class="course-purchase">
        <div v-if="transaction">
            <div class="information">
                <h1>Tanggal : <span class="tanggal">{{ transaction.date }}</span></h1>
                <h1>Status : <span class="status">{{ transaction.status }}</span></h1>
                <h1>Dijual Ke : <span class="penerima">{{ transaction.course.title_course }}</span></h1>
            </div>
            <div class="menu">
                <div class="text-kursus">
                    Kursus
                </div>
                <div class="text-menu">
                    <p>Tanggal</p>
                    <p>Status</p>
                    <p>Harga</p>
                </div>
            </div>
            <div class="list">
                <div class="kursus">
                    <p>{{ transaction.course.title_course }}</p>
                </div>
                <div class="text">
                    <p>{{ transaction.date }}</p>
                    <p>{{ transaction.status }}</p>
                    <p>Rp {{ transaction.total_price }}</p>
                </div>
            </div>
            <div class="button">
                <button class="bayar-nanti">Bayar Nanti</button>
                <button>Lanjutkan</button>
            </div>
        </div>
        <div v-else>
            Loading...
        </div>
    </div>
</template>
  
<script>
import axios from "axios";

// Fungsi untuk mengambil token dari local storage
const getUserToken = () => {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : '';
};

export default {
    data() {
        return {
            transaction: null,
        };
    },
    async created() {
        try {
            // Mendapatkan ID dari route params
            const orderId = this.$route.params.id;

            const userToken = getUserToken(); // Ganti dengan token yang valid

            // Mengambil data dari API menggunakan axios dan menyertakan token otorisasi
            const response = await axios.get(`https://admin.unisains.com/api/v1/transaction/show/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            this.transaction = response.data.data.transaction;
        } catch (error) {
            console.error(error);
            this.transaction = null;
        }
    },
};
</script>

  

<style scoped>
.course-purchase {
    width: 1000px;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.course-purchase .information {
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    margin-top: 20px;
}

.course-purchase .information h1 {
    font-size: 26px;
    font-weight: bold;
    color: #000000;
    margin-bottom: 20px;
}

.course-purchase .menu {
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    font-size: 20px;
    margin-top: 30px;
}

.course-purchase .menu .text-kursus {
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: black;
    justify-content: center;
    font-weight: 600;
    font-size: 20px;
}

.course-purchase .menu .text-menu {
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 150px;
    font-size: 20px;
    color: black;
}

.course-purchase .menu .text-menu p {
    font-weight: 600;
}

.course-purchase .list {
    width: 100%;
    height: 130px;
    display: flex;
    flex-direction: row;
    font-size: 18px;
    border-radius: 15px;
    margin-bottom: 20px;
    background-color: #6A2C70;
    color: white;
}

.course-purchase .list .kursus {
    width: 67%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: black;
    align-items: center;
    justify-content: center;
    color: white;
}

.course-purchase .list .kursus p {
    font-size: 20px;
    font-weight: 600;
}

.course-purchase .list .text {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 40px;
    gap: 105px;
}

.course-purchase .list .text p {
    font-size: 20px;
}

.course-purchase .button {
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 30px;
}

.course-purchase .button button {
    width: 490px;
    height: 70px;
    border: 1px solid #6A2C70;
    border-radius: 10px;
    background-color: #6A2C70;
    color: white;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;

    font-family: poppins;
}

.course-purchase .button .bayar-nanti {
    background-color: white;
    color: #6A2C70;
}
</style>