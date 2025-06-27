import SearchForm from "@/components/SearchForm";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {

  const query = (await searchParams).query
  return (
    <>
      <section className="blue_container">

        <h1 className="heading">Pitch Uour Startup, <br />Connect With Entrupenures</h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote On Pitches, And Get Noticed In Virtual.
        </p>

        <SearchForm query={query} />
      </section>
    </>
  );
}
