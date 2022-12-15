<template>
  <nav class="footerMobile">
    <router-link to="/">Home</router-link>
    <router-link to="/tasks">Tascas</router-link>
    <router-link to="/account">{{ props.username }}</router-link>
    <button @click="signOut()">
      <img src="../assets/img/cerrarSesion.png" alt="" />
    </button>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useUserStore } from "../stores/user";

const props = defineProps({
  username: String,
});
// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

// Arrow function to Signout user to supaBase
const signOut = async () => {
  try {
    // calls the user store and send the users info to backend to logOut
    await useUserStore().signOut();
    // redirects user to the singup
    redirect.push({ path: "/auth/login" });
  } catch (error) {
    // displays error message
    errorMsg.value = error.message;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
  return;
};
</script>

<style>
/* nav {
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
} */
</style>
