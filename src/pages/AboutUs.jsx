import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12">
      <div className="card w-full md:w-3/4 lg:w-2/3 xl:w-1/2 bg-base-100 shadow-xl rounded-lg border border-gray-300 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
        <div className="card-body p-8">
          <h2 className="card-title text-4xl lg:text-5xl font-bold text-center mb-6 text-white-800 transition-colors duration-300 ease-in-out hover:text-blue-600" style={{ textAlign: "center" }}>
            About EduMate
          </h2>
          <p className="text-lg leading-relaxed text-white-700 mb-4 transition-colors duration-300 ease-in-out hover:text-blue-600" style={{ textAlign: "justify" }}>
            EduMate is a versatile chatbot designed to assist Indian women navigating legal challenges, providing anonymous, confidential, and approachable legal support. It offers guidance on issues like domestic violence, sexual harassment, and privacy violations, ensuring women have easy access to crucial legal information and resources.
          </p>
          <p className="text-lg leading-relaxed text-white-700 mb-4 transition-colors duration-300 ease-in-out hover:text-blue-600" style={{ textAlign: "justify" }}>
            Beyond its legal support, EduMate also offers two innovative reading modes:
          </p>
          <ul className="list-disc pl-6 mb-4 text-white-700">
            <li><strong>Parent-AI Co-Reading Mode:</strong> Assists parents during storytelling by suggesting questions and reducing cognitive load, while enhancing the parent-child bond.</li>
            <li><strong>Automated Bot-Reading Mode:</strong> Enables independent storytelling sessions with interactive question-answer interactions, perfect for when parents are unavailable.</li>
          </ul>
          <div className="flex justify-center mt-6">
            <a href="/login" className="btn btn-primary hover:bg-blue-700 transition-colors duration-300 ease-in-out ">TRY NOW!</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
