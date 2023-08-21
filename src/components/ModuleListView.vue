<script setup>
import ProgressBarModuleView from './ProgressBarModuleView.vue';
import ModuleList from './ModuleList.vue';
</script>
<template>
    <div class="container-module-list">
        <div class="module-list-txt">
            <h2>Daftar Modul</h2>
        </div>
        <ProgressBarModuleView />
        <div class="scrollview">
            <!-- <ModuleList />
            <ModuleList />
            <ModuleList />
            <ModuleList /> -->
            <ModuleList />
        </div>
    </div>
</template>

<style scoped>
.container-module-list {
    width: fit-content;
    height: calc(100vh - 200px);
    display: flex;
    border-left: 1px solid #CBC8B3;
    flex-direction: column;
    align-items: center;
    align-content: center;
}

.scrollview {
    width: 100%;
    height: 100%;
    overflow: auto;
}

.module-list-txt {
    width: 100%;
    height: 115px;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    justify-content: center;
    border-bottom: 1px solid #CBC8B3;
}

.module-list-txt h2 {
    font-size: 24px;
    font-weight: 600;
    color: #B83B5E;
}

.scrollview::-webkit-scrollbar {
    width: 10px;
}

.scrollview::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.scrollview::-webkit-scrollbar-thumb {
    background: #888;
}

.scrollview::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>