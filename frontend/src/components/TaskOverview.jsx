function TaskOverview() {
  return (
    <div className="flex gap-6">
      <div
        className="flex gap-6
      "
      >
        <OverviewCard title="Completed Tasks" value="04" />
        <OverviewCard title="Pending Tasks" value="15" />
      </div>
      <div className="p-4 bg-gray-200 rounded-lg shadow-md flex-1 flex items-center justify-center">
        <div>
          <p className="text-lg font-semibold">Tasks Created</p>
          <p className="text-3xl font-bold">1,500</p>
        </div>
        <p className="text-blue-500 text-sm mt-2">25k+ Active Users</p>
      </div>
    </div>
  );
}

export default TaskOverview;

function OverviewCard({ title, value, icon }) {
  return (
    <div className="p-4 bg-gray-300 rounded-lg shadow-md flex flex-col items-center justify-center size-30">
      <p className="text-lg font-semibold text-wrap">{title}</p>
      <p className="text-6xl font-bold">{value}</p>
    </div>
  );
}
