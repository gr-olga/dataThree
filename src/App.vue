<script setup lang="ts">
import {ref} from 'vue';
import {createHierarchy} from '@/utils/createHierarchy';
import mockData from '@/mockData/mockData.json';

const data = ref(mockData.data);
const hierarchicalData = createHierarchy(data.value);
console.log(hierarchicalData);

</script>

<template>
  <div>
    <h2>Data Chart</h2>
  </div>
</template>

<style scoped>

</style>
