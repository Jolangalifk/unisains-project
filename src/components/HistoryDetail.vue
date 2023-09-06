<template>
    <div class="course-purchase">
        <div v-if="transaction">
            <!-- Tampilkan data transaksi yang relevan di sini -->
            <div class="information">
                <h1>Tanggal : <span class="tanggal">{{ transaction.date }}</span></h1>
                <h1>Status : <span class="status">{{ transaction.status }}</span></h1>
                <h1>Kode Pesanan : <span class="kode-pesanan">{{ transaction.code_transaction }}</span></h1>
                <h1>Dijual Ke : <span class="penerima">{{ transaction.user.username }}</span></h1>
            </div>
            <div class="menu">
                <div class="text-kursus">
                    <p>Kursus</p>
                </div>
                <div class="text-menu">
                    <p>Tanggal</p>
                    <p>Batas pembayaran</p>
                    <p>Harga</p>
                </div>
            </div>
            <div class="list">
                <div class="kursus">
                    <p>{{ transaction.course.title_course }}</p>
                </div>
                <div class="text">
                    <p>{{ transaction.date }}</p>
                    <p>{{ transaction.expired_date }}</p>
                    <p>Rp {{ formattedHarga(transaction.total_price) }}</p>
                </div>
            </div>
            <div v-if="transaction.status === 'Selesai'">
                <router-link class="button" to="/history-course">
                    <button class="close"><a href="">Tutup</a></button>
                </router-link>
            </div>
            <div v-else-if="transaction.status === 'Belum Dibayar'">
                <router-link class="button" to="/history-course">
                    <button class="close"><a href="">Tutup</a></button>
                    <button class="lanjutkan" @click="payWithMidtrans">Lanjutkan</button>
                </router-link>
            </div>
        </div>
        <div v-else>
            Loading...
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';

const selectedCourse = ref(null);
const transaction = ref(null);

export default {
    data() {
        return {
            transaction,
            snapToken: null,
        };
    },
    async created() {
        this.getData();
    },
    mounted() {
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", "SB-Mid-client-bEgJRNJrEQtjBn4p");
        document.head.appendChild(script);
    },
    methods: {
        formattedHarga(harga) {
            return harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        },
        async getData() {
            try {
                const userToken = localStorage.getItem('token');
                const route = useRoute();
                const transactionId = route.params.id;

                const response = await axios.get(`https://admin.unisains.com/api/v1/transaction/show/${transactionId}`, {
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
        async payWithMidtrans() {
            try {
                const snapToken = localStorage.getItem('snapToken');
                const self = this;
                snap.pay(snapToken, {
                    onSuccess: function (result) {
                        // Payment successful, handle success logic here
                        alert('Payment successful! Transaction ID: ' + result.transaction_id);
                        //clear data local storage
                        localStorage.removeItem('idTrx');
                        localStorage.removeItem('pembayaran');
                        // Redirect or show success message as needed
                        self.$router.push('/payment-success');
                    },
                    onError: function (result) {
                        // Payment failed, handle error logic here
                        alert('Payment failed. Status code: ' + result.status_code);
                        // Redirect or show error message as needed
                    }
                });
            } catch (error) {
                // Handle any error that occurs during the payment process
                alert('Error Payment');
            }
        }
    },
};
</script>


<style scoped>
.course-purchase {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.course-purchase .information {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
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
    text-align: center;
}

.course-purchase .menu .text-kursus {
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: black;
    justify-content: center;
}

.course-purchase .menu .text-kursus p {
    font-size: 20px;
    font-weight: 600;
}

.course-purchase .menu .text-menu {
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 115px;
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
    text-align: center;
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
    justify-content: center;
    gap: 70px;
    font-size: 20px;
    color: white;
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

.course-purchase .button {
    text-decoration: none;
}

.course-purchase .button .close {
    width: 100%;
    background-color: white;
    color: #6A2C70;
}

.course-purchase .button .lanjutkan {
    width: 100%;
    background-color: #6A2C70;
    color: white;
}

.button .close a {
    width: 100%;
    text-decoration: none;
    font-size: 24px;
    font-weight: bold;
}

router-link {
    text-decoration: none;
    color: white;
}
</style>
  
  