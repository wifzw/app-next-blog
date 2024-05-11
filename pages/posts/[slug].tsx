import { GetStaticPropsContext, GetStaticPropsResult } from "next";

import PostContent from "@/components/posts/post-detail/PostContent";
import { getPostData, getPostsFiles } from "@/lib/posts-util";
import { IPostMarkdown } from "@/lib/types";
import Head from "next/head";

export function getStaticProps({
  params,
}: GetStaticPropsContext<any>): GetStaticPropsResult<{ post: IPostMarkdown }> {
  const { slug } = params;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFilenames = getPostsFiles();

  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({
      params: {
        slug: slug,
      },
    })),
    fallback: false,
  };
}

export default function PostDetailPage({ post }: { post: IPostMarkdown }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent post={post} />;
    </>
  );
}
