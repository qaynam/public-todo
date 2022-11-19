import { useLocation, useNavigate, useParams } from "@solidjs/router";
import { createMemo, createSignal, onError, onMount } from "solid-js";
import { supabase } from "~/lib/supabase";
import AddTodo from "../AddTodo";
import BackButton from "../BackButton";
import ClipBoard from "../ClipBoard";
import { LeftArrowIcon } from "../icons/LeftArrowIcon";
import TodoItem from "../TodoItem";
import { Ticket } from "./Home";

export type Todo = {
  id: string;
  title: string;
  status: "uncompleted" | "completed" | "progress";
  createdAt: string;
  updatedAt: string;
};

export default function Todo() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation<{
    ticketID: string;
  }>();
  const [todos, setTodos] = createSignal<Todo[]>([]);
  const [processing, setProcessing] = createSignal(true);
  const [currentTicket, setCurrentTicket] = createSignal<Ticket>();
  const todoToggleHandler = async (id: string) => {
    setProcessing(true);
    const nextStatus =
      todos().find((todo) => todo.id === id)?.status === "completed"
        ? "uncompleted"
        : "completed";
    const { data, error } = await supabase
      .from("todos")
      .update({
        status: nextStatus,
      })
      .match({ id });

    if (error) {
      console.log(error);
      return;
    }

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            status: nextStatus,
          };
        }
        return todo;
      })
    );

    setProcessing(false);
  };
  const getCurrentTicket = async () => {
    if (location.state?.ticketID) {
      return location.state.ticketID;
    }
    const ticket = await supabase
      .from("tickets")
      .select("*")
      .eq("key", params.ticketKey);

    if (ticket.error) {
      console.log(ticket.error);
      return;
    }

    if (ticket.data.length === 0) {
      navigate("/notfound");
      return;
    }

    setCurrentTicket(ticket.data[0] as Ticket);
  };
  const addTodoHandler = async (title: string) => {
    const { data, error } = await supabase
      .from("todos")
      .insert({
        title,
        status: "uncompleted",
        ticketID: currentTicket()?.key,
      })
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    setTodos((todos) => [...todos, data[0]]);
  };
  const getTodos = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("ticketID", currentTicket()?.key)
      .order("createdAt", { ascending: true });
    if (error) {
      console.log(error);
      navigate("/");
      return;
    }
    setTodos(data);
  };

  onMount(async () => {
    await getCurrentTicket();
    await getTodos();
    setProcessing(false);
  });

  onError((err) => {
    console.log(err);
  });

  if (!params.ticketKey) {
    navigate("/notfound", {
      replace: true,
    });
    return null;
  }

  return (
    <>
      <BackButton />
      <div class=" max-w-lg mx-auto space-y-4">
        <div class="text-xl text-neutral-300 font-bold">
          <ClipBoard text={currentTicket()?.key ?? ""} />
        </div>
        <fieldset class="space-y-4">
          <AddTodo onAdd={addTodoHandler} />
          <ul class="max-w-lg text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white">
            {todos().map((todo) => (
              <TodoItem onToggle={todoToggleHandler} todo={todo} />
            ))}
          </ul>
        </fieldset>
      </div>
    </>
  );
}
