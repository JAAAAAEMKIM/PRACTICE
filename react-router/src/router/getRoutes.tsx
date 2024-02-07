import {
  Route,
  createRoutesFromElements,
  useRouteError,
} from "react-router-dom";
import RootPage from "../pages/RootPage";
import MainLayout from "../layout/MainLayout";
import AboutPage from "../pages/AboutPage";
import DetailPage from "../pages/DetailPage";
import { createPost, fetchPost } from "../apis";
import WritePage from "../pages/WritePage";

const RouterErrorBoundary: React.FC = () => {
  const error = useRouteError();

  console.log("error:", error);

  return (
    <div>
      <h1>Unexpected ERROR!!!!</h1>
    </div>
  );
};

const getRoutes = () => {
  return createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route path="/" element={<RootPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route
        path="/detail/:id"
        element={<DetailPage />}
        loader={({ params }) => fetchPost(params.id || "")}
        ErrorBoundary={RouterErrorBoundary}
      />
      <Route
        path="/write"
        element={<WritePage />}
        action={async ({ request }) => {
          if (request.method === "POST") {
            const formData = await request.formData();
            console.log(formData.get("content"));
            return createPost(formData);
          }

          throw new Error("Wrong method");
        }}
      />
    </Route>,
  );
};
export default getRoutes;
