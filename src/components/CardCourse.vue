<script>
import ProgressBar from './ProgressBar.vue';
export default {
    components: {
        ProgressBar
    }
};
</script>

<template>
    <div class="card-course">
        <div class="card-course-image">
            <img src="@/assets/image/card-bg.png" alt="">
        </div>
        <div class="card-course-text">
            <h3>Belajar HTML dan CSS</h3>
            <p>Belajar HTML dan CSS untuk pemula</p>
            <ProgressBar :value="55" />
        </div>
    </div>
</template>

<style scoped>
.card-course {
    width: 375px;
    height: 253px;
    border-radius: 20px;
    margin-right: 30px;
    margin-bottom: 30px;
    border: 1px solid #B83B5E;
    display: flex;
    flex-direction: column;
    padding: 10px;
    transition: all 0.3s ease-in-out;
}

.card-course:hover {
  transform: translateY(-5px);
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
}

.card-course-image img {
    width: 349px;
    height: 136px;
    border-radius: 20px;
}

.card-course-text {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 10px;
}

.card-course-text h3 {
    font-size: 14px;
    font-weight: 800;
    margin-bottom: 7px;
}

.card-course-text p {
    font-size: 11px;
    font-weight: 400;
    margin-bottom: 5px;
}
</style>