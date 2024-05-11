import { GetStaticPropsResult } from "next";
import Head from "next/head";

import Hero from "@/components/home-page/Hero";
import FeaturedPosts from "@/components/home-page/FeaturedPosts";
import { getFeaturedPosts } from "@/lib/posts-util";
import { IPost, IPostMarkdown } from "@/lib/types";

export function getStaticProps(): GetStaticPropsResult<{
  posts: IPostMarkdown[];
}> {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
}

export default function HomePage({ posts }: { posts: IPost[] }) {
  return (
    <>
      <Head>
        <title>Kauan' Blog</title>
        <meta
          name="description"
          content="I post about programming and web development."
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
}
