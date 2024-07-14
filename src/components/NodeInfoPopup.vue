<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

const props = defineProps<{
  visible: boolean
  name: string
  description: string
}>()

const emit = defineEmits(['close'])

const closePopup = () => {
  emit('close')
}
</script>
<template>
  <div v-if="visible" class="popup">
    <div class="popup-content">
      <h3>{{ props.name }}</h3>
      <p>{{ props.description }}</p>
      <button @click="closePopup">Close</button>
    </div>
  </div>
</template>

<style scoped>
.popup {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: #333;
}
</style>
