import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {

  const query = (await searchParams).query

  const posts = [
    {
      _createdAt: Date.now(),
      views: 55,
      author: { _id: 1 , name:"Mahdiyar"},
      _id: 1,
      description: "This Is Description",
      image: "/posts-imgs/img-1.webp",
      category: "Robots",
      title: "We Robots"
    },

  ];

  return (
    <>
      <section className="blue_container">
        <h1 className="heading">
          Pitch Uour Startup, <br />
          Connect With Entrupenures
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote On Pitches, And Get Noticed In Virtual.
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">

        <p className="text-30-semibold">
          {query ? `Search Results For "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post:startupCardType) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
              <p className="no-results">No Startups found</p>
          )}
          
        </ul>
      </section>
    </>
  );
}
