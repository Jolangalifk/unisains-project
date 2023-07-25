<script>
export default {
    props: {
        value: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            progress: 0
        };
    },
    mounted() {
        this.updateProgress();
    },
    methods: {
        updateProgress() {
            const interval = setInterval(() => {
                if (this.progress < this.value) {
                    this.progress++;
                } else {
                    clearInterval(interval);
                }
            }, 10);
        }
    }
};
</script>

<template>
    <div class="progress-bar">
        <div class="progress" :style="{ width: progress + '%' }"></div>
    </div>
</template>
  
<style scoped>
.progress-bar {
    width: 450px;
    height: 17px;
    background-color: #fff;
    border-radius: 20px;
    margin-top: 5px;
    border: 1px solid #B83B5E;
}

.progress {
    height: 100%;
    background-color: #14FF00;
    border-radius: 20px;
    transition: width 0.3s ease-in-out;
}
</style>