// pages/index.tsx

"use client";

import { useState, useEffect } from 'react';

export default function Home() {
  // Initialize state for the fields
  const [fields, setFields] = useState([{ fieldName: 'Field 1', value: '' }]);
  const [isClient, setIsClient] = useState(false); // To check if we are on the client side

  // Set isClient to true after the component has mounted on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle adding a new field to the form
  const handleAddField = () => {
    setFields([...fields, { fieldName: `Field ${fields.length + 1}`, value: '' }]);
  };

  // Handle changes in the input fields
  const handleInputChange = (index: number, newValue: string) => {
    setFields(fields.map((field, i) => 
      i === index ? { ...field, value: newValue } : field
    ));
  };

  // If we're on the client, render the form
  if (!isClient) {
    // Return null or a placeholder while the component is being mounted on the client
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Upload Text Fields</h1>
      <form>
        {fields.map((field, index) => (
          <div key={index}>
            <label>{field.fieldName}</label>
            <textarea
              value={field.value}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddField}>
          Add More Fields
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
