<template>
  <h1 class="tituloNew">Add a new Task</h1>
  <div class="addTaskAll onlyMobile">
    <div class="dentroPuzzleAddTaskAll">
      <div v-if="showErrorMessage">
        <p class="error-text">{{ errorMessage }}</p>
      </div>
      <input type="text" placeholder="Titulo" v-model="name" />
      <input type="text" placeholder="Descripción..." v-model="description" />
      <button @click="addTask">+</button>
    </div>
  </div>
  <section class="notMobile addTaskPC">
    <section class="addHome">
      <div v-if="showErrorMessage">
        <p class="error-text">{{ errorMessage }}</p>
      </div>
      <div v-if="showCorrectMessage">
        <p class="error-text">{{ correctMessage }}</p>
      </div>
    </section>
    <div class="addTaskPcInputs addTaskPcInputsTaks">
      <input type="text" placeholder="Título" v-model="name" />
      <input type="text" placeholder="Descripción..." v-model="description" />
      <div class="addTaskButton">
        <button @click="addTask">+ Add Taks</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";

const taskStore = useTaskStore();

// variables para los valors de los inputs
const name = ref("");
const description = ref("");

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);
const showCorrectMessage = ref(false);

// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);
const correctMessage = ref(null);

const emit = defineEmits(["getTasks"]);

// Arrow function para crear tareas.
const addTask = async () => {
  if (name.value.length === 0 || description.value.length === 0) {
    // Primero comprobamos que ningún campo del input esté vacío y lanzamos el error con un timeout para informar al user.

    showErrorMessage.value = true;
    errorMessage.value = "The task title or description is empty";
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 5000);
  } else {
    // Aquí mandamos los valores a la store para crear la nueva Task. Esta parte de la función tenéis que refactorizarla para que funcione con emit y el addTask del store se llame desde Home.vue.
    // Emit -> es un evento para pasar info del hijo al onlyMobile.
    // El hijo -> NewTask
    // El onlyMobile -> Home
    await taskStore.addTask(name.value, description.value);
    name.value = "";
    description.value = "";
    showCorrectMessage.value = true;
    correctMessage.value = "Hemos registrado tu nueva tarea!";
    emit("getTasks");
    setTimeout(() => {
      showErrorMessage.value = false;
      showCorrectMessage.value = false;
    }, 3000);
  }
};
</script>

<style></style>
