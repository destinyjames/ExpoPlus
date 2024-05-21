
import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import { useSession } from 'next-auth/react';
import Footer from './components/footer';
import { useRouter } from 'next/router'; // Import useRouter
import { FaEye } from 'react-icons/fa';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(20);
  const [totalProjects, setTotalProjects] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const popularSearches = ['Python', 'React', 'JavaScript', 'Django', 'Flask'];
  const [selectedTerms, setSelectedTerms] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();


   
  const Visit = (project_id) => {
    if (project_id >= 53 && project_id <= 70) {
      // logic to push to a certain page
      router.push('/lg27page'); // Replace '/some-route' with your actual route
    } else if (project_id >= 27 && project_id <= 52) {
      // logic to push to another page
      router.push('/lg26page');  
    } else if (project_id >= 1 && project_id <= 26) {
      // logic to push to another page
      router.push('/lg25page');  
    }else if (project_id >= 71 && project_id <= 101) {
      // logic to push to another page
      router.push('/l128page');  
    }else if (project_id >= 102 && project_id <= 142) {
      // logic to push to another page
      router.push('/l125page');  
    }else if (project_id >= 143 && project_id <= 172) {
      // logic to push to another page
      router.push('/l114page');  
    }else if (project_id >= 173 && project_id <= 203) {
      // logic to push to another page
      router.push('/l101page');  
    }else {
      // logic if project_id doesn't match any range
      console.log('Project ID is out of the specified ranges.');
    }
  };


  const highlightProject = async (projectId) => {
    if (!session) {
      console.error('User is not signed in');
      return;
    }
    try {
      const username = session?.user?.name; 
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_NGROK_URL}/api/highlight`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, project_id: projectId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log('Highlight result:', result);
    } catch (e) {
      console.error('Error highlighting project:', e);
    }
  };
  const handleQuickSearch = (term) => {
    setSearchTerm(term);
  }

  const fetchData = async (page) => {
    setIsLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_NGROK_URL}/search?q=${encodeURIComponent(searchTerm)}&page=${page}&limit=${projectsPerPage}`;
      // Perform the fetch request with the custom header
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': 'any value here', 
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResults(data.projects);
      setTotalProjects(data.total);
    } catch (error) {
      console.error("There was an error!", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  // Calculate the total number of pages
  const totalPages = Math.ceil(totalProjects / projectsPerPage);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };


  const handlePageChange = async (page) => {
    await fetchData(page);
    setCurrentPage(page);
  };

  // Pagination event handlers
  const goToNextPage = () => {
    const newPage = currentPage < totalPages ? currentPage + 1 : currentPage;
    handlePageChange(newPage);
    scrollToTop(); // Scroll to top after fetching

  };
  
  const goToPreviousPage = () => {
    const newPage = currentPage > 1 ? currentPage - 1 : currentPage;
    handlePageChange(newPage);
    scrollToTop(); // Scroll to top after fetching

  };

  // Form submission handler
  const handleFormSubmit = (event) => {
    event.preventDefault();
    handlePageChange(1);
  };

  return (
    <div>
    <div className="flex min-h-screen bg-expo-blue">
      <Sidebar />
      <div className="flex-1 p-4">
        <NavBar />
        <br></br>
        <br></br>
        <br></br>

        {/* Search form */}
        <form onSubmit={handleFormSubmit} className="text-center mt-4 mb-6">
          <div className="flex justify-center items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter search term..."
              className="border border-blue-300 focus:ring-2 focus:ring-blue-200 focus:outline-none rounded-l-lg p-2 text-grey-darkest w-1/2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-r-lg p-2 ml-[-1px] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
            >
              Search
            </button>
           
          </div>
        </form>
        <div className="text-center my-4">
        {popularSearches.map((term) => (
          <button
            key={term}
            onClick={() => handleQuickSearch(term)}
            className="bg-gray-200 text-gray-800 rounded p-2 m-1 hover:bg-gray-300 transition duration-300"
          >
            {term}
          </button>
        ))}
      </div>

        {/* Results */}
        <div>
          {results.map((project, index) => (
            <div key={index} className="mb-4 p-4 shadow rounded bg-white">
            <h2 className="text-2xl font-bold mb-2">{project.project_title}</h2>
            <p><strong>Project ID:</strong> {project.project_id}</p>
            <p><strong>Summary:</strong> {project.project_summary}</p>
            <p><strong>Supervisor:</strong> {project.supervisor_name}</p>
            <p><strong>Technology:</strong> {project.project_technology}</p>
            <p><strong>Area:</strong> {project.project_area}</p>
            <p><strong>Programme:</strong> {project.student_programme}</p>
            <div>
              <strong>Students:</strong>
              <ul className="list-disc ml-5">
                {project.students.map((student, studentIndex) => (
                  <li key={studentIndex}>
                  {student.name} - {student.email}
                </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center space-x-3">
                  <button
                    onClick={() => highlightProject(project.project_id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 shadow-md"
                  >
                    Highlight on Map
                  </button>
                  <button
                    onClick={() => Visit(project.project_id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 shadow-md flex items-center"
                  >
                    <FaEye className="mr-2" />
                    Visit on map
                  </button>
                </div>
            </div>
          </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between my-8">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={goToNextPage}
            disabled={currentPage >= totalPages}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default Search;
