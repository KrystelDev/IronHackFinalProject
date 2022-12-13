<template>
  <div>
    <p>Titule: {{ task.title }}</p>
    <p>Description: {{ task.description }}</p>
    <div v-show="editTask">
      <input type="text" v-model="title" />
      <input type="text" v-model="description" />
      <button @click="changeTask">Save</button>
    </div>
    <label class="switch">
      <input
        type="checkbox"
        @click="changeComplete"
        v-model="task.is_complete"
      />
      <span class="slider round"></span>
    </label>
    <button @click="deleteTask">Delete {{ task.title }}</button>
    <button @click="changeEdit">Edit</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";

let title = ref(props.task.title);
let description = ref(props.task.description);
let editTask = ref(false);

const changeEdit = () => {
  editTask.value = !editTask.value;
};

const taskStore = useTaskStore();

const props = defineProps({
  task: Object,
});

// Función para borrar la tarea a través de la store. El problema que tendremos aquí (y en NewTask.vue) es que cuando modifiquemos la base de datos los cambios no se verán reflejados en el v-for de Home.vue porque no estamos modificando la variable tasks guardada en Home. Usad el emit para cambiar esto y evitar ningún page refresh.
const emit = defineEmits(["deleteTask", "changeComplete", "changeTask"]);

const deleteTask = async () => {
  await taskStore.deleteTask(props.task.id);
  emit("deleteTask");
};

const changeComplete = async () => {
  await taskStore.changeComplete(props.task.id, props.task.is_complete);
  // emit("changeComplete");
};

const changeTask = async () => {
  changeEdit();
  await taskStore.changeTask(title.value, description.value, props.task.id);
  emit("changeTask");
};
</script>

<style></style>
