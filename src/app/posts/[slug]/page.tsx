import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

const postsDirectory = path.join(process.cwd(), "src/contents/posts");

export async function generateStaticParams() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.md$/, ""),
  }));
};

interface PostPageProps {
  params: Promise<{ slug: string }>;
};

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return (
    <article className="prose dark:prose-invert max-w-none mx-auto p-4">
      <h1>{data.title}</h1>
      <p className="text-gray-500">{data.date}</p>
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
};
