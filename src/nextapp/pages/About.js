import React, { useState } from "react";
import NavBar from "./components/NavBar";
import { useInView } from "react-intersection-observer";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true, // Triggers the animation only once
    threshold: 0.5, // Trigger when 50% of the element is in view
  });

  return (
    <li
      ref={ref} // Attach the ref here to observe when the FAQ item is in view
      className={`flex flex-col ${
        !isOpen ? "border-b border-gray-200 dark:border-gray-700 pb-4" : ""
      } transition-opacity duration-700 ${
        inView ? "opacity-100" : "opacity-0"
      }`} // Apply the transition based on the inView state
    >
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-semibold flex-grow dark:text-white">{question}</h3>
        <span className="text-lg flex-shrink-0 dark:text-white">
          {isOpen ? "▲" : "▼"}
        </span>
      </div>
      {isOpen && <p className="mt-2 dark:text-white">{answer}</p>}
    </li>
  );
};

const AnimatedParagraph = ({ text, children, className }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const content = text ? <>{text}</> : children;

  return (
    <p
      ref={ref}
      className={`text-left text-black text-lg transition-opacity duration-700 ${
        inView ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      {content}
    </p>
  );
};

const Footer = () => {
  return (
    <footer className="text-white p-4 mt-8">
      {" "}
      {/* Adjusted background color */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        {" "}
        {/* Centered content with max width */}
        <div className="flex flex-col sm:flex-row items-center justify-between">
          {/* Logo section, adjusted for better centering */}
          <a href="/" className="mb-4 sm:mb-0">
            <img
              src="EXPO+.png" 
              alt="Logo"
              className="mr-3 h-6 sm:h-9" 
            />
          </a>

          <div className="text-center mb-4 sm:mb-0 sm:flex-grow">
            <p className="text-black">
              © {new Date().getFullYear()} Expo+. All rights reserved.
            </p>
          </div>

          {/* Links to Contact and CA400 page, now responsive */}
          <div className="flex flex-col sm:flex-row items-center">
            <a
              href="mailto:gideon.amaechi2@mail.dcu.ie,genesis.uwumangbe2@mail.dcu.ie"
              className="text-black mb-4 sm:mb-0 sm:mr-4 hover:text-blue-800 transition-colors duration-200"
            >
              Contact
            </a>
            <a
              href="https://computing.dcu.ie/~mscriney/ca400.html"
              className="text-black hover:text-blue-800 transition-colors duration-200"
            >
              CA400 Project
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const About = () => {
  return (
    <div>
      <NavBar />
      <div className="mt-20">
        <h3 className="text-5xl text-blue-800 font-bold text-center mt-10 pt-20 xl:text-6xl">
          About Us
        </h3>
        <div className="flex flex-col justify-center items-center mt-8 mx-auto">
          <div className="lg:w-2/4 mx-auto mb-8">
            {" "}
            {/* This div ensures the image is within the same max width */}
            <img
              src="dcu-expo.jpeg"
              alt="Your Image"
              className="w-full h-auto transition-opacity rounded-3xl duration-1000 ease-out opacity-100" // `w-full` makes it responsive, `h-auto` maintains aspect ratio
            />
          </div>
          <div className="mt-2 lg:w-2/4 mx-auto">
            {/* AnimatedParagraph components for the paragraphs directly under the image */}
            <AnimatedParagraph
              text="Welcome to Expo+, the cutting-edge app designed to enhance your experience at the DCU student expo! At Expo+, we recognize that navigating through the vibrant landscape of innovation and creativity should be as exciting as the projects themselves. This app is our solution to making your journey through the expo not just easier, but truly memorable. Whether you're drawn to groundbreaking technology, innovative engineering solutions, or creative art installations, Expo+ is here to guide you to the exhibits that will ignite your curiosity and inspire your imagination."
              className="text-xl mb-4"
            />
            <AnimatedParagraph className="text-xl mb-4">
              Expo+ emerged as an innovative enhancement to the existing DCU
              expo handbook. While searching for a project idea for their final
              year project, students{" "}
              <span className="font-bold text-blue-800">Genesis Uwumangbe</span>{" "}
              and{" "}
              <span className="font-bold text-blue-800">Gideon Amaechi</span>{" "}
              observed a recurring theme in conversations about the expo. After
              consulting with several former peers and compiling common concerns
              found scattered across the internet regarding expos in general,
              they decided to take matters into their own hands. Their goal was
              to create a modern, significantly improved version of the handbook
              that users could access on various mobile devices.
            </AnimatedParagraph>
          </div>

          <div className="mt-10 lg:w-2/4 mx-auto">
            <h2 className="text-2xl text-blue-800 font-bold text-left sm:text-3xl">
              Why Choose Expo+?
            </h2>
            <AnimatedParagraph
              className="text-xl mb-4" 
              text="We believe that accessibility at the tip of your fingers is paramount in today's society and one of the best ways to guarantee user engagement. With Expo+, your expo handbook is always just a tap away, accessible on any device, at any time. This means no more carrying around bulky guidebooks or struggling to find that one booth you heard about. Everything you need is in your pocket, from detailed exhibit descriptions to personalized scheduling tools."
            />
            <AnimatedParagraph
              className="text-xl mb-4"
              text="In line with our commitment to sustainability, Expo+ also presents an eco-friendly alternative to physical guidebooks. By digitizing the expo handbook, we're not only enhancing convenience for our users but also reducing paper waste, contributing to a greener planet."
            />
          </div>
          <div className="mt-10 lg:w-2/4 mx-auto">
            <h2 className="text-2xl text-blue-800 font-bold text-left sm:text-3xl">
              Looking Forward
            </h2>
            <AnimatedParagraph
              className="text-xl mb-4" 
              text="As we continue to grow, our vision for Expo+ extends beyond the current functionalities. We're constantly exploring innovative ways to enrich the expo experience, incorporating user feedback and the latest technological advancements into our platform. The future of Expo+ promises even more personalized, immersive, and interactive features, keeping us at the forefront of digital expo solutions."
            />
            <AnimatedParagraph
              className="text-xl mb-4"
              text="We're more than just a platform; we're a small community of innovators, explorers, and dreamers. Expo+ is your passport to discovering the wonders of the DCU expo world. Join us on this exciting journey and redefine what it means to attend expos. Together, we're turning every visit into an unforgettable adventure."
            />
          </div>
          <div className="mt-10 lg:w-2/4 mx-auto">
            <h2 className="text-2xl text-blue-800 font-bold text-left sm:text-3xl">
              Your Expo Adventure Starts Now!
            </h2>
            <AnimatedParagraph
              className="text-xl mb-4"
              text="Ready to experience the expo like never before? Sign up on Expo+ today and embark on a journey of discovery, inspiration, and connectivity. Welcome to the future of expo navigation."
            />
          </div>
          {/* Content for placeholders */}
        </div>
        {/* Outer border wrapping the FAQ section */}
        <div className="w-full border-t border-gray-200 py-16 mt-24 dark:bg-gray-900">
          {/* Inner border with adjusted alignment for FAQ section */}
          <div
            className="border rounded-lg py-8 bg-white dark:bg-gray-900 dark:border-gray-900"
            style={{ maxWidth: "80%", marginLeft: "10%", marginRight: "10%" }}
          >
            <div>
              <h2 className="text-3xl font-bold mb-4 dark:text-white">
                Frequently Asked Questions
              </h2>
              <ul className="space-y-4">
                <FAQItem
                  question="What is the purpose of this project?"
                  answer="To aid users during the expo in a seamless and enjoyable way."
                />
                <FAQItem
                  question="What kind of exhibits can I expect to see?"
                  answer="The expo features a wide range of technolgical projects including Computer Applications, Biomedical Engineering, Enterprise Computing and much more. Explore our Home Page for a preview."
                />
                <FAQItem
                  question="Is Expo+ available on mobile?"
                  answer="Yes, Expo+ provides a mobile-optimized experience."
                />
                <FAQItem
                  question="Is there a map or guide to navigate the expo?"
                  answer="Yes, we provide a virtual map and a mobile app to help you navigate the expo. Sign up to the Expo+ App for a seamless experience."
                />
               
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default About;
