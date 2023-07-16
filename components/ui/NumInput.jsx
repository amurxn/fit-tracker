import React, { useState, useEffect } from "react";

function NumInput({ label, savedValue, onChange }) {
  const [value, setValue] = useState(savedValue);

  useEffect(() => {
    setValue(savedValue);
  }, [savedValue, onChange]);

  const handleIncrease = () => {
    const incrementedValue = value + 1;
    setValue(incrementedValue);
    onChange(incrementedValue); // Invoke the onChange function with the updated value
  };

  const handleDecrease = () => {
    if (value > 0) {
      const decrementedValue = value - 1;
      setValue(decrementedValue);
      onChange(decrementedValue); // Invoke the onChange function with the updated value
    }
  };

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setValue(newValue);
    onChange(newValue); // Invoke the onChange function with the updated value
  };

  return (
    <div className="relative w-[187px]">
      <div className="absolute left-[17px] top-[4px] text-lightGray text-sm">
        {label}
      </div>
      <input
        type="number"
        className="w-full pl-4 pr-4 py-2 pt-[20px] rounded-[10px] leading-5 bg-darkGray text-white focus:outline-none h-[60px] text-2xl font-bold"
        value={value}
        onChange={handleChange} // Use handleChange for input change event
      />
      <div className="absolute inset-y-0 right-0 flex flex-col items-center justify-between">
        <button
          type="button"
          className="text-gray-500 focus:outline-none focus:text-red p-[3px]"
          onClick={handleIncrease}
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.293 13.293a1 1 0 010-1.414L10 8.586l4.293 4.293a1 1 0 11-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          type="button"
          className="text-gray-500 focus:outline-none focus:text-red p-[3px]"
          onClick={handleDecrease}
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.293 6.707a1 1 0 011.414 0L10 9.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default NumInput;
