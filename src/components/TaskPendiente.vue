<template>
  <div class="taskPendiente">
    <h3>{{ props.taskPendienteActive.title }}</h3>
    <h5>{{ props.taskPendienteActive.description }}</h5>
  </div>
</template>
<script setup>
import { ref } from "vue";

// NO AUTOREFRESH
import { useTaskStore } from "../stores/task";
const taskStore = useTaskStore();
// Variable para guardar las tareas de supabase
const tasks = ref([]);
// let taskTitle = ref("");
// let taskDescription = ref("");

// Creamos una función que conecte a la store para conseguir las tareas de supabase y trabajar con ellas:
const getTasks = async () => {
  tasks.value = await taskStore.fetchTasks();
  if (props.taskPendienteActive) {
    props.taskPendienteActive = tasks[0];
  }
};
getTasks();

// // NO AUTOREFRESH
const props = defineProps({
  taskPendienteActive: Object,
});
</script>

<style></style>
