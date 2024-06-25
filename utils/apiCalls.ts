import axios from "axios";
import { store as todoStore } from "redux/store.js";
import { api } from "backend/api";

type optionsType = {
  type: "tasks" | "done-tasks" | "all";
};

export async function fetchData(options: optionsType) {
  if (options.type === "tasks" || options.type === "all") {
    const tasksResponse = await axios.get(`${api.baseUrl}/tasks`);
    todoStore.dispatch({ type: "todo/fetchTask", payload: tasksResponse.data });
  } else if (options.type === "done-tasks" || options.type === "all") {
    const doneTasksResponse = await axios.get(`${api.baseUrl}/done-tasks`);
    todoStore.dispatch({
      type: "todo/fetchDoneTask",
      payload: doneTasksResponse.data,
    });
  }
}
