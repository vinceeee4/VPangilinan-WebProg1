import { useParams } from 'react-router-dom';
import Button from "../components/Button";
import articles from '../assets/styles/article-content.js';

const ArticlePage = () => {
  const { name } = useParams();
  const article = articles.find(article => article.name === name);

  if (!article) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Article Not Found
            </p>
            <h1 className="text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Article Not Found
            </h1>
            <p className="mt-4 max-w-lg mx-auto text-sm leading-7 text-zinc-600 sm:text-base">
              The article you're looking for doesn't exist.
            </p>
            <div className="mt-6">
              <Button to="/articles">Back to Articles</Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          F1 Article
        </p>

        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          {article.title}
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          {article.content[0]}
        </p>

        <div className="mt-6">
          <Button to="/articles">Back to Articles</Button>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <img src={article.image} alt={article.title} className="w-full h-auto rounded-[1.25rem] object-cover aspect-4/3" />
        </div>

        <div className="prose prose-zinc max-w-none">
          {article.content.slice(1).map((paragraph, index) => (
            <p key={index} className="mb-4 text-zinc-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8">
          <Button to="/articles">Back to Articles</Button>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;