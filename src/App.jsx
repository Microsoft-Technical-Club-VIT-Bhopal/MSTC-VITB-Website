import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";

// Lazy loaded pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Events = lazy(() => import("./pages/Events"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const Team = lazy(() => import("./pages/Team"));
const Join = lazy(() => import("./pages/Join"));

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center text-white">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:slug" element={<EventDetail />} />
            <Route path="/team" element={<Team />} />
            <Route path="/join" element={<Join />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;