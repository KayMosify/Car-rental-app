import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateTimePicker = ({ value, onChange }) => {
  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={30}
      dateFormat="MMMM d, yyyy h:mm aa"
      className="w-full border border-gray-300 p-2 rounded"
      placeholderText="Select date and time"
    />
  );
};

export default DateTimePicker;
