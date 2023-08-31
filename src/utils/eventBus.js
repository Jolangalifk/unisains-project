// eventBus.js
import { ref } from 'vue';

export const cartCount = ref(0);
export const updateCartCount = (newCount) => {
  cartCount.value = newCount;
};

