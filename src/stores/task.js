import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("is_complete", { ascending: true })
        .order("id", { ascending: true });
      this.tasks = tasks;
      return this.tasks;
    },
    async addTask(title, description) {
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
        },
      ]);
    },

    async deleteTask(id) {
      const { data, error } = await supabase.from("tasks").delete().match({
        id: id,
      });
    },

    // async getComplete(id) {
    //   const { data, error } = await supabase
    //     .from("tasks")
    //     .select("is_complete")
    //     .match({ id: id });

    //   return data[0].is_complete;
    // },

    async changeComplete(id, isComplete) {
      const { data, error } = await supabase
        .from("tasks")
        .update({
          is_complete: !isComplete,
        })
        .match({
          id: id,
        });
    },

    async changeTask(title, description, id) {
      const { data, error } = await supabase
        .from("tasks")
        .update({
          title: title,
          description: description,
        })
        .match({
          id: id,
        });
    },
  },
});
