<script>
import ModuleListView from '@/components/ModuleListView.vue';

export default {
    components: {
        ModuleListView
    },
    data() {
        return {
            moduleData: null,
            error: null
        };
    },

    methods: {
        async fetchModuleData() {
            try {
                const response = await fetch('https://admin.unisains.com/public/api/v1/module/show', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch module data: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                this.moduleData = {
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    image: data.image,
                    content: data.content
                };
            } catch (error) {
                this.error = error.message;
                console.error(error);
            }
        }
    },
    mounted() {
        this.fetchModuleData();
    },
};
</script>
<template>
    <div class="container-content-module">
        <div class="container-module">
            <div class="module-cover-container">
                <img src="../assets/img/merkurius-cover.png" alt="">
            </div>
            <h2>Planet Merkurius</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel eius ea odio, quo neque cumque nam dolore
                exercitationem tenetur. Veniam deserunt aperiam rerum dolorum natus minima tenetur cum facilis sapiente?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, exercitationem voluptatem minima
                incidunt laborum repudiandae saepe! Ipsum sint a aspernatur fugit! Perferendis vero quasi iusto voluptate.
                Eveniet quasi modi odit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus necessitatibus
                harum enim numquam. Quas voluptas veritatis assumenda perferendis temporibus, itaque quod saepe recusandae
                repudiandae facere delectus ex rem aut nesciunt? Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Natus aspernatur fuga placeat nihil, atque blanditiis cupiditate sed reiciendis doloremque nostrum sequi
                quos repellat esse velit consectetur praesentium asperiores corrupti nemo! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Vel eius ea odio, quo neque cumque nam dolore
                exercitationem tenetur. Veniam deserunt aperiam rerum dolorum natus minima tenetur cum facilis sapiente?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, exercitationem voluptatem minima
                incidunt laborum repudiandae saepe! Ipsum sint a aspernatur fugit! Perferendis vero quasi iusto voluptate.
                Eveniet quasi modi odit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus necessitatibus
                harum enim numquam. Quas voluptas veritatis assumenda perferendis temporibus, itaque quod saepe recusandae
                repudiandae facere delectus ex rem aut nesciunt? Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Natus aspernatur fuga placeat nihil, atque blanditiis cupiditate sed reiciendis doloremque nostrum sequi
                quos repellat esse velit consectetur praesentium asperiores corrupti nemo! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Vel eius ea odio, quo neque cumque nam dolore
                exercitationem tenetur. Veniam deserunt aperiam rerum dolorum natus minima tenetur cum facilis sapiente?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, exercitationem voluptatem minima
                incidunt laborum repudiandae saepe! Ipsum sint a aspernatur fugit! Perferendis vero quasi iusto voluptate.
                Eveniet quasi modi odit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus necessitatibus
                harum enim numquam. Quas voluptas veritatis assumenda perferendis temporibus, itaque quod saepe recusandae
                repudiandae facere delectus ex rem aut nesciunt? Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Natus aspernatur fuga placeat nihil, atque blanditiis cupiditate sed reiciendis doloremque nostrum sequi
                quos repellat esse velit consectetur praesentium asperiores corrupti nemo! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Vel eius ea odio, quo neque cumque nam dolore
                exercitationem tenetur. Veniam deserunt aperiam rerum dolorum natus minima tenetur cum facilis sapiente?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, exercitationem voluptatem minima
                incidunt laborum repudiandae saepe! Ipsum sint a aspernatur fugit! Perferendis vero quasi iusto voluptate.
                Eveniet quasi modi odit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus necessitatibus
                harum enim numquam. Quas voluptas veritatis assumenda perferendis temporibus, itaque quod saepe recusandae
                repudiandae facere delectus ex rem aut nesciunt? Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Natus aspernatur fuga placeat nihil, atque blanditiis cupiditate sed reiciendis doloremque nostrum sequi
                quos repellat esse velit consectetur praesentium asperiores corrupti nemo! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Vel eius ea odio, quo neque cumque nam dolore
                exercitationem tenetur. Veniam deserunt aperiam rerum dolorum natus minima tenetur cum facilis sapiente?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, exercitationem voluptatem minima
                incidunt laborum repudiandae saepe! Ipsum sint a aspernatur fugit! Perferendis vero quasi iusto voluptate.
                Eveniet quasi modi odit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus necessitatibus
                harum enim numquam. Quas voluptas veritatis assumenda perferendis temporibus, itaque quod saepe recusandae
                repudiandae facere delectus ex rem aut nesciunt? Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Natus aspernatur fuga placeat nihil, atque blanditiis cupiditate sed reiciendis doloremque nostrum sequi
                quos repellat esse velit consectetur praesentium asperiores corrupti nemo! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Vel eius ea odio, quo neque cumque nam dolore
                exercitationem tenetur. Veniam deserunt aperiam rerum dolorum natus minima tenetur cum facilis sapiente?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, exercitationem voluptatem minima
                incidunt laborum repudiandae saepe! Ipsum sint a aspernatur fugit! Perferendis vero quasi iusto voluptate.
                Eveniet quasi modi odit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus necessitatibus
                harum enim numquam. Quas voluptas veritatis assumenda perferendis temporibus, itaque quod saepe recusandae
                repudiandae facere delectus ex rem aut nesciunt? Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Natus aspernatur fuga placeat nihil, atque blanditiis cupiditate sed reiciendis doloremque nostrum sequi
                quos repellat esse velit consectetur praesentium asperiores corrupti nemo! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Vel eius ea odio, quo neque cumque nam dolore
                exercitationem tenetur. Veniam deserunt aperiam rerum dolorum natus minima tenetur cum facilis sapiente?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, exercitationem voluptatem minima
                incidunt laborum repudiandae saepe! Ipsum sint a aspernatur fugit! Perferendis vero quasi iusto voluptate.
                Eveniet quasi modi odit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus necessitatibus
                harum enim numquam. Quas voluptas veritatis assumenda perferendis temporibus, itaque quod saepe recusandae
                repudiandae facere delectus ex rem aut nesciunt? Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Natus aspernatur fuga placeat nihil, atque blanditiis cupiditate sed reiciendis doloremque nostrum sequi
                quos repellat esse velit consectetur praesentium asperiores corrupti nemo! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Vel eius ea odio, quo neque cumque nam dolore
                exercitationem tenetur. Veniam deserunt aperiam rerum dolorum natus minima tenetur cum facilis sapiente?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, exercitationem voluptatem minima
                incidunt laborum repudiandae saepe! Ipsum sint a aspernatur fugit! Perferendis vero quasi iusto voluptate.
                Eveniet quasi modi odit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus necessitatibus
                harum enim numquam. Quas voluptas veritatis assumenda perferendis temporibus, itaque quod saepe recusandae
                repudiandae facere delectus ex rem aut nesciunt? Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Natus aspernatur fuga placeat nihil, atque blanditiis cupiditate sed reiciendis doloremque nostrum sequi
                quos repellat esse velit consectetur praesentium asperiores corrupti nemo!
            </p>
            <h1>Scan Augmented Reality disini!</h1>
            <div class="content-ar-img">
                <img src="../assets/img/merkurius-ar.png" alt="">
            </div>
        </div>
        <ModuleListView />
    </div>
</template>

<style scoped>
.container-content-module {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.container-module {
    width: 1390px;
    height: 745px;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    padding: 40px 40px 40px 40px;
    overflow: auto;
}

.module-cover-container {
    width: 1300px;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    margin-bottom: 40px;
}

.container-module h1 {
    font-size: 26px;
    font-weight: 600;
    color: #000000;
    margin-top: 40px;
}

.content-ar-img {
    width: 1300px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    margin-top: 30px;
}

.content-ar-img img {
    width: 300px;
    height: 300px;
    border-radius: 20px;
    border: 1px solid #CBC8B3;
}

.module-cover-container img {
    width: 1300px;
    height: 300px;
    border-radius: 20px;
    border: 1px solid #CBC8B3;
}

.container-module h2 {
    font-size: 36px;
    font-weight: 600;
    color: #000000;
}

.container-module::-webkit-scrollbar {
    width: 10px;
}

.container-module::-webkit-scrollbar-thumb {
    background: #cccccc;
    border-radius: 10px;
}

.container-module::-webkit-scrollbar-thumb:hover {
    background: #cccccc;
}
</style>