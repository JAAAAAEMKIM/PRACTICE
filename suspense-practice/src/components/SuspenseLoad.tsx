import { suspend } from "suspend-react";

interface Data {
  title: string;
  by: string;
}

const fetchData = (): Promise<Data> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ title: "TITLE", by: "ME" });
    }, 1000);
  });
};

const SuspenseLoad: React.FC = () => {
  const data = suspend(fetchData);

  return (
    <div>
      {data.title} by {data.by}
    </div>
  );
};

export default SuspenseLoad;
