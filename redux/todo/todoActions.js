// Isso aqui é só outra maneira de chamar as actions, não ta sendo usado no projeto.

export const addTask = (data) => ({
  type: "todo/addTask",
  payload: data,
});

export const fetchTasks = (data) => ({
  type: "todo/fetchTask",
  payload: data,
});

export const deleteTasks = (task) => ({
  type: "todo/deleteTask",
  payload: task,
});

export const updateTasks = (task) => ({
  type: "todo/updateTask",
  payload: task,
});

export const addDoneTask = (data) => ({
  type: "todo/addDoneTask",
  payload: data,
});

export const fetchDoneTasks = (data) => ({
  type: "todo/fetchDoneTask",
  payload: data,
});

export const deleteDoneTasks = (task) => ({
  type: "todo/deleteDoneTask",
  payload: task,
});

export const updateDoneTasks = (task) => ({
  type: "todo/updateDoneTask",
  payload: task,
});

export const refreshButtonTasks = (active) => ({
  type: "todo/refreshButtonTask",
  payload: active,
});

export const refreshButtonDoneTasks = (active) => ({
  type: "todo/refreshButtonDoneTask",
  payload: active,
});

export const setTheme = (theme) => ({
  type: "todo/setTheme",
  payload: theme,
});
