import React, { useState, useEffect, useRef } from 'react';
import NavBar from './components/NavBar';
import { useSession, signIn } from 'next-auth/react';
import Footer from './components/footer';
import { FaDeleteLeft } from "react-icons/fa6";
import StarRating from './components/stars';
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from 'next/router'; 
import { LuArrowLeftCircle } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa";

function SvgSeatHighlighter() {
  const [visitedProjects, setVisitedProjects] = useState({}); // Tracks which projects have been visited

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn(); // Redirects to sign-in if unauthenticated
    },
  });
  const router = useRouter(); 

  // Navigates to the next lab page
  const goToNextLab = () => {
    router.push('/l101page'); 
  };

  // Navigates to the previous lab page
  const goToPreviousLab = () => {
    router.push('/l125page');
  };

  const [projectIds, setProjectIds] = useState([]);
  const [projectTitles, setProjectTitles] = useState([]);
  const iframeRef = useRef(null); // Reference to the iframe for direct DOM manipulation

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn();
    }
  }, [status]);

  // Fetches project IDs from a backend API
  useEffect(() => {
    async function fetchProjectIds() {
      if (status === 'authenticated') {
        try {
          const url = new URL(`${process.env.NEXT_PUBLIC_NGROK_URL}/api/maps`);
          url.searchParams.append('username', session?.user?.name);

          const response = await fetch(url, {
            headers: {
              'Authorization': `Bearer ${session.accessToken}`,
              'ngrok-skip-browser-warning': 'true',
            }
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setProjectIds(data);
        } catch (error) {
          console.error('Fetch error:', error);
        }
      }
    }

    fetchProjectIds();
  }, [status, session]);

  // Loads visited projects from localStorage
  useEffect(() => {
    const savedVisitedProjects = localStorage.getItem('visitedProjects');
    if (savedVisitedProjects) {
      setVisitedProjects(JSON.parse(savedVisitedProjects));
    }
  }, []);

  // Highlights projects in the SVG based on their visited status
  const highlightProjects = (svgDoc) => {
    if (!svgDoc) {
      console.error('SVG Document not found');
      return;
    }

    projectIds.forEach((projectId) => {
      const pathId = 'path' + projectId;
      const path = svgDoc.getElementById(pathId);
      if (path) {
        const isVisited = visitedProjects[projectId];
        path.style.fill = isVisited ? 'red' : 'gold';
      } else {
        console.error('Path not found:', pathId);
      }
    });
  };

  // Effect to handle iframe loading and project highlighting
  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const svgDoc = iframe.contentDocument || iframe.contentWindow.document;
      if (svgDoc.readyState === 'complete') {
        highlightProjects(svgDoc);
      } else {
        iframe.addEventListener('load', () => highlightProjects(svgDoc));
      }
    }
  }, [projectIds]);

  // Fetches project titles and details for specific project IDs
  useEffect(() => {
    async function fetchProjectTitles() {
      try {
        const projectData = await Promise.all(
          projectIds
            .filter(id => id >= 143 && id <= 172)
            .map(async (projectId) => {
              const response = await fetch(`${process.env.NEXT_PUBLIC_NGROK_URL}/api/allprojects/${projectId}`, {
                method: 'GET', // Optional since GET is the default method
                headers: {
                  'ngrok-skip-browser-warning': 'true', // Set the custom ngrok header
                },
              });
              const data = await response.json();
              return { id: projectId, title: data.title, module: data.module};
            })
        );
        setProjectTitles(projectData);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }

    fetchProjectTitles();
  }, [projectIds]);

  // Changes the color of a project path in the SVG
  const changePathColor = (svgDoc, projectId, color) => {
    const pathId = 'path' + projectId;
    const path = svgDoc.getElementById(pathId);
    if (path) {
      path.style.fill = color;
    } else {
      console.error('Path not found:', pathId);
    }
  };

  // Toggles the visited state of a project
  const toggleVisitedState = (projectId) => {
    const iframe = iframeRef.current;
    if (iframe) {
      const svgDoc = iframe.contentDocument || iframe.contentWindow.document;
      const isNowVisited = !visitedProjects[projectId];
      const newColor = isNowVisited ? 'red' : 'gold';
      changePathColor(svgDoc, projectId, newColor);
  
      setVisitedProjects(prev => {
        const newVisitedProjects = { ...prev, [projectId]: isNowVisited };
        localStorage.setItem('visitedProjects', JSON.stringify(newVisitedProjects));
        return newVisitedProjects;
      });
    }
  };
  
  // Removes a project from the list
  const removeProject = async (projectId) => {
    try {
      const userId = session?.user?.name; 
      const response = await fetch(`${process.env.NEXT_PUBLIC_NGROK_URL}/api/remove-project/${userId}/${projectId}`, {
        method: 'DELETE',
        headers: {
          'ngrok-skip-browser-warning': 'true', // Set the custom ngrok header
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Project removed:', data);
      window.location.reload();
      setProjectIds(prevIds => prevIds.filter(id => id !== projectId));
    } catch (error) {
      console.error('Error removing project:', error);
    }
  };
  
  if (status === "loading") {
    return <div>Loading...</div>; // Shows loading state during session initialization
  }

  if (!session) {
    return null; // Does not render anything if there is no session
  }

  return (
    <div className="bg-grey-900">
      <NavBar />
      <br></br>
      <br></br>
      <div className="bg-expo-blue p-0 mt-0">
        <br></br>
        <div className="flex pl-4">
          <button
            onClick={() => router.push('/groundfloor')}
            className="mt-4 bg-red-500 hover:bg-red-800 text-white font-bold pl-4 pr-4 py-2 rounded-lg flex items-center transition-colors duration-300"
          >
            <LuArrowLeftCircle className="mr-2" size={24} />
            Exit
          </button>
        </div>
        <h1 className="text-white text-center text-4xl font-bold">L114</h1>
        <div className="flex justify-between px-4"> 
          <button
            onClick={goToPreviousLab}
            className="mt-4 text-white font-bold flex items-center border-2 border-white border-opacity-50 rounded px-4 py-2 hover:border-opacity-100 transition duration-300"
          >
            <FaArrowLeft className="mr-2" />Previous Lab 
          </button>
          <button
            onClick={goToNextLab}
            className="mt-4 text-white font-bold flex items-center border-2 border-white border-opacity-50 rounded px-4 py-2 hover:border-opacity-100 transition duration-300"
          >
            Next Lab <FaArrowRight className="ml-2" />
          </button>
        </div>
        <iframe
          ref={iframeRef}
          src="l114.svg"
          style={{ width: '100%', height: '700px', border: 'none' }}
          title="SVG IFrame"
          onLoad={() => {}}
        />
      </div>
      <div class="container mx-auto my-8 p-4 lg:mt-16">
        <ul class="space-y-4">
          {projectTitles.map((project, index) => (
            <li key={index} class="bg-white border-l-4 border-orange-200 rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
              <h2 class="text-xl font-bold font-italic text-black ">{`Project ${project.id} `}</h2>
              <h2 class="text-x0  text-black "><strong>Title - </strong>{`${project.title} `}</h2>
              <h2 class="text-x0 text-black "><strong>Module - </strong>{` ${project.module} `}</h2>
              <div className="flex justify-between">
                <button
                  onClick={() => toggleVisitedState(project.id)}
                  className={`mt-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                    visitedProjects[project.id] ? 'text-black bg-red-500 hover:bg-red-600' : ' text-white bg-blue-800 hover:bg-blue-700'
                  }`}
                >
                  Visited
                </button>
                <div className="relative">
                  <button onClick={() => removeProject(project.id)} className="remove-button absolute bottom-21 right-0 mt-3 mr-2">
                    <FaDeleteLeft size={35} />
                  </button>
                </div>
              </div>
              <StarRating
                count={5}
                defaultRating={0}
                icon="★"
                color="gold"
                iconSize={30}
                userName={session?.user?.name} // Assuming the user ID is available in the session object
                projectId={project.id}
              />
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default SvgSeatHighlighter;
