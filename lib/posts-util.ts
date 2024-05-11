import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { IPostMarkdown } from './types';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier: string) {
  const postSlug = postIdentifier.replace(/\.md$/, '') // remove the file extension
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const postData: IPostMarkdown = {
    slug: postSlug,
    ...data as IPostMarkdown,
    content: content
  };

  return postData;
}

export function getAllPosts() {
  const postFiles = getPostsFiles();

  const allPosts: any = postFiles.map((postFile) => getPostData(postFile));

  const sortedPosts = allPosts.sort((postA: any, postB: any) => postA.date > postB.date ? -1 : 1);

  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts: IPostMarkdown[] = getAllPosts();

  const featuredPosts = allPosts.filter(post => post.isFeatured);

  return featuredPosts;
}