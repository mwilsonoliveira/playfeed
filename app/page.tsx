import { getNews } from "@/lib/getNews";

export const dynamic = "force-dynamic";

export default async function Home() {
  const news = await getNews();

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🎮 Game News Feed</h1>
      <ul className="space-y-6">
        {news.map((item, i) => (
          <li
            key={i}
            className="border rounded-xl shadow hover:bg-gray-50 transition overflow-hidden"
          >
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-blue-600 hover:underline">
                  {item.title}
                </h2>
                <div className="text-sm text-gray-500 mt-1">
                  {item.source} • {new Date(item.pubDate).toLocaleDateString()}
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
