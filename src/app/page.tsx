"use client";
import { useState, useEffect } from "react";
import uploadData from "./api/upload-stuff/upload";
import { useRouter } from "next/navigation";

export default function UploadForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    // This hook will run after the component is mounted on the client side
    // Any code that interacts with the browser (e.g., navigation, DOM manipulation) should go here
  }, []); // Empty dependency array ensures it runs only once, after initial render

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await uploadData(title, content);
    console.log(result); // Handle the result as needed
    router.push("/"); // Redirect to the home page after submission, not needed but good to have as example
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <button type="submit">Upload</button>
    </form>
  );
}