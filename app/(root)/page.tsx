import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;

  // Fetch all posts from JSON Server using GET
  const url = query
    ? `http://localhost:3001/posts?q=${encodeURIComponent(query)}`
    : `http://localhost:3001/posts`;

  const response = await fetch(url, {
    method: 'GET',
    cache: 'no-store', // Ensure fresh data for SSR
  });

  let posts: startupCardType[] = [];
  if (response.ok) {
    posts = await response.json();
  } else {
    console.error('Failed to fetch posts:', response.statusText);
  }

  return (
    <>
      <section className="blue_container">
        <h1 className="heading">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
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
          {posts.length > 0 ? (
            posts.map((post: startupCardType) => (
              <StartupCard key={post.id} post={post} />
            ))
          ) : (
            <p className="no-results">No Startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}