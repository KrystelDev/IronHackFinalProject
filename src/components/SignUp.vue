<template>
  <div class="wrapper">
    <h1 class="header-description">Registrarse</h1>
    <p>La pieza clave es la organización</p>

    <div class="addTaskAll">
      <form @submit.prevent="signUp" class="dentroPuzzleAddTaskAll from">
        <input
          type="email"
          class="input-field"
          placeholder="example@gmail.com"
          id="email"
          v-model="email"
          required
        />
        <input
          type="password"
          class="input-field"
          placeholder="**********"
          id="password"
          v-model="password"
          required
        />
        <input
          type="password"
          class="input-field"
          placeholder="**********"
          id="confirmPassword"
          v-model="confirmPassword"
          required
        />
        <button id="button" type="submit">Registrarte</button>
      </form>
    </div>
    <p class="personalRouter">
      Have an account?
      <PersonalRouter
        :route="route"
        :buttonText="buttonText"
        class="sign-up-link"
      />
    </p>

    <div v-show="errorMsg">{{ errorMsg }}</div>
    <div class="onlyMobile positionBottom">
      <nav class="footerSing"></nav>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

// Route Variables
const route = "/auth/login";
const buttonText = "Sign In";

// Input Fields
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Error Message
const errorMsg = ref("");

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      // calls the user store and send the users info to backend to logIn
      await useUserStore().signUp(email.value, password.value);
      // redirects user to the homeView
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
  }
  errorMsg.value = "error";
};
</script>

<style></style>
