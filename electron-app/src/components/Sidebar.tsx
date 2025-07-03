import React from 'react'
import Tooltip from './Tooltip'

type Server = {
  id: string
  icon: string
  title: string
}

type Props = {
  servers: Server[]
}

const Sidebar = ({ servers }: Props) => {
  return (
    <div className="w-16 bg-gray-800 h-full text-white flex flex-col items-center gap-2 pt-2">
      {servers.map((server) => (
        <div className='rounded-full bg-neutral-800 aspect-square w-12 p-1 transition duration-200 ease-in-out hover:scale-110' key={server.id}>
            <Tooltip message={server.title}>
              <img
                src={server.icon}
                alt={server.title}
                title={server.title}
                className="rounded-full aspect-square w-full"
              />
            </Tooltip>
        </div>
      ))}
    </div>
  )
}

export default Sidebar