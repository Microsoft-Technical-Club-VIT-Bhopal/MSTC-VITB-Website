import React, { useEffect, useState } from 'react';
import ReactLenis from 'lenis/react';
import Preloader from '../components/Preloader';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StatsBento from '../components/StatsBento';
import EventsScroll from '../components/EventsScroll';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <>
            <Hero />
            <StatsBento />
            <EventsScroll />
        </>
    );
};

export default Home;
