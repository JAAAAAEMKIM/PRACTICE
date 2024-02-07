const BASE_URL = "http://localhost:3000";

export type Post = {
  id: string;
  title: string;
  author: string;
  content: string;
};

export const fetchPost = async (id: string) => {
  const res = await fetch(`${BASE_URL}/posts/${id}`);

  if (res.ok) return res;

  throw new Error(await res.text());
};

export const createPost = async (req) => {
  console.log("request", req);
  const request = {};
  req.forEach((k, v) => {
    request[v] = k;
  });

  return fetch(`${BASE_URL}/posts`, {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
