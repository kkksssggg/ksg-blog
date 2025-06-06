import { getSortedPostsData, PostData } from '@/libs/posts';

export default function HomePage() {
  const posts: PostData[] = getSortedPostsData();

  return (
    <main className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-bold mb-6">My Blog</h1>
      <ul className="space-y-6">
        {posts.map(({ slug, title, date }) => (
          <li key={slug} className="p-4 border rounded hover:shadow">
            <a href={`/posts/${slug}`} className="text-2xl font-semibold text-blue-600 hover:underline">
              {title}
            </a>
            <p className="text-sm text-gray-600">{date}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};
