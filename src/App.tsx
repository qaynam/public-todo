import { Route, Routes } from "@solidjs/router";
import type { Component } from "solid-js";
import { PageLayout } from "./components/Layout";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import Todo from "./components/pages/Todo";

const App: Component = () => {
  return (
    <Routes>
      <Route path="/" component={PageLayout}>
        <Route path="/" component={Home} />
        <Route path="/todos/:ticketKey" component={Todo} />
        <Route path="/notfound" component={NotFound} />
        <Route path="*" component={NotFound} />
      </Route>
    </Routes>
  );
};

export default App;
