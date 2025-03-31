"use client";

import { useState, ChangeEvent } from "react";

type ReturnData = {
  message: string;
  error?: string;
};

export default function HomePage() {
  const [text, setText] = useState<string>(""); // To track the input text
  const [loading, setLoading] = useState<boolean>(false); // To handle loading state
  const [error, setError] = useState<string | null>(null); // To show any error messages
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // To show success message

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleButtonClick = async () => {
    if (text.trim() === "") {
      alert("Please enter some text.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await fetch("/api/upload-stuff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // Use JSON for request body
        },
        body: JSON.stringify({
          content: text,
        }),
      });

      const data = await response.json() as ReturnData;

      if (response.ok) {
        setSuccessMessage(data.message); // Show success message
        setText(""); // Clear input
        setError(null); // Reset error state
      } else {
        setError(data.error ?? "An unknown error occurred");
      }
    } catch (error) {
      console.error("Error uploading text:", error);
      setError("An error occurred while uploading the text.");
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-4">Upload Text</h1>
        
        {/* Display any error message */}
        {error && <div className="alert alert-error mb-4"><span>{error}</span></div>}

        {/* Display success message */}
        {successMessage && <div className="alert alert-success mb-4"><span>{successMessage}</span></div>}

        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text here"
          className="input input-bordered w-full mb-4"
        />

        <button 
          onClick={handleButtonClick}
          className="btn btn-primary w-full"
          disabled={loading} // Disable button during loading
        >
          {loading ? "Uploading..." : "Upload Text"}
        </button>
      </div>
    </main>
  );
}

/*import { useState, ChangeEvent } from "react";

type ReturnData = {
  message: string;
  error?: string;
}

export default function HomePage() {
  const [text, setText] = useState<string>("");

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);

  };

  const handleButtonClick = async () => {
    if (text.trim() === "") {
      alert("Please enter some text.");
      return;
    }

    try {
      const response = await fetch("/api/upload-stuff", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",  // Sending form-encoded data
        },
        body: JSON.stringify({
          content: text,  // Text content sent via form URL encoding
        }),
      });

      const data = await response.json() as ReturnData;

      if (response.ok) {
        alert(data.message);  // Success
        setText("");  // Clear the input field after success
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error uploading text:", error);
      alert("An error occurred while uploading the text.");
    }
  };

  return (
    <main>
      <div>
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        <button onClick={handleButtonClick} className="btn btn-primary">
          Upload Text
        </button>
      </div>
    </main>
  );
}
*/
