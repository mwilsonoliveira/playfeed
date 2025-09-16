import { getNews } from "@/lib/getNews";

export const dynamic = "force-dynamic"; // garante SSR em cada request

export default async function Home() {
  const news = await getNews();

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🎮 Game Feed</h1>
      <ul className="space-y-4">
        {news.map((item, i) => (
          <li
            key={i}
            className="border p-4 rounded-xl shadow hover:bg-gray-50 transition"
          >
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-semibold text-blue-600 hover:underline"
            >
              {item.title}
            </a>
            <div className="text-sm text-gray-500 mt-1">
              {item.source} • {new Date(item.pubDate).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
