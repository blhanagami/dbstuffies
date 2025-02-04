import { db } from "~/server/db";  // Import your Drizzle instance
import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "querystring"; // This is needed to parse x-www-form-urlencoded data
import { posts } from '~/server/db/schema';
// import { string } from "zod";

// API handler for uploading text
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Handle form-urlencoded data (application/x-www-form-urlencoded)
    const { content } = await new Promise<{ content: string }>((resolve, reject) => {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        try {
          resolve(parse(body) as { content: string });
        } catch (error) {
          reject(error);
        }
      });
    });

    // Check if the content is valid
    if (!content || content.trim() === "") {
      return res.status(400).json({ error: "Content cannot be empty" });
    }

    try {
      // Insert the content into the PostgreSQL table using Drizzle ORM
      const result = await db.insert(posts).values({ content });

      // Respond with a success message
      res.status(200).json({ message: "Text uploaded successfully", result });
    } catch (error) {
      console.error("Error uploading text:", error);
      res.status(500).json({ error: "Failed to upload text" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

// This should be up to date now