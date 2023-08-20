<script setup>
import ContentModule from '../components/ContentModule.vue';
</script>

<template>
    <main>
        <div class="container-module">
            <div class="topnav-module">
                <div class="left-content">
                    <a href="">
                        <img src="../assets/icon/arrow-left-midnight.svg" alt="">
                    </a>
                    <h3>Matahari</h3>
                </div>
                <div class="right-content">
                    <div class="search-content">
                        <img src="../assets/icon/search-bigfootfeet.svg" alt="">
                        <input type="text" placeholder="Cari kata kunci disini">
                    </div>
                    <a href="">
                        <img src="../assets/icon/setting-midnight.svg" alt="">
                    </a>
                </div>
            </div>
            <ContentModule />
            <div class="botnav-module">
                <div class="botnav-left">
                    <a href="">
                        <img src="../assets/icon/expand-left-midnight.svg" alt="">
                    </a>
                    <h3>
                        Sebelumnya
                    </h3>
                </div>
                <div class="botnav-mid-content">
                    <h3>Matahari</h3>
                </div>
                <div class="botnav-right">
                    <h3>
                        Selanjutnya
                    </h3>
                    <a href="">
                        <img src="../assets/icon/expand-right-midnight.svg" alt="">
                    </a>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
.container-module {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    text-align: justify;
}

.topnav-module {
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #CBC8B3;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    padding: 0 40px;
}

.left-content {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
}

.left-content a {
    width: 50px;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    text-decoration: none;
}

.left-content a img {
    width: 50px;
    height: 50px;
}

.left-content h3 {
    font-size: 20px;
    font-weight: 600;
    color: #B83B5E;
    margin-left: 15px;
}

.right-content {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    align-content: center;
}

.right-content .search-content {
    width: 350px;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    border: 1px solid #F08A5D;
    border-radius: 50px;
    margin-right: 30px;
}

.right-content .search-content img {
    width: 30px;
    height: 30px;
    margin-left: 20px;
}

.right-content .search-content input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 18px;
    font-weight: 400;
    color: #B83B5E;
    margin-left: 20px;
    border-radius: 50px;
}

.right-content a img {
    width: 35px;
    height: 35px;
}

.botnav-module {
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    border-top: 1px solid #CBC8B3;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    padding: 0 40px;
}

.botnav-left {
    width: 33%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
}

.botnav-left a {
    width: 35px;
    height: 35px;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    text-decoration: none;
}

.botnav-left a img {
    width: 35px;
    height: 35px;
}

.botnav-left h3 {
    font-size: 18px;
    font-weight: 600;
    color: #401A43;
    margin-left: 5px;
}

.botnav-mid-content {
    width: 33%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
}

.botnav-mid-content h3 {
    font-size: 24px;
    font-weight: 600;
    color: #B83B5E;
}

.botnav-right {
    width: 33%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    align-content: center;
}

.botnav-right h3 {
    font-size: 18px;
    font-weight: 600;
    color: #401A43;
    margin-right: 5px;
}

.botnav-right a {
    width: 35px;
    height: 35px;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    text-decoration: none;
}
</style>