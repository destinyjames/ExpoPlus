import { useState } from 'react';
import { useRouter } from 'next/router';
import NavBar from './components/NavBar';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setMessage('');  // Reset message on new input
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setMessage('');  // Reset message on new input
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the fetch request options
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'any-value'
      },
      body: JSON.stringify({ email, username })
    };

    // Validate the email and username in the MongoDB database
    try {
      const validateResponse = await fetch(`${process.env.NEXT_PUBLIC_NGROK_URL}/validate-user`, requestOptions);
      const validateData = await validateResponse.json();

      if (validateData.isValid) {
        // Generate a random OTP between 1000 and 9999
        const OTP = Math.floor(Math.random() * 9000 + 1000);

        // Store the email in local storage as "email_for_otp"
        localStorage.setItem('email_for_otp', email);
        localStorage.setItem('username_for_otp', username);

        // Send the OTP and email to the backend with updated headers
        requestOptions.body = JSON.stringify({ email, username, otp: OTP });
        const otpResponse = await fetch(`${process.env.NEXT_PUBLIC_NGROK_URL}/send-otp`, requestOptions);
        if (!otpResponse.ok) throw new Error('Failed to send OTP');

        // Store the OTP in the local storage for later verification
        localStorage.setItem('otp', OTP.toString());

        // Set success message
        setMessage('OTP sent successfully! Check your email.');
        
        // Redirect the user to the OTP verification page
        router.push('/otp');
      } else {
        setMessage('Invalid email or username.');
      }
    } catch (error) {
      console.error('Error validating user or sending OTP:', error);
      setMessage('Failed to process request. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <NavBar/>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange}
                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input type="email" id="email" value={email} onChange={handleEmailChange}
                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Send Reset Email
        </button>
        {message && <p className={message.includes('successfully') ? "text-green-500" : "text-red-500"}>{message}</p>}
      </form>
    </div>
  );
}
