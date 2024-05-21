import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar'; 
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'; // Import useRouter
import { FaEye } from 'react-icons/fa'; // Import the Eye icon from react-icons/fa
function recommended() {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { data: session } = useSession();
    const router = useRouter();
    const [isCollaborative, setIsCollaborative] = useState(false); // State to track which recommendation model is used



    
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
      const username = session?.user?.name; // Directly use the session object
  
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
  useEffect(() => {
    const fetchRecommendedProjects = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (session) {
          const username = session.user.name; 
          const response = await fetch(`${process.env.NEXT_PUBLIC_NGROK_URL}/recommend?username=${username}`, {
            method: 'GET',
            headers: {
              'ngrok-skip-browser-warning': 'true' 
            },
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setProjects(data.projects); 
          setIsCollaborative(data.isCollaborative || false);
        }
      } catch (e) {
        setError(`Failed to load recommended projects: ${e.message}`);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchRecommendedProjects();
  }, [session]); 
  
  
  
    return (
      <div className="flex min-h-screen bg-expo-blue">
        <Sidebar />
        <div className="flex-1 p-4">
          <NavBar />
          <br></br>
          <br></br>
  
          <h1 className="text-center text-3xl font-bold my-6">Recommended Projects</h1>
          {isCollaborative && (
          <div className="text-center my-2">
            <span className="inline-block bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-2">
               Projects Similar Users Rated Highly
            </span>
          </div>
        )}
          {isLoading && <p className="text-center">Loading recommended projects...</p>}
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
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default recommended;
  