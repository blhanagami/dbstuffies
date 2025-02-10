import { db } from "~/server/db";  // Import your Drizzle instance
import { posts } from '~/server/db/schema';
import { NextResponse } from "next/server";
import { z } from "zod";

const contentSchema = z.object({
  content: z.string().min(1, "Content cannot be empty").regex(/^\S+$/, "Content cannot contain spaces"),
});

type RequestData = {
  content: string;
};

// API handler for uploading text
export async function POST(req: Request) {
  const data = await req.json() as RequestData;
  const result = contentSchema.safeParse(data);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.format() },
      { status: 400 }
    );
  }

  console.log(result.data.content)

  try {
    // Insert the content into the PostgreSQL table using Drizzle ORM
    const db_result = await db.insert(posts).values({ content: result.data.content });

    // Respond with a success message

    return NextResponse.json({ message: "Text uploaded successfully"}, { status: 200 });
  } catch (error) {
    console.error("Error uploading text:", error);
    return NextResponse.json({ error: "Failed to upload text" }, { status: 500 });
  }
}