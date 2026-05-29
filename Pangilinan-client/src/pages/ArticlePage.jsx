import Button from "../components/Button";
import article1Img from "../assets/article1.jpg";
import article2Img from "../assets/article2.jpg";
import article3Img from "../assets/article3.jpg";
import article4Img from "../assets/article4.jpg";

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          F1 Articles
        </p>

        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Latest news and insights from Formula 1
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          Stay updated with race highlights, team strategies, driver updates,
          and everything happening in the world of Formula 1.
        </p>

        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Articles
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            F1 article grid
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <img src={article1Img} alt="Race Weekend" className="w-full h-auto rounded-[1.25rem] object-cover aspect-4/3" />

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Article 01
            </p>

            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              Race Weekend Highlights
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-600">
              A recap of the latest Grand Prix including key overtakes and race
              strategies.
            </p>

            <Button className="mt-4">Read More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <img src={article2Img} alt="Team Strategy" className="w-full h-auto rounded-[1.25rem] object-cover aspect-4/3" />

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Article 02
            </p>

            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              Team Strategy Breakdown
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-600">
              How top teams like Red Bull and Mercedes plan their pit stops and race pace.
            </p>

            <Button className="mt-4">Read More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <img src={article3Img} alt="Driver Performance" className="w-full h-auto rounded-[1.25rem] object-cover aspect-4/3" />

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Article 03
            </p>

            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              Driver Performance Review
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Analyzing driver consistency, lap times, and championship standings.
            </p>

            <Button className="mt-4">Read More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <img src={article4Img} alt="F1 Circuits" className="w-full h-auto rounded-[1.25rem] object-cover aspect-4/3" />

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Article 04
            </p>

            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              Iconic F1 Circuits
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-600">
              A look at legendary tracks like Monaco, Silverstone, and Spa.
            </p>

            <Button className="mt-4">Read More</Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;