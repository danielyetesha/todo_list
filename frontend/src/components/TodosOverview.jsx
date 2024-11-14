import { useState } from "react";
import { useTodos } from "../hooks/useTodo";

function TodosOverview() {
  const { data: todos, isLoading, error, isFetching, refetch } = useTodos();
  // const { data: todos } = useTodos();
  // console.log(todos);
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);

  // while (todos?.data.length > 0) {
  //   if (todos?.data[0].completed) {
  //     setCompleted((prev) => prev + 1);
  //   } else {
  //     setPending((prev) => prev + 1);
  //   }
  // }

  return (
    <div className="flex gap-6 mt-5 p-4 px">
      <OverviewCard title="Completed Tasks" value="04" />
      <OverviewCard title="Pending Tasks" value="15" />

      <div className="p-4  bg-gray-200 rounded-lg shadow-md flex-1 flex items-center justify-center">
        <div>
          <p className="text-lg font-semibold">Tasks Created</p>
          <p className="text-3xl font-bold text-center">{todos?.total}</p>
        </div>
        <p className="text-blue-500 text-sm mt-2 self-end">25k+ Active Users</p>
      </div>
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
