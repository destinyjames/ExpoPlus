
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';



 


function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const toggleDropdown = () => setUserDropdownOpen(!isUserDropdownOpen);
  const { data: session, status } = useSession();
  const router = useRouter();
  const isActive = (path) => router.pathname === path;

  
  const signIn = () => {
    window.location.href = '/login'; // Adjust '/login' to your login page's URL
  };

  
  const handleSignOut = async () => {
    // Redirect to homepage after signout
    localStorage.removeItem('visitedProjects');
    localStorage.removeItem('otp');
    localStorage.removeItem('email_for_otp');


    await signOut({ redirect: true, callbackUrl: '/' });
    
  };
  return (
    

<nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ExpoPlus</span>
  </a>
  
  <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
  {status === 'authenticated' ? (
      <button
        type="button"
        className="w-8 h-8 flex text-sm  rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded={isUserDropdownOpen ? "true" : "false"}
        onClick={toggleDropdown}
      >
        <span className="sr-only">Open user menu</span>
        <img className="w-8 h-8 rounded-full" src="profileicon.png" alt="user photo" />
      </button>
    ) : (    <button 
      onClick={signIn} 
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Sign in
    </button>
    )}    
   
   
   <div
        className={`${
          isUserDropdownOpen ? 'block' : 'hidden'
        } absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-50 z-50 my-4 text-base list-none bg-white divide-y  rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
        id="user-dropdown"
        style={{ top: '100%', right: '0' }} 
      >
        <div className="px-4 py-3">
        <span className="block text-sm text-gray-900 dark:text-white text-center">{session?.user?.name || 'Default Name'}</span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <a href="/preferences" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Preferences</a>
          </li>
         
         
          <li>
            <a href="#" onClick={handleSignOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
          </li>
        </ul>
      </div>
      <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
        <span className="sr-only">Open main menu</span>
        
    </button>
  
  </div>
  <div className={`items-center ${isMobileMenuOpen ? 'flex' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    
      
    <li>
        <a
          href="/home"
          onClick={(e) => {
            e.preventDefault();
            router.push('/home');
          }}
          className={`block py-2 px-3 rounded md:p-0 transition duration-300 ${
            router.pathname === "/home" ? "text-blue-700" : "text-white hover:text-blue-700"
          }`}
          aria-current={router.pathname === "/home" ? "page" : undefined}
        >
          Home
        </a>
      </li>
      <li>
        <a
          href="/About"
          onClick={(e) => {
            e.preventDefault();
            router.push('/About');
          }}
          className={`block py-2 px-3 rounded md:p-0 transition duration-300 ${
            router.pathname === "/About" ? "text-blue-700" : "text-white hover:text-blue-700"
          }`}
          aria-current={router.pathname === "/About" ? "page" : undefined}
        >
          About
        </a>
      </li>
      <li>
  <a
    href="/groundfloor"
    onClick={(e) => {
      e.preventDefault();
      router.push('/groundfloor');
    }}
    className={`block py-2 px-3 rounded md:p-0 transition duration-300 ${
      router.pathname === "/groundfloor" || router.pathname === "/firstfloor"
      ? "text-blue-700"
      : "text-white hover:text-blue-700"
    }`}
    aria-current={
      router.pathname === "/groundfloor" || router.pathname === "/firstfloor"
      ? "page"
      : undefined
    }
  >
    Maps
  </a>
</li>

      <li>
        <a
          href="/feedback"
          onClick={(e) => {
            e.preventDefault();
            router.push('/feedback');
          }}
          className={`block py-2 px-3 rounded md:p-0 transition duration-300 ${
            router.pathname === "/feedback" ? "text-blue-700" : "text-white hover:text-blue-700"
          }`}
          aria-current={router.pathname === "/feedback" ? "page" : undefined}

        >
          Feedback
        </a>
      </li>
      <li>
        <a
          href="/firstfloor"
          onClick={(e) => {
            e.preventDefault();
            router.push('/firstsloor');
          }}
          className={`block py-2 px-3 rounded md:p-0 transition duration-300 ${
            router.pathname === "/groundfloor" ? "text-blue-700" : "text-white hover:text-blue-700"
          }`}
          aria-current={router.pathname === "/firstfloor" ? "page" : undefined}
        >
  
        </a>
      </li>
    </ul>
     
  </div>
  </div>
</nav>


  );
};

export default Navbar;
