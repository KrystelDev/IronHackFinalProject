<template>
  <div class="wrapper">
    <h1 class="header-description">Conectarse</h1>
    <p>Este puzzle no se va a montar solo.</p>

    <div class="addTaskAll">
      <form @submit.prevent="signIn" class="dentroPuzzleAddTaskAll from">
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
        <button id="button" type="submit">Entrar</button>
      </form>
    </div>
    <p class="personalRouter">
      Have an account?
      <PersonalRouter
        :route="route"
        :buttonText="buttonText"
        class="sign-up-link"
        @click="signIn()"
      />
    </p>
    <div v-show="errorMsg">{{ errorMsg }}</div>
    <div class="onlyMobile positionBottom">
      <nav class="footerSing"></nav>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// iniciar Variables
const route = "/auth/signup";
const buttonText = "Sign Up";
const email = ref("");
const password = ref("");
const redirect = useRouter();
const errorMsg = ref("");

// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    await useUserStore().signIn(email.value, password.value);
    redirect.push({ path: "/" });
  } catch (error) {
    errorMsg.value = error.message;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
    return;
  }
  errorMsg.value = "error";
};
</script>

<style></style>
