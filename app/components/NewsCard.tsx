"use client";

type NewsCardProps = {
  title: string;
  link: string;
  contentSnippet: string;
  pubDate: string;
  image?: string;
};

export default function NewsCard({
  title,
  link,
  contentSnippet,
  pubDate,
  image,
}: NewsCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block dark:border border-gray-500 rounded-xl shadow-md p-4 hover:shadow-lg transition 
           bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 w-full"
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-md mb-3"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      )}

      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {contentSnippet}
      </p>
      <span className="text-xs text-gray-200 mt-2 block">
        {new Date(pubDate).toLocaleDateString("pt-BR")}
      </span>
    </a>
  );
}
