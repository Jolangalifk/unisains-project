<template>
    <div>
        <div v-if="modules && modules.length > 0">
            <div v-for="module in modules" :key="module.title_module" class="module-item">
                <h3>{{ module.title_module }}</h3>
                <p>{{ module.description }}</p>
                <img :src="module.thumbnail_module" alt="Module Thumbnail" class="module-thumbnail">
            </div>
        </div>
        <div v-else>
            <!-- Tampilkan pesan jika tidak ada data modul -->
            <p>Tidak ada data modul untuk ditampilkan.</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        modules: {
            type: Array,
            default: () => []
        }
    }
};
</script>

<style>
/* Style untuk container modul */
.module-item {
    background-color: #6A2C70;
    border-radius: 10px;
    padding: 30px;
    margin: 10px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Style untuk judul modul */
.module-item h3 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 10px;
    color: #fff;
}

/* Style untuk deskripsi modul */
.module-item p {
    font-size: 20px;
    margin-bottom: 10px;
    line-height: 1.5;
    color: #fff;
}

/* Style untuk thumbnail modul */
.module-thumbnail {
    width: 20%;
    height: auto;
    margin-top: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
