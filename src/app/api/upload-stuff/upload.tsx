"use server";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

export default async function uploadData(title: string, content: string): Promise<{message: string} | { error: string }> {
  try {
    // Insert the data into the database
    await db.insert(posts).values({ title, content });

    // Return a success message or the inserted data
    return { message: "Data uploaded successfully!"};
  } catch (error) {
    console.error("Error uploading data:", error);
    return { error: "Failed to upload data." };
  }
}















/*import { db } from "~/server/db";  // Import your Drizzle instance
import { posts } from '~/server/db/schema';
import { NextApiRequest, NextApiResponse } from 'next';


interface TextField {
  fieldName: string;
  value: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { textFields }: { textFields: TextField[] } = req.body;

    try {
      // Iterate over each field and insert it into the database
      for (const { fieldName, value } of textFields) {
        await db.insert(posts).values({ field_name: fieldName, value });
      }

      res.status(200).json({ message: 'Data uploaded successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

*/
