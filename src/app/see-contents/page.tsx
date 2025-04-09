import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

export default async function main() {
  const data = await db.query.posts.findMany({
    columns: {
      content: true,
      title: true,
    },
  })
    console.log(data)
    return (<div>
        {data.map((data,index) => (
          <div key={index}>{data.title} - {data.content}</div>
        ))}
      </div>)
}