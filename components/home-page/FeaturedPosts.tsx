import classes from "./featured-posts.module.css";

import PostsGrid from "../posts/PostsGrid";
import { IPost } from "@/lib/types";

export default function FeaturedPosts({ posts }: { posts: IPost[] }) {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
}
