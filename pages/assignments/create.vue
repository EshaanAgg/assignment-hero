<script setup>
import { useAssignmentStore } from "@/stores/assignment";
import { useGlobalStore } from "@stores/global";
import { useAccountStore } from "@stores/account";
import { useAccountStore } from "../../stores/account";

const globalStore = useGlobalStore();
const accountStore = useAccountStore();

const title = ref("");
const description = ref("");
const file = ref(null);
const fileError = ref(null);
const error = computed(() => globalStore.error);
const isPending = ref(false);
const allowedTypes = ["image/png", "image/jpeg"];

const handleChange = (e) => {
  const selected = e.target.files[0];

  if (selected && allowedTypes.includes(selected.type)) {
    file.value = selected;
    fileError.value = null;
  } else {
    file.value = null;
    fileError.value = "Please select an image file (png or jpg).";
  }
};
const handleSubmit = async (e) => {
  isPending.value = true;
  e.preventDefault();
  // Add logic to upload the file to the cloud, store it in "covers\user_uid\filename"
  // Get download link from the storage, right now we are using a dummy one
  const downloadLink = "";
  const data = {
    title: title.value,
    description: description.value,
    coverUrl: downloadLink,
    filePath: filePath.value,
    records: [],
    username: accountStore.account.name,
    createdAt: timestamp(),
  };
  const assignmentStore = useAssignmentStore();
  await assignmentStore.addAssignment(data);
  isPending.value = false;
};
</script>
<template>
  <form>
    <h4>Create New Assignment</h4>
    <label for="title">Title</label>
    <input
      type="text"
      required
      placeholder="What should we call this assignment group?"
      v-model="title"
      id="title"
      name="title"
    />
    <label for="description">Description</label>
    <textarea
      type="text"
      required
      placeholder="Tell me a bit more about this"
      v-model="description"
      id="description"
      name="description"
    />
    <label for="cover">Cover Image</label>
    <input type="file" id="cover" name="cover" @change="handleChange" />
    <div class="error" v-if="fileError || error.show">
      {{ (fileError, error.message) }}
    </div>
    <button
      v-if="!isPending"
      @click="handleSubmit"
      :disabled="!title || !description || fileError"
    >
      Create
    </button>
    <button v-if="isPending" disabled>Saving...</button>
  </form>
</template>

<style>
input[type="file"] {
  border: 0;
  padding: 0;
}
button {
  margin-top: 20px;
}
</style>
