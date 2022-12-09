// import { defineStore } from "pinia";
// import { supabase } from "../supabase";
// import { useUserStore } from "./user";

// export const useProfilesStore = defineStore("profiles", {
//   state: () => ({
//     profile: null,
//   }),
//   actions: {
//     async fetchProfile() {
//       const { data: profile } = await supabase
//         .from("profiles")
//         .select("*")
//         .match({ user_id: useUserStore().user.id });
//       if (profile != null) this.profile = profile;
//       return this.profile[0];
//     },

//     async changeProfiles(username, avatar_url, id) {
//       console.log("¿Qué haces llamándome? Te reviento");
//       const { data, error } = await supabase
//         .from("perfiles")
//         .update({
//           username: username,
//           avatar_url: avatar_url,
//         })
//         .match({
//           user_id: id,
//         });
//     },
//   },
// });
