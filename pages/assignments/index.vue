<template>
  <div class="home">
    <div v-if="error.show" class="error">{{ error.meesage }}</div>
    <div v-else-if="assignments">
      <div v-for="doc in assignments" :key="doc[$id]">
        <NuxtLink :to="`/assignments/${doc[$id]}`">
          <AssignmentTile :doc="doc" />
        </NuxtLink>
      </div>
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
