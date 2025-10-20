import { Route, BrowserRouter as Router, Routes } from "react-router";
import { Suspense, lazy } from "react";
import { Layout } from "@/components/layout/Layout/Layout";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";

// Lazy loading de páginas para mejor performance
const HomePage = lazy(() =>
  import("@/pages/Home/HomePage").then((module) => ({
    default: module.HomePage,
  }))
);
const PlanPage = lazy(() =>
  import("@/pages/Plan/PlanPage").then((module) => ({
    default: module.PlanPage,
  }))
);
const ResumePage = lazy(() =>
  import("@/pages/Resume/ResumePage").then((module) => ({
    default: module.ResumePage,
  }))
);

export const RootRouter = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/plan" element={<PlanPage />} />
            <Route path="/resume" element={<ResumePage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};
