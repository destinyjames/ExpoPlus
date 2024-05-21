import React from 'react';
import NavBar from './components/NavBar';
import Firstfloor from './components/firstfloorsvg';
import Footer from './components/footer';

function firstfloor() {
 

  return (
    <div>
      <NavBar />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="flex justify-center mt-10 ml-4">
      <a href="/groundfloor">
        <button className="bg-expo-blue hover:bg-black text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out" >Go to ground floor projects</button>
        </a>
        </div>
      <div className="flex justify-center">
        <Firstfloor width="1000" height="1000" className="my-custom-class" />
        
      </div>

      <div className="flex justify-center"style={{ marginBottom: '-20px' }}>
        
      </div>
      <Footer />
    </div>
  );
}

export default firstfloor;
