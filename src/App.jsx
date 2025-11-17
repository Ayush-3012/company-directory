import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./partials/Loader";
import Navbar from "./components/Navbar";

const Home = lazy(() => import("./page/Home"));
const Companies = lazy(() => import("./page/Companies"));

const App = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className="text-center text-white text-xl p-8">
            <Loader />
          </div>
        }
      >
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"companies"} element={<Companies />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
