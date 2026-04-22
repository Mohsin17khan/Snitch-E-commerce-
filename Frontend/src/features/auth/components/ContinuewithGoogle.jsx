import React from 'react'

const ContinuewithGoogle = () => {
  return (
    <div className="w-full  flex justify-center">
      <a
        href="/api/auth/google"
        className="flex items-center gap-3 px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-100 transition duration-200"
      >
        {/* Google Logo */}
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google"
          className="w-5 h-5"
        />

        {/* Text */}
        <span className="text-sm font-medium text-gray-700">
          Continue with Google
        </span>
      </a>
    </div>
  )
}

export default ContinuewithGoogle