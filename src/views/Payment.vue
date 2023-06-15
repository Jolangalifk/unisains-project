<template>
    <div>
      <h1>Contoh Pembayaran</h1>
      <button @click="createPayment">Buat Pembayaran</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { Snap } from 'midtrans-client';

  
  export default {
    methods: {
      createPayment() {
        const tokenauth = localStorage.getItem('token');
  
        axios
          .post('http://127.0.0.1:8000/api/v1/transaction/checkout', { transaction_id: 2 }, {
            headers: {
              Authorization: `Bearer ${tokenauth}`
            }
          })
          .then(response => {
            this.createTransactionToken(response.data.snap_token);
          })
          .catch(error => {
            console.log(error);
          });
      },
      createTransactionToken(token) {
        Snap.createTransactionToken(
          {
            transactionToken: token
          },
          function(status, response) {
            if (status === 200) {
              const snapToken = response.token;
  
              Snap.pay(snapToken, {
                onSuccess: function(result) {
                  console.log('Pembayaran berhasil:', result);
                },
                onPending: function(result) {
                  console.log('Pembayaran tertunda:', result);
                },
                onError: function(result) {
                  console.log('Pembayaran error:', result);
                }
              });
            } else {
              console.log('Gagal membuat token pembayaran');
            }
          }
        );
      }
    },
    mounted() {
      const urlParams = new URLSearchParams(window.location.search);
      const paymentToken = urlParams.get('snap_token');
      if (paymentToken) {
        console.log('Token pembayaran:', paymentToken);
      }
    }
  };
  </script>
  