import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import TodosOverview from "./components/TodosOverview";
import Calendar from "./components/Calender";
import TodosList from "./components/TodoList";
import { useEffect } from "react";
import { fetchCSRFToken } from "./api/todosApi";

const queryClient = new QueryClient();

function App() {
  // useEffect(() => {
  //   // Fetch CSRF token on app load
  //   fetchCSRFToken();
  // }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="">
        <Header />
        <main className="p-8 bg-slate-100">
          <p className="text-4xl p-3 text-center w-full">Hello, Amde, </p>
          <div className="flex gap-x-8 mt-3">
            <Calendar />
            <div className="flex flex-col gap-6 flex-1">
              <TodosList />
            </div>
          </div>
        </main>
        <TodosOverview />
      </div>
    </QueryClientProvider>
  );
}

export default App;
