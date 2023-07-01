<script setup>
import CardCourse from '../components/CardCourse.vue';
</script>

<template>
    <div class="my-course">
        <div class="course-text">
            <h1>Kursus saya</h1>
        </div>
        <div class="course-content">
            <div class="course-content-row">
                <CardCourse />
                <CardCourse />
                <CardCourse />
            </div>
            <div class="course-content-row">
                <CardCourse />
                <CardCourse />
                <CardCourse />
            </div>
        </div>
    </div>
</template>

<style scoped>
.my-course {
    width: 1350px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 100px;
}
.course-text h1 {
    font-size: 32px;
    font-weight: 700;
    margin: 65px 0 50px 0;
}

.course-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.course-content-row{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
}
</style>