const Footer = () => {
    return (
      <footer className="bg-stone-100 text-white p-4 mt-8">
        {" "}
        <div className="max-w-4xl mx-auto px-4 py-4">
          {" "}
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <a href="/" className="mb-4 sm:mb-0">
              <img
                src="/EXPO+.png" 
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
  export default Footer;
