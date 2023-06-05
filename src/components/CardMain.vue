<script>
export default {
  data() {
    return {
      isLoggedIn: false,
      showPopup: false
    };
  },
  methods: {
    showPreview() {
      this.showPopup = true;
    },
    closePreview() {
      this.showPopup = false;
    },
    goToDetailPage() {
      // Logika untuk mengarahkan ke halaman detail
    }
  }
};
</script>

<template>
    <div>
      <div v-if="!isLoggedIn" class="card" @click="showPreview()">
        <img src="@/assets/image/card-bg.png" alt="">
        <h4>Anatomi Tubuh Manusia : Jantung</h4>
        <p>UNI SAINS</p>
        <img class="svg" src="@/assets/icon/rating-ex.svg" alt="">
        <h3>Rp 300,000</h3>
      </div>
      <div v-else class="card" @click="goToDetailPage()">
        <img src="@/assets/image/card-bg.png" alt="">
        <h4>Anatomi Tubuh Manusia : Jantung</h4>
        <p>UNI SAINS</p>
        <img class="svg" src="@/assets/icon/rating-ex.svg" alt="">
        <h3>Rp 300,000</h3>
      </div>
      <!-- Pop up preview -->
      <div v-if="showPopup" class="popup">
        <div class="preview-content">
          <h4>Anatomi Tubuh Manusia : Jantung</h4>
          <p>UNI SAINS</p>
          <img src="@/assets/image/card-bg.png" alt="">
          <p>Deskripsi singkat tentang kursus ini.</p>
          <h3>Rp 300,000</h3>
          <button @click="closePreview()">Close</button>
        </div>
      </div>
    </div>
  </template>
  

  
  <style scoped>
  .card {
    width: 350px;
    height: 360px;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #C1C1C1;
    margin: 20px;
    display: flex;
    flex-direction: column;
  }
  
  .card img {
    width: 348px;
    height: 175px;
    border-radius: 10px 10px 0 0;
  }
  
  .card h4 {
    font-size: 18px;
    font-weight: bold;
    margin-top: 20px;
    margin-left: 15px;
  }
  
  .card .svg {
    width: 65%;
    height: 65%;
    margin-left: 15px;
  }
  
  .card p {
    font-size: 14px;
    margin-top: 10px;
    margin-left: 15px;
    text-align: left;
  }
  
  .card h3 {
    font-size: 20px;
    font-weight: 600;
    margin-top: 20px;
    margin-left: 15px;
    margin-bottom: 10px;
  }
  
  /* CSS for Pop up preview */
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .preview-content {
    background-color: #fff;
    padding: 20px;
    max-width: 400px;
    text-align: center;
  }
  
  .preview-content h4 {
    font-size: 20px;
    margin-top: 0;
  }
  
  .preview-content p {
    margin-bottom: 10px;
  }
  
  .preview-content img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    margin-bottom: 10px;
  }
  
  .preview-content button {
    padding: 10px 20px;
    background-color: #ff5722;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  </style>
  