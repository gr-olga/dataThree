<script setup lang="ts">
import {ref} from 'vue';
import {createHierarchy} from '@/utils/createHierarchy';
import mockData from '@/mockData/mockData.json';
import TreeChart from '@/components/ThreeChart.vue';

const data = ref(mockData.data);
const hierarchicalData = createHierarchy(data.value);
</script>

<template>
  <div>
    <h2>Data Chart</h2>
    <TreeChart :data="hierarchicalData"/>
  </div>
</template>

<style scoped>

</style>
