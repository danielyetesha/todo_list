import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import TodosOverview from "./components/TodosOverview";
import TodosList from "./components/TodoList";
import Calendar from "./components/Calender";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="font-sans bg-gray-50 min-h-screen">
        {/* Header Section */}
        <Header />

        {/* Main Content Area */}
        <main className="p-8 bg-slate-100 min-h-screen">
          <div className="max-w-7xl mx-auto">
            {/* Greeting Section */}
            <p className="text-4xl font-semibold text-gray-800 mb-6 text-center">
              Hello, Amde 👋
            </p>
            <p className="text-lg text-center text-gray-600 mb-8">
              Keep track of your tasks and stay organized with your personal
              to-do list!
            </p>

            <div className="flex gap-x-8 mt-3">
              {/* Calendar Section */}
              <Calendar />

              {/* Todo List Section */}
              <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
                <TodosList />
              </div>
            </div>
          </div>
        </main>

        {/* Overview Section */}
        <div className="bg-gray-200 py-6">
          <div className="max-w-7xl mx-auto">
            <TodosOverview />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
