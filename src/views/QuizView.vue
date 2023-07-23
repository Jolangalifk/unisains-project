<script>
import QuizQuestion from '../components/QuizQuestion.vue';

export default {
    components: {
        QuizQuestion
    },
    data() {
        return {
            quizData: null,
            error: null
        };
    },
    
    methods: {
        async fetchQuizData() {
            try {
                const response = await fetch('https://admin.unisains.com/public/api/v1/quiz/show', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch quiz data: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                this.quizData = {
                    id: data.id,
                    question: data.question,
                    answer: data.answer
                };
            } catch (error) {
                this.error = error.message;
                console.error(error);
            }
        }
    },
    mounted() {
        this.fetchQuizData();
    },
};
</script>

<template>
    <main>
        <div class="container-quiz">
            <div class="fit-container">
                <div class="course-title">
                    <div class="title-course-icon">
                        <img src="@/assets/icon/ceklist-white-icon.svg" alt="">
                        <p>Kuis Planet Merkurius</p>
                    </div>
                    <div class="quiz-number">
                        <h3>1/5</h3>
                    </div>
                    <div class="qustion-icon">
                        <a href="">
                            <img src="@/assets/icon/question-icon.svg" alt="">
                        </a>
                        
                    </div>
                </div>
                <QuizQuestion />
                <div class="container-next-previous">
                    <div class="btn-previous">
                        <a href="">
                            <img src="@/assets/icon/arrow-left-purple.svg" alt="">
                        </a>
                    </div>
                    <div class="btn-nextquiz">
                        <a href="">
                            <p>Lanjut</p>
                            <img src="@/assets/icon/arrow-right.svg" alt="">
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<style scoped>
.container-quiz {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.fit-container{
    width: 1380px;
    height: 935px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.course-title {
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    margin-top: 85px;
}

.title-course-icon{
    width: 410px;
    height: 70px;
    background-color: #6A2C70;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-right: 820px;
}

.title-course-icon img{
    width: 50px;
    height: 50px;
    margin-right: 28px;
    margin-left: 13px;
}

.title-course-icon p{
    font-size: 20px;
    font-weight: 500;
    color: #fff;
}

.quiz-number{
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.quiz-number h3{
    font-size: 20px;
    font-weight: 600;
    color: #6A2C70;
}

.qustion-icon a{
    width: 70px;
    height: 70px;
    background-color: #6A2C70;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
}

.qustion-icon img{
    width: 50px;
    height: 50px;
}

.container-next-previous{
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 35px;
    border-top: 3px;
    border-top-style: solid;
    border-top-color: #000000;
}

.btn-previous{
    width: 100px;
    height: 50px;
    display: flex;
    align-items: center;
}

.btn-previous{
    width: 70px;
    height: 70px;
    margin-top: 35px;
}

.btn-previous a{
    width: 70px;
    height: 70px;
    background-color: #6A2C70;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-previous a img{
    width: 50px;
    height: 50px;
}

.btn-nextquiz{
    width: 210px;
    height: 70px;
    display: flex;
    align-items: center;
    margin-top: 35px;
}

.btn-nextquiz a{
    width: 210px;
    height: 70px;
    background-color: #6A2C70;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    text-decoration: none;
}

.btn-nextquiz a p{
    font-size: 20px;
    font-weight: 600;
    color: #fff;
    margin-right: 35px;
}

.btn-nextquiz a img{
    width: 50px;
    height: 50px;
    margin-right: 15px;
}
</style>