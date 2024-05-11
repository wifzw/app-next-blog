import { connectDatabase, insertDocument } from "@/helpers/db-util";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    if (
      !email?.includes('@')
      || name?.trim() === ''
      || message?.trim() === '') {
      res.status(400).json({ message: 'Invalid input.' })
      return;
    }

    const newMessage: any = {
      email,
      name,
      message
    }

    let client;

    try {
      client = await connectDatabase('my-site')
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to database.' })
      return;
    }

    try {
      const result = await insertDocument(client, 'messages', newMessage)
      newMessage._id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: 'Storing message failed!' })
      return;
    }

    client.close();

    res.status(201).json({ message: 'Successfully stored message!' })
  }
}