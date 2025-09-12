import React from 'react';

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark text-white p-4">
      <div className="text-center bg-gray-100/5 backdrop-blur-md p-8 rounded-xl shadow-lg border border-gray-700 ">
        <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
        <p className="text-2xl mb-3">Page Not Found</p>
        <p className="text-gray-400 text-small">
          Oops! It looks like the movie you're looking for has left the theater.
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;
