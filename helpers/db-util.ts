import { MongoClient } from "mongodb";

export async function connectDatabase(databaseName: string) {
  // await new Promise((resolve) => setTimeout((resolve), 5000))

  const client = await MongoClient.connect(
    `${process.env.NEXT_PRIVATE_MONGODB_HOST}/${databaseName}${process.env.NEXT_PRIVATE_MONGODB_HOST_QUERY}`
  )

  return client;
}

export async function insertDocument(client: MongoClient, collection: string, document: any) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}