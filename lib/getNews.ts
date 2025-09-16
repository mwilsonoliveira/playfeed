import Parser from "rss-parser";

type FeedItem = {
    title: string;
    link: string;
    pubDate: string;
    contentSnippet: string;
    enclosure?: { url: string };
};

const feeds = [
    "https://blog.playstation.com/feed/",
    "https://www.nintendo.com/feeds/news",
    "https://news.xbox.com/en-us/feed/",
];

function extractImageFromContent(content?: string): string | undefined {
    if (!content) return undefined;
    const match = content.match(/<img[^>]+src="([^">]+)"/i);
    return match ? match[1] : undefined;
}

export async function getNews(): Promise<FeedItem[]> {
    const parser = new Parser({ customFields: { item: ["enclosure", "content:encoded"] } });
    const allItems: FeedItem[] = [];

    for (const url of feeds) {
        try {
            const feed = await parser.parseURL(url);
            const items = feed.items.map((item: any) => {
                const image =
                    (item.enclosure?.url as string) ||
                    extractImageFromContent(item["content:encoded"] || item.contentSnippet);

                return {
                    title: item.title ?? "Sem título",
                    link: item.link ?? "#",
                    pubDate: item.pubDate ?? "",
                    contentSnippet: item.contentSnippet ?? "",
                    enclosure: image ? { url: image } : undefined,
                };
            });
            allItems.push(...items);
        } catch (err) {
            console.error(`Erro ao buscar feed ${url}`, err);
        }
    }

    return allItems.sort(
        (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );
}