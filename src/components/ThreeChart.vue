<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { treeChart } from '@/utils/threeChart';
import type { IHierarchy } from '@/types/dataTypes';
import NodePopup from '@/components/NodeInfoPopup.vue';

const props = defineProps<{
  data: IHierarchy;
}>();

const treeContainer = ref<HTMLElement | null>(null);

const showPopup = (name: string, description: string) => {
  popupData.name = name;
  popupData.description = description;
  popupVisible.value = true;
};

const popupData = reactive({
  name: '',
  description: ''
});

onMounted(() => {
  if (treeContainer.value) treeChart(treeContainer.value, props.data, showPopup);
});

const popupVisible = ref(false);
</script>

<template>
  <div ref="treeContainer" />
  <NodePopup
    :visible="popupVisible"
    :name="popupData.name"
    :description="popupData.description"
    @close="popupVisible = false"
  />
</template>
