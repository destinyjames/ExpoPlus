import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar'; 
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'; // Import useRouter
import Footer from './components/footer';
import { FaEye } from 'react-icons/fa'; 
function computerapps() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(20);
  const { data: session } = useSession();
  const router = useRouter();

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
          'ngrok-skip-browser-warning': 'any-value',
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
  const Visit = (project_id) => {
    if (project_id >= 53 && project_id <= 70) {
      // logic to push to a certain page
      router.push('/lg27page'); 
    } else if (project_id >= 27 && project_id <= 52) {
        
      router.push('/lg26page');  
    } else if (project_id >= 1 && project_id <= 26) {
        
      router.push('/lg25page');  
    }else if (project_id >= 71 && project_id <= 101) {
        
      router.push('/l128page');  
    }else if (project_id >= 102 && project_id <= 142) {
        
      router.push('/l125page');  
    }else if (project_id >= 143 && project_id <= 172) {
        
      router.push('/l114page');  
    }else if (project_id >= 173 && project_id <= 203) {
        
      router.push('/l101page');  
    }else {
      // logic if project_id doesn't match any range
      console.log('Project ID is out of the specified ranges.');
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);
      const collectionName = 'ComputerApplicationsProjects'; // Define the collection name
      try {
        // Add the collection name as a query parameter
        const response = await fetch(`${process.env.NEXT_PUBLIC_NGROK_URL}/projects?collection=${encodeURIComponent(collectionName)}&page=${currentPage}&limit=${projectsPerPage}`,
        {
          method: 'GET', 
          headers: {
            'ngrok-skip-browser-warning': 'any-value'
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchProjects();
  }, [currentPage, projectsPerPage]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }
const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
    scrollToTop();

  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
    scrollToTop();

  };

  return (
    <div>
    <div className="flex min-h-screen bg-expo-blue">
      <Sidebar />
      <div className="flex-1 p-4">
        <NavBar />
        <br></br>
        <br></br>

        <h1 className="text-center text-3xl font-bold my-6">Computer Applications</h1>
        {isLoading && <p className="text-center">Loading projects...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg bg-light-blue-100 mx-2"
            >
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

export default computerapps;