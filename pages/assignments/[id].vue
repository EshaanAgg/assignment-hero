<template>
  <div>
    <div v-if="error.show" class="error">{{ error.message }}</div>
    <div v-if="document" class="assignment-details">
      <!-- Assignment Information -->
      <div class="assignment-info">
        <div class="cover">
          <img :src="document.coverUrl" />
        </div>
        <h2>{{ document.title }}</h2>
        <p class="username">Created by {{ document.username }}</p>
        <p class="description">{{ document.description }}</p>
        <button v-if="ownership" @click="handleDelete">
          Delete Assignment
        </button>
      </div>
      <!-- File List -->
      <div class="file-list">
        <p>File list here</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGlobalStore } from "@/stores/global";
import { useAssignmentStore } from "@/stores/assignment";
import { useAccountStore } from "@/stores/account";

const globalStore = useGlobalStore();
const assignmentStore = useAssignmentStore();
const accountStore = useAccountStore();

const route = useRouter();
const id = route.params.id;

const error = computed(() => globalStore.error);
const account = computed(() => accountStore.account);
const document = await assignmentStore.getAssignment(id);
const ownership = computed(() => {
  return document && account && account["$id"] === document["createdBy"];
});

const handleDelete = async () => {
  await assignmentStore.deleteAssignment(id);
  // Add code to delete the image linked to this assignment in storage
  navigateTo("/assignments");
};
</script>

<style scoped>
.assignment-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  max-width: 200%;
  max-height: 200%;
}
.assignment-info {
  text-align: center;
}
.assignment-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.assignment-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
</style>
