// components/Sidebar.js
import { useRouter } from 'next/router';

function Sidebar() {
  const router = useRouter();
  

    return (
      <aside className="w-64" aria-label="Sidebar">
<div className="overflow-y-auto py-4 px-3 bg-navbar-blue sticky top-20 rounded-lg shadow-x1">
          <ul className="space-y-2">
          <li>
          <a href="/Search" className={`block py-2 px-4 rounded-full transition duration-300 ${router.pathname === "/Search" ? "bg-blue-700 text-white" : "text-white hover:bg-blue-700"}`}>Search Projects</a>
            </li>
            <li>
            <a href="/recommended" className={`block py-2 px-4 rounded-full transition duration-300 ${router.pathname === "/recommended" ? "bg-blue-700 text-white" : "text-white hover:bg-blue-700"}`}>Recommended</a>
            </li>
            <li>
            <a href="/home" className={`block py-2 px-4 rounded-full transition duration-300 ${router.pathname === "/home" ? "bg-blue-700 text-white" : "text-white hover:bg-blue-700"}`}>All Projects</a>
            </li>
            <li>
            <a href="/computerapps" className={`block py-2 px-4 rounded-full transition duration-300 ${router.pathname === "/computerapps" ? "bg-blue-700 text-white" : "text-white hover:bg-blue-700"}`}>Computer Applications</a>
            </li>
            <li>
            <a href="/enterprisecomputing" className={`block py-2 px-4 rounded-full transition duration-300 ${router.pathname === "/enterprisecomputing" ? "bg-blue-700 text-white" : "text-white hover:bg-blue-700"}`}>Enterprise Computing</a>
            </li><li>
            <a href="/datascience" className={`block py-2 px-4 rounded-full transition duration-300 ${router.pathname === "/datascience" ? "bg-blue-700 text-white" : "text-white hover:bg-blue-700"}`}>Data Science</a>
            </li><li>
            <a href="/biomedicalengineering" className={`block py-2 px-4 rounded-full transition duration-300 ${router.pathname === "/biomedicalengineering" ? "bg-blue-700 text-white" : "text-white hover:bg-blue-700"}`}>Biomedical Engineering</a>
            </li><li>
            <a href="/mechanical&manufacturing" className={`block py-2 px-4 rounded-full transition duration-300 ${router.pathname === "/mechanical&manufacturing" ? "bg-blue-700 text-white" : "text-white hover:bg-blue-700"}`}>Mechanical and Manufacturing Engineering</a>
            </li><li>
            <a href="/mechatronicengineering" className={`block py-2 px-4 rounded-full transition duration-300 ${router.pathname === "/mechatronicengineering" ? "bg-blue-700 text-white" : "text-white hover:bg-blue-700"}`}>Mechatroic Engineering</a>
            </li><li>
            <a href="/eletronic&computerengineering" className={`block py-2 px-4 rounded-full transition duration-300 ${router.pathname === "/eletronic&computerengineering" ? "bg-blue-700 text-white" : "text-white hover:bg-blue-700"}`}>Elecronic & Computer Engineering</a>
            </li>
          </ul>
        </div>
      </aside>
    );
  }
  
  export default Sidebar;
  