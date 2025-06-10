import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">내 블로그</h1>
        <nav>
          <Link href="/" legacyBehavior>
            <a className="mr-4 hover:underline">홈</a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="hover:underline">소개</a>
          </Link>
        </nav>
      </div>
    </header>
  );
};
