<template>
  <div>
    <p>Titule: {{ task.title }}</p>
    <p>Description: {{ task.description }}</p>
    <div v-show="editTask" class="editable">
      <input type="text" v-model="title" />
      <input type="text" v-model="description" />
      <button @click="changeTask" class="btn-save">
        <Icon icon="iconoir:save-floppy-disk" :class="siSave"></Icon>
        <Icon icon="iconoir:save-action-floppy" :class="awaitSave"></Icon>
      </button>
    </div>
    <label class="switch">
      <input
        type="checkbox"
        @click="changeComplete"
        v-model="task.is_complete"
      />
      <span class="slider round"></span>
    </label>
    <button @click="deleteTask" class="btn-delete">
      <Icon icon="mdi:delete" :class="siNo"></Icon>
      <Icon icon="mdi:delete-empty" :class="noSi"></Icon>
    </button>

    <button @click="changeEdit" class="btn-edit">
      <Icon icon="typcn:edit" class="edit"></Icon>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";

import { Icon } from "@iconify/vue";

let title = ref(props.task.title);
let description = ref(props.task.description);
let editTask = ref(false);

//clase Trash
let siNo = ref("siVer");
let noSi = ref("noVer");

const cliskTrash = () => {
  siNo.value = "noVer";
  noSi.value = "siVer";
  setTimeout(() => {
    siNo.value = "siVer";
    noSi.value = "noVer";
  }, 2000);
};

//Clase Save
let siSave = ref("siSave");
let awaitSave = ref("noVer");

const clickSave = () => {
  siSave.value = "noVer";
  awaitSave.value = "siSave";
  setTimeout(() => {
    siSave.value = "siSave";
    awaitSave.value = "noVer";
  }, 2000);
};

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
  cliskTrash();
  await taskStore.deleteTask(props.task.id);
  emit("deleteTask");
};

const changeComplete = async () => {
  await taskStore.changeComplete(props.task.id, props.task.is_complete);
  emit("changeComplete");
};

const changeTask = async () => {
  clickSave();
  setTimeout(() => {
    changeEdit();
  }, 1000);
  await taskStore.changeTask(title.value, description.value, props.task.id);
  emit("changeTask");
};
</script>

<style></style>
