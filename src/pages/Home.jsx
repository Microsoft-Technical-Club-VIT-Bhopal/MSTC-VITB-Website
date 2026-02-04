import { useEffect, useState } from "react";
import Preloader from "../components/Preloader";
import Hero from "../components/Hero";
import StatsBento from "../components/StatsBento";
import EventsScroll from "../components/EventsScroll";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // lock scroll during animation
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "auto";
    }, 2500); // ⬅ match your MSTC animation duration

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      <Hero />
      <StatsBento />
      <EventsScroll />
    </>
  );
};

export default Home;
