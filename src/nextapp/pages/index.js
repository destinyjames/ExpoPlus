import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import { useRouter } from "next/router";
import Footer from './components/footer';

function Index() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter(); // useRouter hook to navigate to the register page

  useEffect(() => {
    const onScroll = () => {
      const desktopScrollY = 300; // Larger value for desktop
      const mobileScrollY = 100; // Smaller value for mobile devices
      // Use a smaller scrollY threshold for mobile devices
      const scrollYThreshold =
        window.innerWidth < 640 ? mobileScrollY : desktopScrollY;

      if (window.scrollY > scrollYThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    // Clean up the event listener
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Function to handle button click
  const navigateToRegister = () => {
    router.push("/register"); // Update '/register' to the path of your register page
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center justify-center h-screen">
        {/* Image */}
        <img src="EXPO+.png" alt="EXPO+ Logo" />

        {/* Text below the image */}
        <div className="text-center mx-auto">
          <p
            className="font-bold text-2xl sm:text-3xl text-black"
            style={{ fontFamily: '"Times New Roman", serif' }}
          >
            "Creativity Is Endless"
          </p>
        </div>

        <button
          onClick={navigateToRegister}
          className="mt-20 bg-expo-blue text-white  py-5 px-16 rounded-full hover:bg-hover-blue transition duration-300 shadow-md"
        >
          Get Started.
        </button>
      </div>

      {/* Container for fading image */}
      <div className="flex justify-center items-center my-4">
        {/* Fading Image */}
        <img
          src="showcase1.png"
          alt="Your Image"
          className={`transition-opacity duration-1000 ease-out ${
            isVisible ? "opacity-100" : "opacity-0"
          } w-full max-w-md mx-auto`}
        />
      </div>
      <div
        className={`bg-white px-10 py-2 md:mt-10 md:py-5 ${
          isVisible ? "fade-in" : ""
        }`}
      >
        <div class="mt-10 grid gap-10 px-5 md:grid-cols-2 lg:grid-cols-4" grid>
          <div class="flex flex-col items-center" flex>
            <h2 class="italic text-5xl font-semibold text-blue-900">Step 1</h2>
            <a href="/login">
              <h3 class="bold mt-5 cursor-pointer text-center text-xl font-bold hover:underline">
                Create a unique account{" "}
              </h3>
            </a>
            <p class="mt-2 text-center text-sm text-gray-500">
              "Start by signing into your account to be then greated by our
              preference form which will grant you with personal project
              recommendations"
            </p>
          </div>
          <div class="flex flex-col items-center" flex>
            <h2 class="italic text-5xl font-semibold text-blue-900">Step 2</h2>
            <h3 class="mt-5 text-center text-xl font-bold">
              Explore Creative Projects
            </h3>
            <p class="mt-2 text-center text-sm text-gray-500">
              "Your initial project recommendations will be displayed upon sign
              in, but you are free to browse through all the projects aswell as
              Search and filter. "
            </p>
          </div>
          <div class="flex flex-col items-center" flex>
            <h2 class="italic text-5xl font-semibold text-blue-900">Step 3</h2>
            <h3 class="mt-5 text-center text-xl font-bold">
              Highlight desired Projects
            </h3>
            <p class="mt-2 text-center text-sm text-gray-500">
              "Find Projects you find interesting? well with our application you
              can click on the highlight button next to the project this allows
              you to keep track of the projects you wish to visit and rate"
            </p>
          </div>
          <div class="flex flex-col items-center" flex>
            <h2 class="italic text-5xl font-semibold text-blue-900">Step 4</h2>
            <h3 class="mt-5 text-center text-xl font-bold">Interactive map</h3>
            <p class="mt-2 text-center text-sm text-gray-500">
              "Once your done highlighting our easy to use interactive map
              allows you to view all the projects you have highlighted and it
              shows the exact location on the lab map. you can then give the
              projects a rating after visiting"
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Index;
