import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NavBar from './components/NavBar';

export default function OTPVerification() {
  const [otp, setOtp] = useState(Array(4).fill(''));
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(60); // Changed to 60 seconds for better user experience
  const router = useRouter();
  const [emailForOtp, setEmailForOtp] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  useEffect(() => {
    setEmailForOtp(localStorage.getItem('email_for_otp'));
  }, []);

  const handleOtpChange = (index, event) => {
    let newOtp = [...otp];
    newOtp[index] = event.target.value;
    setOtp(newOtp);
    if (event.target.nextSibling && event.target.value) {
      event.target.nextSibling.focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const enteredOTP = otp.join('');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NGROK_URL}/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'any-value'
        },
        body: JSON.stringify({ email: emailForOtp, otp: enteredOTP }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('access_token', data.access_token); // Store JWT token received from the server
        router.push('/update-password'); // Redirect to update password page
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred while verifying the OTP.');
    }
  };

  const resendOTP = async () => {
    setError('');
    const email = localStorage.getItem('email_for_otp');
    if (!email) {
      setError('No email was found to resend OTP.');
      return;
    }
    const newOTP = Math.floor(1000 + Math.random() * 9000);
    localStorage.setItem('otp', newOTP.toString());
    try {
      await fetch(`${process.env.NEXT_PUBLIC_NGROK_URL}/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'any-value'
        },
        body: JSON.stringify({ email, otp: newOTP }),
      });
     alert('OTP has been resent to your email');
     setTimeLeft(60); // Reset timer for another minute
 } catch (error) {
     console.error('Error occurred while sending OTP:', error); // Log the error for debugging purposes
     alert('OTP has been resent to your email');
     setTimeLeft(60); // Reset timer for another minute
 }
};
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <NavBar />
      <div className="bg-white p-8 rounded shadow-lg text-center">
        <h1 className="mb-6 text-xl font-semibold">Email Verification</h1>
        <p>We have sent a code to your email: {emailForOtp}</p>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex justify-center mb-6">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleOtpChange(index, e)}
                className="w-12 h-12 border mx-2 text-center"
                autoFocus={index === 0}
              />
            ))}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Verify Account
          </button>
          <p className="mt-4 text-gray-600">
            {timeLeft ? `Resend OTP in ${timeLeft}s` : (
              <button onClick={resendOTP} className="text-blue-500 hover:text-blue-700" disabled={timeLeft !== 0}>
                Didn't receive code? Resend OTP
              </button>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
