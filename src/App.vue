<script setup lang="ts">
import { ref } from 'vue';
import { createHierarchy } from '@/utils/createHierarchy';
import mockData from '@/mockData/mockData.json';
import TreeChart from '@/components/ThreeChart.vue';
import type { IHierarchy } from '@/types/dataTypes';

const data = ref(mockData.data);
const hierarchicalData: IHierarchy = createHierarchy(data.value);
</script>

<template>
  <div class="app">
    <h2>Data Chart</h2>
    <TreeChart :data="hierarchicalData" />
  </div>
</template>

<style scoped>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
