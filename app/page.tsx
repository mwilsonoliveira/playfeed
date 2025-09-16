import { getNews } from "@/lib/getNews";
import NewsCard from "./components/NewsCard";
import ScrollToTopButton from "./components/ScrollToTopButton";

export default async function HomePage() {
  const items = await getNews();

  return (
    <>
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">🎮 PlayFeed</h1>
        <ul className="space-y-6">
          {items.map((item, i) => (
            <li key={i}>
              <NewsCard
                title={item.title}
                link={item.link}
                contentSnippet={item.contentSnippet}
                pubDate={item.pubDate}
                image={item.enclosure?.url}
              />
            </li>
          ))}
        </ul>
      </main>
      <ScrollToTopButton />
    </>
  );
}
