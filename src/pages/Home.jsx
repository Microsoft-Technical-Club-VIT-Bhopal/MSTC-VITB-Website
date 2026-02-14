import { useEffect, useState } from "react";
import Preloader from "../components/Preloader";
import Hero from "../components/Hero";
import FunkyStats from "../components/FunkyStats";
import EventsMarquee from "../components/EventsMarquee";
import EventsScroll from "../components/EventsScroll";

const Home = () => {
  return (
    <>
      <Hero />
      <FunkyStats />
      <EventsMarquee />
      <EventsScroll />
    </>
  );
};

export default Home;
