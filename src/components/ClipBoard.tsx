import { createEffect, createSignal } from "solid-js";
import { CopiedIcon } from "./icons/CopiedIcon";
import { CopyIcon } from "./icons/CopyIcon";

type ClipBoardProps = {
  text: string;
};

export default function ClipBoard(props: ClipBoardProps) {
  const [copied, setCopied] = createSignal(false);
  const copyHandler = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(props.text).catch((err) => {
        console.log(err);
        alert("クリップボードへのコピーに失敗しました。");
      });
      setCopied(true);
    } else {
      alert("Clipboard API not supported");
    }
  };

  createEffect(() => {
    if (copied()) {
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  });

  return (
      <pre class="inline-block ml-3">
        <code class="flex flex-row items-center">
          <span>{props.text}</span>
          <span class="text-sm ml-2 cursor-pointer  " onclick={copyHandler}>
            {!copied() ? (
              CopyIcon
            ) : (
              <span class="flex flex-row items-center">
                <span>{CopiedIcon}</span>
                <span class="text-xs text-neutral-500">copied</span>
              </span>
            )}
          </span>
        </code>
      </pre>
  );
}
