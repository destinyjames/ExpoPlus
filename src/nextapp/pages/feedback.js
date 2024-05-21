import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Footer from './components/footer';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    rating: 0, // Default rating is now 0 instead of null
    comments: "",
  });
  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };
  const handleRating = (rating) => {
    setFeedback({ ...feedback, rating: parseInt(rating, 10) });
  };

  const ratingDescriptions = {
    1: "Very Bad",
    2: "Bad",
    3: "Average",
    4: "Good",
    5: "Very Good",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_NGROK_URL}/api/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedback),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        alert("Feedback submitted successfully");
        setFeedback({ name: "", email: "", rating: null, comments: "" }); // Clear the form
      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
        alert("Failed to submit feedback");
      });
  };

  return (
    <div>
    <div className=" pt-24 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div>
        <NavBar />
      </div>

      <div className="  max-w-md w-full space-y-8 bg-white shadow rounded-lg p-6">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Feedback Form
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
                value={feedback.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 mt-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={feedback.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-around py-4">
              {[1, 2, 3, 4, 5].map((rating) => (
                <div key={rating} className="text-center">
                  {" "}
                  {/* Wrap the button and the description text */}
                  <button
                    type="button"
                    className={`h-10 w-10 rounded-full border-2 ${
                      feedback.rating === rating
                        ? "border-indigo-500 bg-expo-blue text-white"
                        : "border-gray-300"
                    } focus:outline-none`}
                    onClick={() => handleRating(rating)}
                  >
                    {rating}
                  </button>
                  <div className="mt-2 text-sm">
                    {ratingDescriptions[rating]}
                  </div>{" "}
                  {/* Display the description */}
                </div>
              ))}
            </div>

            <div>
              <textarea
                id="comments"
                name="comments"
                rows="4"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Your feedback"
                value={feedback.comments}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-expo-blue hover:bg-hover-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Feedback
            </button>
          </div>
        </form>
        
      </div>
      <div>
      </div>
    </div>
    <Footer/>

    </div>
  );
};

export default FeedbackForm;
