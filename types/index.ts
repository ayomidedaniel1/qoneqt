export type Todo = {
  id: string;
  title: string;
  done: boolean;
};

export type TodoStore = {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, newTitle: string) => void;
};

export type TodoItemProps = {
  item: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
};