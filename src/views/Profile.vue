<script>
import Navbar from '../components/Navbar.vue';
import MyCourse from '../components/MyCourse.vue';

export default {
    components: {
        Navbar,
        MyCourse
    },
    data() {
        return {
            profileData: null,
            error: null
        };
    },
    
    methods: {
        async fetchProfileData() {
            try {
                const response = await fetch('https://admin.unisains.com/public/api/v1/profile/show', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch profile data: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                this.profileData = {
                    id: data.id,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email
                };
            } catch (error) {
                this.error = error.message;
                console.error(error);
            }
        }
    },
    mounted() {
        this.fetchProfileData();
    },
};
</script>


<template>
    <main>
        <Navbar />
        <div class="profile">
            <div class="profile-sidebar">
                <div class="profile-wrapper">
                    <div class="profile-image">
                        <img src="@/assets/image/picture-example.png" alt="">
                    </div>
                    <div class="profile-text">
                        <h3>{{ profileData ? profileData.first_name + ' ' + profileData.last_name : 'Loading...' }}</h3>
                        <p>{{ profileData ? profileData.email : 'Email not available' }}</p>
                    </div>
                    <div class="profile-button">
                        <a><router-link to="/pengaturan-akun">Pengaturan akun</router-link></a>
                        <a><router-link to="/bantuan">Bantuan</router-link></a>
                        <a><router-link to="/keluar">Keluar</router-link></a>
                    </div>
                </div>
            </div>
            <div class="course-wrapper">
                <MyCourse />
                <div class="more-course-btn">
                    <button>
                        <a><router-link to="/lihat-lebih-banyak">Lihat lebih banyak</router-link></a>
                        <img src="@/assets/icon/arrow-right-orange.svg" alt="">
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
.profile {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
}

.profile-sidebar {
    width: 400px;
    height: 100%;
}

.profile-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.profile-image img {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background-color: #fff;
    margin-top: 65px;
}

.profile-text h3 {
    font-size: 24px;
    font-weight: bold;
    color: #000000;
    margin-top: 40px;
    text-align: center;
}

.profile-text p {
    font-size: 18px;
    font-weight: 400;
    color: #989686;
    margin-top: 20px;
    text-align: center;
}

.profile-button {
    width: 265px;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 127px;
}

.profile-button a {
    font-size: 18px;
    font-weight: 400;
    color: #000000;
    margin-bottom: 20px;
    text-decoration: none;
}

.course-wrapper {
    width: 1500px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.more-course-btn {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

.more-course-btn button {
    width: 260px;
    height: 75px;
    background-color: #F08A5D;
    border: none;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #FFFFFF;
}

.more-course-btn button a {
    font-size: 17px;
    font-weight: 700;
    color: #fff;
    text-decoration: none;
}

.more-course-btn button img {
    width: 45px;
    height: 45px;
    margin-left: 20px;
}

.more-course-btn button a,
.more-course-btn button img {
    transition: all 0.3s ease-in-out;
}

.more-course-btn button:hover a,
.more-course-btn button:hover img {
    color: #F08A5D;
    transform: translateX(20px);
}
</style>