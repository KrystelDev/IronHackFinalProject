import { defineStore } from "pinia";
import { supabase } from "../supabase";
export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    profile: null,
  }),
  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      if (user) {
        this.user = user;
        console.log("cargo perfil del usuario");
        console.log(this.user.id);
        const { data: profile } = await supabase
          .from("profile")
          .select("*")
          .eq("user_id", this.user.id);
        // .match({ user_id: this.user.id });
        console.log("Perfil del usuario: ");
        console.log(profile);
        if (profile) this.profile = profile[0];

        // Funciona, pero no se espera a imprimir despues de que se haya creado
        // console.log("user in store: ", this.user);
        // console.log("profile in store: ", this.profile);
      }
    },

    /*
      let patata -> número, texto, lo que sea.
      public int patata -> solo puede ser un número que vaya desde -2.147.483.648M +2.147.483.647M
      int 8? -> La cantidad de memoria reservada para el número. 
      int 1 -> -255 a 255
      int 2 -> -32768 a +32767
      int 4 -> -2147483648 a 2.147.483.647
      int 8 -> -9223372036854775808 a 9.223.372.036.854.775.807

      function randonaiser(stampTime){
         const private string newSubName = createNewSubname(Math.random(stampTime));
         createNewUser(newSubName); =====> {
          primero hace el insert
          si tiene éxito vuelve
          si no tiene éxito redamdoniza. Función recursiva
          máximo número de intentos = 20.
         }
      }
    */

    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        console.log(this.user);
        const { data: profile } = await supabase.from("profile").insert([
          {
            user_id: this.user.id,
            email: email,
          },
        ]);
      }
    },

    async signIn(email, password) {
      console.log("entrando...");
      const { user, error } = await supabase.auth.signIn(
        {
          email: email,
          password: password,
        },
        {
          shouldCreateUser: false,
        }
      );
      if (error) {
        throw error;
        alert("Check your email for the login link!");
      }
      if (user) {
        this.user = user;
        const { data: profile } = await supabase
          .from("profile")
          .select()
          .match({ user_id: this.user.id });
        if (profile) this.profile = profile[0];
        console.log("profile in store: ", profile);
      }
    },

    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});
