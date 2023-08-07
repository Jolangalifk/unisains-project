<template>
    <div>
        <div v-for="(item, index) in listHistory" :key="index" class="list-history">
            <div class="list">
                <div class="kursus">
                    <!-- Tambahkan cek kondisional menggunakan v-if -->
                    <p v-if="item.course">{{ item.course.title_course }}</p>
                    <p v-else>Kursus Tidak Tersedia</p>
                </div>
                <div class="text">
                    <div class="tanggal-p">
                        <p class="tanggal">{{ formatDate(item.date) }}</p>
                    </div>
                    <p>{{ item.status }}</p>
                    <p>Rp {{ item.total_price }}</p>
                    <p>{{ item.code_transaction }}</p>
                </div>
                <div class="button-detail">
                    <button @click="goToDetail(item.id)">Detail</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const listHistory = ref([]);
const router = useRouter();

const formatDate = (date) => {
    // Implement your date formatting logic here
    // For example, you can use JavaScript Date object or a library like moment.js
    return date;
};

const goToDetail = (transactionId) => {
  router.push(`/detail-transaction/${transactionId}`);
  console.log(transactionId);
};

onMounted(async () => {
    try {
        const getUserInfo = localStorage.getItem('user-info');
        const user = JSON.parse(getUserInfo);
        const token = user.token;
        const response = await axios.get('https://admin.unisains.com/api/v1/transaction/all', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })

        listHistory.value = response.data.data.transactions;
        console.log(listHistory.value);
        // if (response.data.status === 200) {
        //     listHistory.value = response.data.data;
        // }
    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan saat mengambil data transaksi.');
    }
});

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