import Ping from './Ping';

interface ViewProps {
  id: string;
}

const View = async ({ id }: ViewProps) => {
  // Fetch current post data
  const response = await fetch(`http://localhost:3001/posts?id=${id}`, {
    cache: 'no-store', // Ensure fresh data for SSR
  });
  const data = await response.json();
  const views = data[0]?.views ?? 0; // Fallback to 0 if views is undefined

  // Update views count
  try {
    await fetch(`http://localhost:3001/posts?id=${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ views: views + 1 }),
    });
  } catch (error) {
    console.error('Error updating views:', error);
  }

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black text-white">{views} views</span>
      </p>
    </div>
  );
};

export default View;