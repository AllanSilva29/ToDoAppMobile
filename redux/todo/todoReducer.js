const INITIAL_STATE = {
  todos: [],
  doneTodos: [],
  refreshButton: false,
  appTheme: "dark",
};

const todoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "todo/addTask":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case "todo/fetchTask":
      return {
        ...state,
        todos: action.payload,
      };

    case "todo/updateTask":
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload) {
            todo.description = action.payload.description;
          }
        }),
      };

    case "todo/deleteTask":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case "todo/addDoneTask":
      return {
        ...state,
        doneTodos: [...state.doneTodos, action.payload],
      };

    case "todo/fetchDoneTask":
      return {
        ...state,
        doneTodos: action.payload,
      };

    case "todo/updateDoneTask":
      return {
        ...state,
        doneTodos: state.doneTodos.map((todo) => {
          if (todo.id === action.payload) {
            todo.description = action.payload.description;
          }
        }),
      };

    case "todo/deleteDoneTask":
      return {
        ...state,
        doneTodos: state.doneTodos.filter((todo) => todo.id !== action.payload),
      };
    case "todo/refreshButtonTask":
      return {
        ...state,
        refreshButton: action.payload.refreshButton,
      };
    case "todo/setTheme":
      return {
        ...state,
        appTheme: action.payload,
      };
    default:
      return state;
  }
};

export default todoReducer;
