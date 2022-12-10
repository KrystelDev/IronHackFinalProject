<template>
  <h2>Tus tareas pendientes:</h2>
  {{ props.tasks }}
</template>
<script setup>
const props = defineProps({
  tasks: Object,
});
</script>
<style></style>
