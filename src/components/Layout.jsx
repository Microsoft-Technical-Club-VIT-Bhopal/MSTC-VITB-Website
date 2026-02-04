import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-ms-obsidian">
      <Navbar />

      {/* THIS is the key fix */}
      <main className="flex-grow" key={location.pathname}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
