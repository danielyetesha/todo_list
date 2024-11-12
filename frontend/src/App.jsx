import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskOverview from "./components/TaskOverview";
import Calendar from "./components/Calender";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="">
      <Header />
      <main className="p-8 bg-slate-100">
        <p className="text-4xl p-3 text-center">Hello, Amde, </p>
        <div className="flex gap-x-8 ">
          <Calendar />
          <div className="flex flex-col gap-6 flex-1">
            <TaskInput />
            <TaskList />
          </div>
        </div>
        <TaskOverview />
      </main>
    </div>
  );
}

export default App;
