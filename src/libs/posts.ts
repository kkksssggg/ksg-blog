import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type PostData = {
  slug: string;
  title: string;
  date: string;
  content: string;
};

const postsDirectory = path.join(process.cwd(), 'src', 'contents', 'posts');

export function getSortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory).filter(name => name.endsWith('.md'));

  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      content,
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
};

export function getPostData(slug: string): PostData {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    content,
  };
};
