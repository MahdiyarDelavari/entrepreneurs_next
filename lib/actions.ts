"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string,
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch"),
  );

  if (!title || !description || !category || !link) {
    return parseServerActionResponse({
      error: "Missing required fields",
      status: "ERROR",
    });
  }

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
      title: title as string,
      description: description as string,
      category: category as string,
      image: link as string,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _id: session.user?.email,
        name: session.user?.name || "Anonymous",
        image: session.user?.image || "/default-avatar.png",
      },
      pitch,
      _createdAt: new Date(),
        views: 0,
      
    };

    const response = await fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(startup),
    });

    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.statusText}`);
    }

    const result = await response.json();

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};