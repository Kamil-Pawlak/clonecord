import React from 'react'

type Props = {}

const MainArea = (props: Props) => {
  return (
    <div className="flex-1 relative bg-gray-800 h-full text-white pt-4">
        <h1 className="text-2xl font-bold m-4">Main Area</h1>
        {/* input for typing messages at the bottom of the container*/}
        <div className="w-full fixed bottom-0 p-4 bg-gray-800 border-t border-gray-600">
            <input
                type="text"
                placeholder="Type your message here..."
                className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
    </div>
  )
}

export default MainArea