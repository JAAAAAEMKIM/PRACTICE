import { useLoaderData } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import { Post } from "../apis";

const DetailPage: React.FC = () => {
  const post = useLoaderData() as unknown as Post;

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{post?.title}</h1>
      <h3>{post?.author}</h3>
      This is DetailPage.
      <p>{post?.content}</p>
    </>
  );
};

export default DetailPage;
