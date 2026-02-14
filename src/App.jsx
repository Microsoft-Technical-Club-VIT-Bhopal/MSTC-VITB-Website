import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react";

import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Preloader from "./components/Preloader";

// Lazy loaded pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Events = lazy(() => import("./pages/Events"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const Team = lazy(() => import("./pages/Team"));
const Join = lazy(() => import("./pages/Join"));

function App() {
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem("hasVisit");
  });

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem("hasVisit", "true");
  };

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      <div className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-700"}>
        <ScrollToTop />
        <Suspense fallback={null}>
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
    </div>
    </>
  );
}

export default App;