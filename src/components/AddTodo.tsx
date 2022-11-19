import { createComputed, createSignal, onMount } from "solid-js";

type AddTodoPropd  = {
  onAdd: (title: string) => void;
}

export default function AddTodo(props: AddTodoPropd) {
  const [title, setTitle] = createSignal("");
  const [rows, setRows] = createSignal(1);
  let textAreaRef: HTMLTextAreaElement | undefined;

  const submitHandler = (e: Event) => {
    e.preventDefault();
    if (title().trim()) {
      props.onAdd(title());
      setTitle("");
    }
  };

  const shorcutHandler = (e: KeyboardEvent) => {
    if (e.key === "Enter" && e.metaKey) {
      submitHandler(e);
      textAreaRef && (textAreaRef.style.height = "auto");
    }
    if(e.key === "Enter") {
      return setRows(rows => rows++);
    }
  }

  const autoHeightHandler = () => {
    if (!textAreaRef) return;
    textAreaRef.style.height = "auto";
    textAreaRef.style.height = textAreaRef.scrollHeight + "px";
  }

  // add controll + enter shorcut to dom
  onMount(() => {
    textAreaRef?.addEventListener("keydown",shorcutHandler);
    textAreaRef?.addEventListener('input', autoHeightHandler)
  })


  return (
    <form class="flex flex-row items-center" onSubmit={submitHandler}>
      <textarea
        class="input-field"
        placeholder="Add Todo..."
        value={title()}
        rows={rows()}
        ref={textAreaRef}
        onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
      ></textarea>
      <button
        class="btn-primary"
        type="submit"
      >
        Add
      </button>
    </form>
  );
}