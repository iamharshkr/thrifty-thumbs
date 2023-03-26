import React from 'react'
import MetaData from '../Components/MetaData'

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <MetaData title="404 Not Found - Thrifty Thumbs"/>
      <div className="text-center">
        <h1 className="text-6xl text-gray-600 font-bold">404</h1>
        <p className="text-xl text-gray-500 font-medium mb-6">
          Wow, you found a page that doesn't exist.
        </p>
        <p className="text-lg text-gray-400 font-light mb-6">
          I mean, you're obviously not going to find what you're looking for here.
        </p>
        <a
          href="/"
          className="bg-teal-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-teal-600"
        >
          Take Me Home
        </a>
      </div>
    </div>
  )
}

export default NotFound