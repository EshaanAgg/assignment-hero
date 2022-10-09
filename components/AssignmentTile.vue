<template>
  <div class="single">
    <div class="thumbnail">
      <img :src="props.doc.coverUrl" />
    </div>
    <div class="info">
      <h3>{{ props.doc.title }}</h3>
      <p>Created by {{ props.doc.username }}</p>
    </div>
    <div class="doc-length">
      <p>{{ props.doc.records.length }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  doc: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.single {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background: white;
  margin: 16px 0;
  transition: all ease 0.2s;
}
.single:hover {
  box-shadow: 1px 2px 3px rgba(50, 50, 0, 0.05);
  transform: scale(1.02);
  transition: all ease 0.2s;
}
.thumbnail {
  max-width: 100px;
  max-height: 100px;
  overflow: hidden;
  border-radius: 10px;
}
img {
  max-width: 150%;
  max-height: 150%;
  display: block;
}
.info {
  margin: 0 30px;
}
.song-number {
  margin-left: auto;
}
</style>
