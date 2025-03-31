import { db } from "~/server/db";  // Import your Drizzle instance
import { textSchema } from '~/server/db/schema';
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
        await db.insert(textSchema).values({ field_name: fieldName, value });
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