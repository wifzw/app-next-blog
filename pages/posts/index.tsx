import { GetStaticPropsResult } from "next";

import { getAllPosts } from "@/lib/posts-util";
import { IPost } from "@/lib/types";

import AllPosts from "@/components/posts/AllPosts";
import Head from "next/head";

export function getStaticProps(): GetStaticPropsResult<{ posts: IPost[] }> {
  const featuredPosts = getAllPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
}

export default function AllPostsPage({ posts }: { posts: IPost[] }) {
  return (
    <>
      <Head>
        <title>All My Posts</title>
        <meta
          name="description"
          content="A list of all programming-related tutorials and posts"
        />
      </Head>
      <AllPosts posts={posts} />
    </>
  );
}
