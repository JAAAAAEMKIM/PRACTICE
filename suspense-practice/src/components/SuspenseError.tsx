import { suspend } from "suspend-react";

interface Data {
  title: string;
  by: string;
}

const fetchError = (): Promise<Data> => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject("ERROR");
    }, 1000);
  });
};

const SuspenseError: React.FC = () => {
  const data = suspend(fetchError);

  return (
    <div>
      {data.title} by {data.by}
    </div>
  );
};

export default SuspenseError;
