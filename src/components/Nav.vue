<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/tasks">Task Manager</router-link>

    <div>
      <ul>
        <li class="log-out-welcome">
          <p>Welcome, {{ getUser.email }}</p>
          <router-link to="/account">Perfil</router-link>
        </li>
        <li>
          <button @click="signOut({ getUser })" class="button">Log out</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

//constant to save a variable that will hold the use router method
const route = "/";
const buttonText = "Todo app";

// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);
const getUser = useUserStore().user;
// const getName = getUser.perfile.username;

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

// Arrow function to Signin user to supaBase
async function signOut() {
  await useUserStore().signOut();
  redirect.push({ path: "/auth/login" });
}
</script>

<style>
.navbar-img {
  width: 90px;
}

nav {
  background-color: lightgray;
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}

nav ul {
  list-style: none;
  padding-inline-start: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
