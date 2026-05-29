import Button from "../components/Button";
import heroImg from "../assets/hero.jpg";
import teamsImg from "../assets/teams.jpg";
import driversImg from "../assets/drivers.jpg";
import circuitsImg from "../assets/circuits.jpg";

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Formula 1 Hub
            </p>

            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Welcome to the World of Formula 1
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              Explore teams, drivers, race circuits, and stats in a clean and
              simple dashboard inspired by F1.
            </p>

            <div className="mt-6">
              <Button to="/about" variant="primary">
                Learn More
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-6">
            <img src={heroImg} alt="Formula 1 Hero" className="w-full h-full rounded-[1.25rem] object-cover" />
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            F1 Stats
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Quick overview
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">20</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Drivers
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">10</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Teams
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">23</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Races
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">1</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Champion
            </p>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            F1 Features
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Explore Formula 1
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <img src={teamsImg} alt="F1 Teams" className="w-full h-auto rounded-[1.25rem] object-cover aspect-4/3" />

            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              Teams
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Discover top F1 teams and their engineering excellence.
            </p>

            <Button className="mt-4" variant="primary">
              View More
            </Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <img src={driversImg} alt="F1 Drivers" className="w-full h-auto rounded-[1.25rem] object-cover aspect-4/3" />

            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              Drivers
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Learn about the world’s fastest drivers and their achievements.
            </p>

            <Button className="mt-4" variant="primary">
              View More
            </Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <img src={circuitsImg} alt="F1 Circuits" className="w-full h-auto rounded-[1.25rem] object-cover aspect-4/3" />

            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              Circuits
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Explore iconic race tracks around the world.
            </p>

            <Button className="mt-4" variant="primary">
              View More
            </Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default HomePage;