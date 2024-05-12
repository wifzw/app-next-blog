import { IPost } from "@/lib/types";
import classes from "./all-posts.module.css";
import PostsGrid from "./PostsGrid";

export default function AllPosts({ posts }: { posts: IPost[] }) {
  return (
    <section className={classes.posts}>
      <h1>Todas as Postagens</h1>
      <PostsGrid posts={posts} />
    </section>
  );
}
