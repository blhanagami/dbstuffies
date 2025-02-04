"use client";

import { actionAsyncStorageInstance } from "next/dist/server/app-render/action-async-storage-instance";
import Link from "next/link";
import { db } from "~/server/db"



/*export default async function HomePage() {

  const posts = await db.query.posts.findMany();

  return (
    <main>
      <div>
        {posts.map((post) => (
          <div key = {post.id}>{post.name}</div>))}
          </div>
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
  <button className="btn btn-primary">Primary</button>
  </main>
  );
}*/

import { useState, ChangeEvent } from "react";

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
        body: new URLSearchParams({
          content: text,  // Text content sent via form URL encoding
        }).toString(),
      });

      const data = await response.json();

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
