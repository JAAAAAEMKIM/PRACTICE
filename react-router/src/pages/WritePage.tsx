import { Form } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";

const WritePage: React.FC = () => {
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
      <h2>This is Write Page</h2>
      <Form method="post">
        <h1>title</h1>
        <input type="text" name="title" />
        <h3>author</h3>
        <input type="text" name="author" />
        <p>content</p>
        <textarea name="content" />
        <button type="submit">SAVE</button>
      </Form>
    </>
  );
};

export default WritePage;
