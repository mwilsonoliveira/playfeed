import Parser from "rss-parser";

export type NewsItem = {
    title: string;
    link: string;
    pubDate: string;
    source: string;
};

const parser = new Parser();

export async function getNews(): Promise<NewsItem[]> {
    const feeds = [
        { url: "https://www.nintendo.com/feeds/news.xml", source: "Nintendo" },
        { url: "https://blog.playstation.com/feed/", source: "PlayStation" },
        { url: "https://news.xbox.com/en-us/feed/", source: "Xbox" },
    ];

    const allNews: NewsItem[] = [];

    for (const feed of feeds) {
        try {
            const parsed = await parser.parseURL(feed.url);
            parsed.items.forEach((item) => {
                if (item.title && item.link) {
                    allNews.push({
                        title: item.title,
                        link: item.link,
                        pubDate: item.pubDate || "",
                        source: feed.source,
                    });
                }
            });
        } catch (error) {
            console.error(`Erro ao buscar feed de ${feed.source}:`, error);
        }
    }

    // Ordenar por data decrescente
    return allNews.sort(
        (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );
}
