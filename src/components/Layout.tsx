import { Outlet } from "@solidjs/router";

export function PageLayout() {
  return (
    <div class="bg-neutral-900 min-h-screen min-w-screen text-neutral-300">
      <main class="max-w-lg mx-auto pt-10">
        <Outlet />
      </main>
    </div>
  );
}