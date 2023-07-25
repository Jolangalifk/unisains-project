<script>
export default {
  data() {
    return {
      selectAll: false,
      selectedItems: [],
      data: [
        { id: 1, gambar: "../assets/image/card-bg.png", teks: 'Teks 1', harga: 500 },
        { id: 2, gambar: "../assets/image/card-bg.png", teks: 'Teks 2', harga: 400 },
        { id: 3, gambar: "../assets/image/card-bg.png", teks: 'Teks 3', harga: 300 }
      ]
    };
  },
  methods: {
    selectAllItems() {
      if (this.selectAll) {
        this.selectedItems = this.data.map(item => item.id);
      } else {
        this.selectedItems = [];
      }
    },
    hapusItem(index) {
      this.data.splice(index, 1);
    }
  }
};
</script>

<template>
  <div class="list-course">
    <h3>Keranjang</h3>
    <table>
      <thead>
        <tr>
          <label class="select-all">
            <input type="checkbox" v-model="selectAll" @change="selectAllItems">
            <p>Pilih Semua</p>
          </label>
          <th>Harga</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td>
            <input type="checkbox" v-model="selectedItems" :value="item.id">
            <img :src="item.gambar" alt="Gambar" height="50">
            {{ item.teks }}
          </td>
          <td class="harga">Rp {{ item.harga }}.000</td>
          <td class="button">
            <button @click="hapusItem(index)">
              <img src="@/assets/icon/delete-icon.svg" alt="">
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<style scoped>
.list-course {
  width: 1150px;
  height: 980px;
  border-collapse: collapse;
  margin: auto;
  font-family: poppins;
  font-size: 14px;
  padding: 0 50px 50px 50px;
}

.list-course h3 {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
}

.list-course .select-all {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 8px;
}

.list-course .select-all p {
  font-size: 20px;
  font-weight: 600;
}

.list-course td {
  padding: 8px;
  text-align: left;
  height: 130px;
  width: 515px;
}

.list-course .harga {
  width: 260px;
}

.list-course .button {
  width: 260px;
}
.list-course tr {
  font-size: 20px;
  font-weight: 600;
  padding: 10px;
}

.list-course th {
  font-size: 20px;
  font-weight: 600;
  padding: 10px;
}

.list-course input[type="checkbox"] {
  margin-right: 10px;
  cursor: pointer;
}

.list-course .harga {
  font-weight: 600;
  font-size: 18px;
  text-align: center;
}

.list-course .button {
  text-align: center;
}

.list-course button {
  width: 50px;
  height: 50px;
  background-color: white;
  border: 1px solid #c1c1c1;
  border-radius: 10px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
}
</style>
