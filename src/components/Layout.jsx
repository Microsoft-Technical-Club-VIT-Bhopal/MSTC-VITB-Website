import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
export default function Layout({ showPreloader }) {
  return (
    <div className={`transition-opacity duration-1000 ${showPreloader ? 'opacity-0' : 'opacity-100'} relative min-h-screen flex flex-col font-body bg-slate-50 dark:bg-ms-obsidian text-slate-900 dark:text-ms-white transition-colors duration-500`}>
      <Navbar />

      {/* THIS is the key fix */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
