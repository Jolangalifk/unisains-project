<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios';
import { useRoute } from 'vue-router';
import router from '@/router/index.js';

const route = useRoute();

const getUserToken = () => {
    const token = localStorage.getItem('token');
    return token ? token.replace(/['"]+/g, '') : '';
};

let loading = ref(false);
let currentQuestionIndex = ref(0);
let courseData = ref([]);
const quizData = ref([]);
const answerData = ref([]);
const selectedAnswer = ref(null); // To track the selected answer
const selectedIdQuiz = ref(null); // To track the selected answer
const answered = computed(() => selectedAnswer.value !== null); // To check if a question is answered
let answeredQuestions = ref([]);
let idQuiz = ref([]);
const userScore = ref(null);

const getQuizzezData = async () => {
    try {
        const token = getUserToken();
        const response = await axios.get(
            `https://admin.unisains.com/api/v1/course/learn/${route.params.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        courseData.value = response.data.course;
        quizData.value = response.data.quizzez;
        answerData.value = response.data.quizzez;
        console.log(courseData.value);
        console.log(quizData.value);
        console.log(answerData.value);
    } catch (error) {
        console.log(error);
    }
};

const postAnswerQuiz = async () => {
    try {
        loading.value = true;
        const token = getUserToken();

        const userAnswer = {
            "question_id": idQuiz.value,
            "answer": answeredQuestions.value,
        }

        const response = await axios.post(
            `https://admin.unisains.com/api/v1/course/trx-quiz/${route.params.id}`, userAnswer,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response.data); // Log the entire response

        if (response.data && response.data.data && response.data.data.user_score !== undefined) {
            userScore.value = response.data.data.user_score;
            console.log(userScore.value);

            localStorage.setItem('userScore', userScore.value);

            goToQuizScore();

            console.log(response.data);
        } else {
            console.log("Unexpected response structure:", response.data);
        }
    } catch (error) {
        console.log(error);
        alert("Gagal mengirim jawaban");
    } finally {
        loading.value = false;
    }
}

const goToQuizScore = () => {
    try {
        if (userScore.value !== null) {
            if (userScore.value < 80) {
                // If userScore is below 80, navigate to QuizScoreView.vue
                router.push({
                    name: 'bad-quiz-score',
                    params: {
                        id: route.params.id,
                    },
                });
            } else {
                // If userScore is 80 or 100, navigate to a different route (adjust the route name as needed)
                router.push({
                    name: 'quiz-score', // Update this with the appropriate route name
                    params: {
                        id: route.params.id,
                    },
                });
            }
        }
    } catch (error) {
        console.log("Error navigating to QuizScoreView.vue:", error);
    }
};

const selectAnswer = (value, id) => {
    selectedAnswer.value = value;
    selectedIdQuiz.value = id;
    submitAnswer();
};

const submitAnswer = () => {
    if (selectedAnswer.value !== null && selectedIdQuiz.value !== null) {
        answeredQuestions.value[currentQuestionIndex.value] = selectedAnswer.value;
        selectedAnswer.value = null;
        idQuiz.value[currentQuestionIndex.value] = selectedIdQuiz.value;
        selectedIdQuiz.value = null;
    }
    console.log(answeredQuestions.value);
    console.log(idQuiz.value);
};

const isAnswered = (index) => {
    return answeredQuestions.value[currentQuestionIndex.value] === index;
};

const goToNextQuestion = () => {
    if (currentQuestionIndex.value < 0) {
        currentQuestionIndex = 0;
    } else if (currentQuestionIndex.value >= quizData.length) {
        currentQuestionIndex = quizData.length - 1;
    } else {
        currentQuestionIndex.value++;
    }
};

const sortAnswers = (answers) => {
    // Menggunakan metode sort untuk mengurutkan jawaban berdasarkan nilai abjad A, B, C, D
    return answers.sort((a, b) => a.value.localeCompare(b.value));
};

const goToPreviousQuestion = () => {
    if (currentQuestionIndex.value > 0) {
        currentQuestionIndex.value--;
    }
};

onMounted(() => {
    getQuizzezData();
    console.log(answeredQuestions.value);
});
</script>
<template>
    <div class="container-quiz" v-if="quizData.length > 0">
        <div class="fit-container">
            <div class="course-title">
                <div class="title-course-icon">
                    <img src="@/assets/icon/ceklist-white-icon.svg" alt="">
                    <p>Kuis {{ courseData.title_course }}</p>
                </div>
                <div class="quiz-number">
                    <h3>{{ currentQuestionIndex + 1 }}/{{ quizData.length }}</h3>
                </div>
            </div>
            <div class="container-question">
                <div class="quiz-question">
                    <h1>{{ quizData[currentQuestionIndex].question }}</h1>
                </div>
                <div class="input-container">
                    <div class="multiple-choice">
                        <button v-for="(answer, index) in sortAnswers(quizData[currentQuestionIndex].answers)" :key="index"
                            @click="selectAnswer(answer.value, answer.id)" :disabled="isAnswered(index)" class="btn-answer">
                            {{ answer.value + '. ' + answer.answer }}
                        </button>
                    </div>
                </div>
            </div>
            <div class="container-next-previous">
                <div class="container-btn">
                    <div class="btn-previous">
                        <button @click="goToPreviousQuestion" :disabled="currentQuestionIndex === 0">
                            <img src="@/assets/icon/arrow-left-purple.svg" alt="">
                            <p>Sebelumnya</p>
                        </button>
                    </div>
                    <div class="btn-nextquiz">
                        <button @click="goToNextQuestion" :disabled="currentQuestionIndex === quizData.length - 1">
                            <p>Selanjutnya</p>
                            <img src="@/assets/icon/arrow-right.svg" alt="">
                        </button>
                    </div>
                </div>
                <div class="btn-submit">
                    <button @click="postAnswerQuiz()" v-if="currentQuestionIndex === quizData.length - 1 && !loading">
                        Kirim
                    </button>
                    <div v-else>
                        <div v-if="loading">
                            <div class="else-content">
                                <h3>Loading...</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="else-content">
            <h3>Loading...</h3>
        </div>
    </div>
</template>

<style scoped>
.container-quiz {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.fit-container {
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
    justify-content: space-between;
    margin-top: 50px;
}

.title-course-icon {
    width: 410px;
    height: 70px;
    background-color: #6A2C70;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.title-course-icon img {
    width: 50px;
    height: 50px;
    margin-right: 28px;
    margin-left: 13px;
}

.title-course-icon p {
    font-size: 20px;
    font-weight: 500;
    color: #fff;
}

.quiz-number {
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 5px solid #6A2C70;
    border-radius: 100px;
}

.quiz-number h3 {
    font-size: 20px;
    font-weight: 600;
    color: #6A2C70;
}

.container-question {
    width: 100%;
    height: 610px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

.quiz-question {
    width: 1330px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0 20px 0;
}

.quiz-question p {
    width: 100%;
    height: fit-content;
    font-size: 24px;
    font-weight: 600;
    color: #000000;
}

.input-container {
    width: 1380px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.multiple-choice {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 20px;
}

.multiple-choice button {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: start;
    align-content: start;
    font-size: 20px;
    font-weight: 600;
    color: #000000;
    background-color: #FEFAE0;
    border: 1px solid #FEFAE0;
    border-radius: 10px;
    padding-left: 70px;
    margin-bottom: 20px;
}

.multiple-choice button span {
    margin-left: 20px;
}

.multiple-choice button:hover {
    background-color: #6A2C70;
    color: #FFFFFF;
}

.multiple-choice button:active {
    background-color: #6A2C70;
    color: #FFFFFF;
}

.multiple-choice button:focus {
    background-color: #6A2C70;
    color: #FFFFFF;
}

.container-next-previous {
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

.container-btn {
    width: 500px;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.btn-previous {
    width: 210px;
    height: 70px;
    display: flex;
    align-items: center;
    margin-top: 35px;
}

.btn-previous button {
    width: 100%;
    height: 100%;
    background-color: #6A2C70;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border: none;
}

.btn-previous button img {
    width: 50px;
    height: 50px;
    margin-left: 5px;
}

.btn-previous button p {
    font-size: 18px;
    font-weight: 500;
    color: #fff;
    margin-left: 20px;
}

.btn-nextquiz {
    width: 210px;
    height: 70px;
    display: flex;
    align-items: center;
    margin-top: 35px;
}

.btn-nextquiz button {
    width: 210px;
    height: 70px;
    background-color: #6A2C70;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border: none;
}

.btn-nextquiz button p {
    font-size: 18px;
    font-weight: 500;
    color: #fff;
    margin-right: 20px;
}

.btn-nextquiz button img {
    width: 50px;
    height: 50px;
    margin-right: 5px;
}

.btn-submit {
    width: 210px;
    height: 70px;
    display: flex;
    align-items: center;
    margin-top: 35px;
}

.btn-submit button {
    width: 210px;
    height: 70px;
    background-color: #6A2C70;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;
    color: #fff;
}

.else-content {
    width: 100%;
    height: 950px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
}

.else-content h3 {
    font-size: 24px;
    font-weight: 600;
    color: #6A2C70;
}
</style>