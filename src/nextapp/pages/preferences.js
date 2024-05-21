import React, { useState } from 'react';
import Select from 'react-select';
import { useSession } from 'next-auth/react'; // Import useSession
import NavBar from './components/NavBar';
import { useRouter } from 'next/router'; // Import useRouter

function Preferences() { 
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [selectedArea, setSelectedArea] = useState([]);

  const { data: session } = useSession(); // Access session data


  const router = useRouter();
  const handleSubmit2 = () => {
    router.push('/recommended');
};
  

  const programOptions = [
    { value: 'computer applications', label: 'Computer Applications' },
    { value: 'Enterprise Computing', label: 'Enterprise Computing' },
    { value: 'data science', label: 'Data Science' },
    { value: 'Biomedical Engineering (Year 4)', label: 'Biomedical Engineering (Year 4)' },
    { value: 'Biomedical Engineering (Year 5)', label: 'Biomedical Engineering (Year 5)' },
    { value: 'Mechanical and Manufacturing Engineering (Year 4)', label: 'Mechanical and Manufacturing Engineering (Year 4)' },
    { value: 'Mechanical and Manufacturing Engineering (Year 5)', label: 'Mechanical and Manufacturing Engineering (Year 5)' },
    { value: 'mechatronic engineering', label: 'Mechatronic Engineering' },
    { value: 'Electronic and Computer Engineering', label: 'Electronic and Computer Engineering' },


    

  ];

  const projectArea = [
    { value: 'web application', label: 'Web Application' },
    { value: 'artificial intelligence', label: 'Artificial Intelligence' },
    { value: 'image video processing', label: 'Image/Video Processing' },
    { value: 'human-computer processing', label: 'Human-Computer Interaction' },
    { value: 'android', label: 'Android' },
    { value: 'computer vision', label: 'Computer Vision' },
    { value: 'mobile app', label: 'Mobile App' },
    { value: 'sensor data', label: 'Sensor Data' },
    { value: 'ios app', label: 'iOS app' },
    { value: 'software development', label: 'Software Development' },
    { value: 'audio processing', label: 'Audio Processing' },
    { value: 'cloud computing', label: 'Cloud Computing' },
    { value: 'cryptography', label: 'Cryptography' },
    { value: 'data analytics', label: 'Data Analytics' },
    { value: 'security', label: 'Security' },
    { value: 'statistical analysis', label: 'Statistical Analysis' },
    { value: 'optical character recognition', label: 'Optical Character Recognition' },
    { value: 'fintech', label: 'Fintech' },
    { value: 'information retrieval', label: 'Information Retrieval' },
    { value: 'databases', label: 'Databases' },
    { value: 'renewable energy technology', label: 'Renewable Energy Technology' },
    { value: 'Educational', label: 'Educational' },
    { value: 'material engineering', label: 'Material Engineering' },
    { value: '3-d modelling', label: '3-D Modelling' },
    { value: 'additive manufacturing', label: 'Additive Manufacturing' },
    { value: 'arduino', label: 'Arduino' },
    { value: 'mechatronic systems', label: 'Mechatronic Systems' },
    { value: 'sensor technoloy', label: 'Sensor Technology' },
    { value: 'Advanced Material Engineering', label: 'Advanced Material Engineering' },
    { value: 'Automation', label: 'Automation' },
    { value: 'Circuit Modeling', label: 'Circuit Modeling' },
    { value: 'Control Systems', label: 'Control Systems' },
    { value: 'Device Design', label: 'Device Design' },
    { value: 'Fluid Mechanics', label: 'Fluid Mechanics' },
    { value: 'Mechanical Design and Manufacture', label: 'Mechanical Design and Manufacture' },
    { value: 'Renewable Energy Technology', label: 'Renewable Energy Technology' },
    { value: 'Simulation', label: 'Simulation' },
    { value: 'Thermodynamics', label: 'Thermodynamics' },
    { value: 'Materials Testing', label: 'Materials Testing' },
    { value: 'Life Cycle Assessment', label: 'Life Cycle Assessment' },
    { value: 'rduino', label: 'Arduino' },
    { value: 'Motion Analysis', label: 'Motion Analysis' },
    { value: 'Energy Conservation', label: 'Energy Conservation' },
    { value: 'Biomedical Engineering', label: 'Biomedical Engineering' },
    { value: 'Mechatronic Systems', label: 'Mechatronic Systems'}
     
  

    
  ]; 
  


  const technologyOptions = [
    { value: 'reactjs', label: 'React.js' },
    { value: 'html', label: 'HTML' },
    { value: 'javascript', label: 'Java Script' },
    { value: 'machine learning', label: 'Machine Learning' },
    { value: 'Docker', label: 'Docker' },
    { value: 'Go', label: 'Go' },
    { value: 'OpenCV', label: 'OpenCV' },
    { value: 'Instant Messaging', label: 'Instant Messaging' },
    { value: 'mysql', label: 'My SQL' },
    { value: 'django', label: 'Django' },
    { value: 'css', label: 'CSS' },
    { value: 'jquery', label: 'JQuery' },
    { value: 'nodejs', label: 'NodeJS' },
    { value: 'java', label: 'Java' },
    { value: 'next', label: 'Next JS' },
    { value: 'firebase', label: 'FireBase' },
    { value: 'python', label: 'Python' },
    { value: 'xml', label: 'XML' },
    { value: 'mongo db', label: 'Mongo DB' },
    { value: 'rest', label: 'Rest' },
    { value: 'c', label: 'C/C++' },
    { value: 'sensors', label: 'Sensors' },
    { value: 'solidworks', label: 'Solidworks' },
    { value: 'Excel/VB', label: 'Excel/VB' },
    { value: 'ANSYS Workbench', label: 'ANSYS Workbench' },
    { value: 'Kickstart', label: 'Kickstart' },
    { value: 'Origin Pro', label: 'Origin Pro' },
    { value: 'Digital Signal Processing', label: 'Digital Signal Processing' },
    { value: 'Circuit Modeling', label: 'Circuit Modeling' },
    { value: 'Control Systems', label: 'Control Systems' },
    { value: 'Power Electronics', label: 'Power Electronics' },
    { value: 'KiCad', label: 'KiCad' },
    { value: 'energy conservation', label: 'Energy Conservation' },
    { value: 'Wearable_Technology', label: 'Wearable Technology' },
  ];

  const handleProgramsChange = (selected) => {
    setSelectedPrograms(selected);
  };

  const handleTechnologiesChange = (selected) => {
    setSelectedTechnologies(selected);
  };

  const handleAreaChange = (selected) => {
    setSelectedArea(selected);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const preferencesData = { // Fixed variable name to match what is being used in the fetch call
      username: session?.user?.name, // Use the username from the session
      preferences: {
        programs: selectedPrograms.map(program => program.value),
        technologies: selectedTechnologies.map(tech => tech.value),
        Areas: selectedArea.map(areas => areas.value),

      }
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NGROK_URL}/preferences`, { // Adjust the URL as necessary
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'any-value'
        },
        body: JSON.stringify(preferencesData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit preferences');
      }
      const result = await response.json();
      console.log('Preferences submitted:', result);
      window.location.href = '/recommended';
      // Handle success here, maybe redirect the user or show a success message
    } catch (error) {
      console.error('Submission error:', error);
      // Handle error here, show an error message to the user
    }
  };

  // Check if the user is not logged in or session hasn't loaded yet
  if (!session) {
    return <p>Loading or not authenticated...</p>;
  }

  // Render the preferences component
  return (
    <div className="min-h-screen bg-gray-200 text-white"> {/* Updated this line */}

      <div className="flex flex-col items-center justify-center pt-8">
      <NavBar />
         <br></br>
         <br></br>
         <br></br>
         <br></br>


        <h1 className="text-4xl mb-6 text-gray-700 font-bold">Select Your Preferences</h1>


        <form onSubmit={handleSubmit} className="w-full max-w-md px-4"> {/* Added form tag here with onSubmit */}
        <div className="bg-white p-4 rounded-lg shadow-md">

          <label htmlFor="programs" className="text-sm text-gray-700 font-bold mb-2 block">
            Preferred Programs:
          </label>
          <Select
            id="programs"
            instanceId="programs"
            isMulti
            options={programOptions}
            className="text-black mb-4"
            onChange={handleProgramsChange}
          />

          <label htmlFor="technologies" className="text-sm text-gray-700 font-bold mb-2 block">
            Technologies:
          </label>
          <Select
            id="technologies"
            instanceId="technologies"
            isMulti
            options={technologyOptions}
            className="text-black mb-4"
            onChange={handleTechnologiesChange}
          />

          <label htmlFor="areas" className="text-sm text-gray-700 font-bold mb-2 block">
            Project Areas:
          </label>
          <Select
            id="area"
            instanceId="area"
            isMulti
            options={projectArea}
            className="text-black mb-4"
            onChange={handleAreaChange}
          />

          <div className="text-center mt-6">
          <button type="submit" className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"onClick={handleSubmit2} >Submit Preferences</button>
          </div>
          <br></br>

          </div>
          
        </form>

      </div>
    </div>
  );
}

export default Preferences; // Fixed the export to match the corrected function name
