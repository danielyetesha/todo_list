import { useState, useEffect } from "react";
import { useTodos } from "../hooks/useTodo";

function TodosOverview() {
  const { data: todos, isLoading, error, isFetching, refetch } = useTodos();
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);

  useEffect(() => {
    if (todos?.data) {
      const completedCount = todos.data.filter(todo => todo.completed).length;
      const pendingCount = todos.data.filter(todo => !todo.completed).length;
      setCompleted(completedCount);
      setPending(pendingCount);
    }
  }, [todos]);

  return (
    <div className="flex gap-6 mt-5 p-4">
      <OverviewCard title="Completed Tasks" value={completed} />
      <OverviewCard title="Pending Tasks" value={pending} />
    </div>
  );
}

export default TodosOverview;


function OverviewCard({ title, value }) {
  return (
    <div className="p-4 bg-gray-300 rounded-lg shadow-md flex flex-col items-center justify-center size-30">
      <p className="text-lg font-semibold text-wrap">{title}</p>
      <p className="text-6xl font-bold">{value}</p>
    </div>
  );
}


