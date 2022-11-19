import { Todo } from "./pages/Todo";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
};

export default function TodoItem(props: TodoItemProps) {
  const completed = props.todo.status === "completed";

  return (
    <li class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
      <div class="flex items-center pl-3">
        <input
          id={`todo-${props.todo.id}`}
          type="checkbox"
          name="todo"
          onChange={() => props.onToggle(props.todo.id)}
          checked={completed}
          value={props.todo.title}
          class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
        />
        <label
          for={`todo-${props.todo.id}`}
          class={`py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300 ${
            completed ? "line-through" : ""
          }`}
        >
          {props.todo.title}
        </label>
      </div>
    </li>
  );
}
