<template>
    <div class="body">
        <div class="container-register">
            <div class="register-wrapper">
                <div class="head-register">
                    <h1>Daftar</h1>
                    <p>Daftarkan akun anda untuk memulai belajar sains!</p>
                </div>
                <form class="form-input" v-on:submit.prevent="Register">
                    <div class="wrapper-name">
                        <div class="name">
                            <input type="text" placeholder="Nama depan" v-model="first_name">
                        </div>
                        <div class="name">
                            <input type="text" placeholder="Nama belakang" v-model="last_name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="Username"></label>
                        <img src="@/assets/icon/email-icon.svg" alt="">
                        <input type="text" placeholder="Masukkan Username" v-model="username">
                    </div>
                    <div class="form-group">
                        <label for="Email"></label>
                        <img src="@/assets/icon/email-icon.svg" alt="">
                        <input type="email" placeholder="Masukkan Email" v-model="email">
                    </div>
                    <div class="form-group">
                        <label for="Password"></label>
                        <img src="@/assets/icon/password-icon.svg" alt="">
                        <input type="password" placeholder="Masukkan Password" v-model="password">
                    </div>
                    <button type="submit" class="button-register">Submit</button>
                </form>
                <div class="social-media-register">
                    <p>Atau daftar dengan</p>
                    <div class="social-media">
                        <button>
                            <img src="../assets/image/google-icon.png" alt="google">
                            <h3> Google </h3>
                        </button>
                        <button>
                            <img src="../assets/image/twitter-icon.png" alt="facebook">
                            <h3> Twitter </h3>
                        </button>
                    </div>
                </div>
                <br>
                <div class="login">
                    <p>Sudah punya akun? <router-link to="/login">Masuk</router-link></p>
                </div>
            </div>

        </div>
        <img src="@/assets/image/anatomi-bg.png" alt="">
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Register',
    data() {
        return {
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
        }
    }, 
    methods: {
        async Register() {
            let result = await axios.post('http://127.0.0.1:8000/api/v1/auth/register', {
                first_name : this.first_name,
                last_name : this.last_name,
                username: this.username,
                email: this.email,
                password: this.password,
            });
            console.log(result);
            if (result.status == 201 && result.data) {
                alert('Register berhasil');
                localStorage.setItem('user-info', JSON.stringify(result.data));
                this.$router.push('/login');
            }
        },
        tes() {
            console.log('Register berhasil');
            alert('Register berhasil');
        }
    },
}


</script>

<style>
.body {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.container-register {
    width: 100%;
    padding: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.register-wrapper {
    width: 75%;
}

.head-register {
    padding-bottom: 30px;
}

.head-register h1 {
    text-align: left;
    font-size: 54px;
    font-weight: bold;
    color: black;
}

.head-register p {
    text-align: left;
    font-size: 20px;
    font-weight: normal;
    color: black;
}

.form-group {
    width: 100%;
    height: 80px;
    margin: 8px 0;
    padding: 0 8px;
    border: 1px solid #c1c1c1;
    border-radius: 30px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.form-group img {
    width: 35px;
    height: 35px;
    margin-right: 30px;
    margin-left: 30px;
}

.form-group input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 20px;
    font-family: poppins;
    font-weight: normal;
    color: black;
}

.button-register {
    width: 100%;
    height: 80px;
    border: none;
    border-radius: 30px;
    box-sizing: border-box;
    background-color: #F08A5D;
    color: white;
    font-size: 24px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    font-family: poppins;
}

.register {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.account {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.login {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-bottom: 30px;
}

.wrapper-name {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
}

.name {
    width: 235px;
    height: 80px;
    border: 1px solid #c1c1c1;
    border-radius: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.name input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 20px;
    font-family: poppins;
    font-weight: normal;
    color: black;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-left: 30px;
}

.wrapper {
    width: 100%;
    height: 80px;
    margin: 8px 0;
    padding: 0 8px;
    border: 1px solid #c1c1c1;
    border-radius: 30px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.wrapper img {
    width: 35px;
    height: 35px;
    margin-right: 30px;
    margin-left: 30px;
}

.wrapper input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 20px;
    font-family: poppins;
    font-weight: normal;
    color: black;
}

.register .register-btn {
    width: 100%;
    height: 80px;
    border: none;
    border-radius: 30px;
    box-sizing: border-box;
    background-color: #F08A5D;
    color: white;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: poppins;
}

.social-media-register {
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: normal;
    color: black;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}

.social-media {
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: normal;
    color: black;
    display: flex;
    justify-content: space-around;
}

.social-media-register p {
    font-size: 16px;
    font-weight: normal;
    color: black;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding-bottom: 30px;
    padding-top: 30px;
}

.social-media-register button {
    width: 210px;
    height: 80px;
    margin: 8px 0;
    padding: 0 8px;
    border: 1px solid #ccc;
    border-radius: 30px;
    box-sizing: border-box;
    background-color: white;
    color: white;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.social-media img {
    align-items: center;
    margin-right: 15px;
}

.social-media-register button img google {
    width: 35px;
    height: 35px;
}

.social-media-register button img twitter {
    width: 35px;
    height: 29px;
}

button h3 {
    font-family: poppins;
    text-align: left;
    font-size: 20px;
    font-weight: 600;
    color: black;
}

.login {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    color: black;
}

.login p {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    color: black;
}

.login p a {
    text-decoration: none;
    font-weight: 600;
    color: #F08A5D;
}

.background-register {
    width: 100%;
    height: 100vh;
}

.background-register img {
    width: 100%;
    height: 100vh;
}
</style>