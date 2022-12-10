<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/tasks">Task Manager</router-link>

    <div>
      <ul>
        <li>
          <p>Welcome,</p>
          <router-link to="/account">{{ props.username }}</router-link>
        </li>
        <li>
          <button @click="signOut({ getUser })">Log out</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";

const props = defineProps({
  username: String,
});

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

// Arrow function to Signin user to supaBase
async function signOut() {
  await useUserStore().signOut();
  redirect.push({ path: "/auth/login" });
}
</script>

<style>
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
