import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import markdownit from 'markdown-it';
import { Skeleton } from '@components/ui/skeleton';
import View from '@/components/View';

const md = markdownit();

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  // Fetch post data from the API
  const response = await fetch(`http://localhost:3001/posts/?id=${id}`, {
    cache: 'no-store', // Ensure fresh data for SSR
  });

  if (!response.ok) {
    return notFound();
  }

  const post1 = await response.json();
  const post = post1[0]
  // Validate post data
  if (!post) {
    return notFound();
  }

  const parsedContent = md.render(post?.pitch || '');

  return (
    <>
      <section className="blue_container !min-h-[330px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post?.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{post.author.name}</p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="NO-RESULT">No details provided</p>
          )}
        </div>
        <hr className="divider" />

        {/* TODO: EDITOR SELECTED STARTUPS */}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;