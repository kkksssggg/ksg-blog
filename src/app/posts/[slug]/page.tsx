import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

const postsDirectory = path.join(process.cwd(), 'src/contents/posts');

type PostData = {
  slug: string;
  title: string;
  date: string;
  content: string;
};

async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    date: data.date,
    content,
  };
}

export async function generateStaticParams() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.md$/, ''),
  }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const awaitedParams = await params;
  const post = await getPostData(awaitedParams.slug);

  return (
    <article className="prose dark:prose-invert max-w-none mx-auto p-4">
      <h1>{post.title}</h1>
      <p className="text-gray-500">{post.date}</p>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
};
