import React from 'react';
import Groundfloor from './components/groundfloorsvg';
import NavBar from './components/NavBar';
import Footer from './components/footer';

import { useSession, signIn } from 'next-auth/react';

function groundfloor() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // This will automatically redirect the user to the sign-in page if not authenticated
      signIn();
    },
  });

  // Show a loading indicator while checking authentication status
  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">
      <img src="/Expo+.png" alt="Loading..." className="logo-loading" />
    </div>;
  }

  // Optionally render nothing or a message if the user is not authenticated
  if (!session) {
    return <div className="flex justify-center items-center min-h-screen">
      Please log in to access this page.
    </div>;
  }
  return (
    <div>
      <NavBar />
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="flex justify-center ml-4">
      <a href="/firstfloor">
        <button className="bg-expo-blue hover:bg-black text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out" >Go to first floor projects</button>
        </a>
        </div>
      <div className="flex justify-center mt-[-20px]">
        <Groundfloor width="1000" height="10" className="my-custom-class" />
        
      </div>

      <div className="flex justify-center"style={{ marginBottom: '-20px' }}>
        
      </div>
      <Footer />
    </div>
  );
}

export default groundfloor;
