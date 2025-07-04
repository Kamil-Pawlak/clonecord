import React from 'react'

interface Channel {
    id: string;
    name: string;
}

type Props = {
  channel: Channel | null,
}

const MainArea = (props: Props) => {
  return (
    <div className="flex-1 relative bg-gray-800 h-full text-white pt-4">
      <div className="w-full bg-gray-800 border-gray-500 border-b-1 p-4 fixed top-0">{props.channel != null ? props.channel.name : "Select channel"}</div>
        <h1 className="text-2xl font-bold p-20 pl-10 h-full bg-gray-800 flex flex-col place-content-end">
          <p>Test message 1</p>
          <p>Test message 2</p>
        </h1>
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