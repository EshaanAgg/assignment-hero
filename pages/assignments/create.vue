<script setup>
const title = ref("");
const description = ref("");
const file = ref(null);
const fileError = ref(null);
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
const handleSubmit = async () => {
  // Logic goes here
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
    <div class="error" v-if="fileError">{{ fileError }}</div>
    <button
      @click="handleSubmit"
      :disabled="!title || !description || fileError"
    >
      Create
    </button>
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
