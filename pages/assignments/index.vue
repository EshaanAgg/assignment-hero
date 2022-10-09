<template>
  <div class="home">
    <div v-if="error.show" class="error">{{ error.meesage }}</div>
    <div v-else-if="assignments">
      <AssignmentTile v-for="doc in assignments" :key="doc[$id]" :doc="doc" />
    </div>
    <div v-else>There no created assignment groups. Add one!</div>
  </div>
</template>

<script setup>
import { useAssignmentStore } from "@/stores/assignment";
import { useGlobalStore } from "@/stores/global";

const assignmentStore = useAssignmentStore();
const globalStore = useGlobalStore();

const assignments = computed(() => assignmentStore.assignments);
const error = computed(() => globalStore.error);
await assignmentStore.fetchAssignments();
</script>
