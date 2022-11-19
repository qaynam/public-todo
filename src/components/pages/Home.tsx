import { A } from "@solidjs/router";
import { createSignal, onMount, Show } from "solid-js";
import { supabase } from "~/lib/supabase";

export type Ticket = {
  id: string;
  key: string;
  createdAt: string;
  updatedAt: string;
};

export const [tickets, setTickets] = createSignal<Ticket[]>([]);

export default function Home() {
  const getTickets = async () => {
    const ticket = await supabase.from("tickets").select("*");
    if (ticket.error) {
      console.log(ticket.error);
      return;
    }
    setTickets(ticket.data as Ticket[]);
  };
  const submitHandler = async (e: Event) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const key = target.elements.namedItem("key") as HTMLInputElement;
    const { data, error } = await supabase
      .from("tickets")
      .insert({ key: key.value });
    if (error) {
      console.log(error);
      return;
    }
    // setTickets((tickets) => [...tickets, data[0]]);
    console.log(data);
    key.value = "";
  };

  onMount(() => {
    getTickets();
  });

  return (
    <>
      <h1 class="text-center text-2xl mb-6">Public TODO</h1>
      {/* create new ticket form */}
      <form onSubmit={submitHandler} class="flex flex-row items-center mb-4">
        <input type="text" name="key" class="input-field" />
        <button type="submit" class="btn-primary">
          Create
        </button>
      </form>

      <div class="space-y-4">
        <Show when={tickets()} fallback={<div>loading...</div>}>
          {tickets().map((ticket) => (
            <div>
              <A
                href={`/todos/${ticket.key}`}
                state={{
                  todoID: ticket.id,
                }}
                class="underline cursor-pointer"
              >
                {ticket.key}
              </A>
            </div>
          ))}
        </Show>
      </div>
    </>
  );
}
