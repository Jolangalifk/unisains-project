<template>
    <div>
        <div v-for="item in items" :key="item.id" @click="toggleAccordion(item.id)"
            :class="{ 'accordion-item': true, 'active': item.id === activeItem }">
            <div class="accordion-header"><p>{{ item.title }}</p></div>
            <div class="accordion-content" v-show="item.id === activeItem">
                {{ item.content }}
                <div v-if="item.additionalInfo">
                    <h4>Additional Info</h4>
                    <p>{{ item.additionalInfo }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeItem: null,
            items: [
                {
                    id: 1,
                    title: 'Modul 1 - Az', 
                    content: 'Content 1',
                    additionalInfo: 'Additional Info 1'
                },
                {
                    id: 2,
                    title: 'Modul 2 - Az',
                    content: 'Content 2',
                    additionalInfo: 'Additional Info 2'
                },
                { id: 3, title: 'Modul 3 - Az', content: 'Content 3' }
            ]
        };
    },
    methods: {
        toggleAccordion(itemId) {
            this.activeItem = this.activeItem === itemId ? null : itemId;
        }
    }
};
</script>

<style>
/* Styles remain the same */

.accordion-item {
    width: 1480px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
    border-radius: 20px;
}

.accordion-header {
    width: 100%;
    height: 100px;
    padding: 10px;
    cursor: pointer;
    background-color: #6A2C70;
    color: white;
    border-radius: 20px;
    display: flex;
    align-items: center;
}

.accordion-header p {
    margin-left: 20px;
    font-size: 24px;
    font-weight: 600;
}

.accordion-content {
    padding: 10px;
    display: none;
}

.accordion-item.active .accordion-content {
    display: block;
}
</style>
