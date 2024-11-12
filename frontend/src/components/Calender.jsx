import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styles for the calendar

function CustomCalendar() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <div className=" bg-white p-2 w-full md:w-1/3">
      {/* Display the selected date */}
      <h2 className="text-xl font-semibold mb-2 text-red-500">
        {formatDate(date).split(",")[0]} {/* Display the weekday */}
      </h2>
      <p className="text-lg">{formatDate(date)}</p>

      {/* React Calendar component */}
      <div className="mt-4">
        <Calendar
          onChange={handleDateChange}
          value={date}
          className="react-calendar"
        />
      </div>
    </div>
  );
}

export default CustomCalendar;
