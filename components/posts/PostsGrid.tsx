import classes from "./posts-grid.module.css";

import PostItem from "./PostItem";
import { IPost } from "@/lib/types";

export default function PostsGrid({ posts }: { posts: IPost[] }) {
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}
