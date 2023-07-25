<script>
import ProgressBarModule from './ProgressBarModule.vue';
export default {
    components: {
        ProgressBarModule
    }
};
</script>
<template>
    <div class="progress-bar-container">
        <ProgressBarModule :value="30" />
        <div class="progress-txt">
            <h1>Progress kamu disini!</h1>
        </div>
    </div>
</template>

<style scoped>
.progress-bar-container {
    width: 100%;
    height: 110px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #FEFCEC;
    border: 1px solid #CBC8B3;
}

.progress-txt {
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: start;
    padding-left: 40px;
    margin-top: 10px;
}

.progress-txt h1 {
    font-size: 18px;
    font-weight: 600;
    color: #6A2C70;
}
</style>