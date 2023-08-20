<template>
    <main>
        <Navbar />
        <div class="help-center">
            <div class="image">
                <img src="@/assets/image/help-center.png" alt="">
            </div>
            <div class="text">
                <h1>Bagaimana kami dapat membantu anda?</h1>
                <form @submit.prevent="submitForm">
                    <textarea id="w3review" name="w3review" rows="10" cols="50" v-model="reportText"
                        placeholder="Tulis pertanyaan atau masalah anda disini!"></textarea>
                    <br>
                    <input class="submit" type="submit" value="Kirim">
                </form>
            </div>
        </div>
        <Footer />
    </main>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import Swal from 'sweetalert2';

const reportText = ref('');

async function submitForm() {
  try {
    const userToken = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('report', reportText.value);

    const response = await axios.post('https://admin.unisains.com/api/v1/report/store', formData, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    // Handle the response here (e.g., show a success message)
    console.log('Report submitted successfully:', response.data);

    // Show success alert
    Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: 'Laporan berhasil dikirim!',
    });

    // Optional: Clear the textarea after successful submission
    reportText.value = '';
  } catch (error) {
    // Show error alert
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to submit report. Please try again later.',
    });

    // Handle the error here (e.g., show an error message)
    console.error('Error submitting report:', error);
  }
}
</script>

<style scoped>
.help-center {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.help-center .image {
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 50px;
    margin-left: 100px;
}

.help-center .image img {
    width: 100%;
    height: 100%;
}

.help-center .text {
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 100px;
}

.help-center h1 {
    width: 60%;
    height: 100%;
    font-size: 36px;
    font-weight: bold;
    color: black;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin-left: 100px;
    line-height: 1.3;
    margin-bottom: 20px;
}

.help-center form {
    width: 80%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    margin-bottom: 100px;
}

.help-center form textarea {
    width: 100%;
    height: 100%;
    border: 1px solid #C1C1C1;
    border-radius: 10px;
    padding: 20px;
    font-size: 20px;
}

.help-center form .submit {
    width: 100%;
    height: 100%;
    border: 1px solid #C1C1C1;
    border-radius: 10px;
    padding: 20px;
    background-color: #F08A5D;
    color: white;
    font-size: 18px;
    font-weight: bold;
    font-family: poppins;
}
</style>





