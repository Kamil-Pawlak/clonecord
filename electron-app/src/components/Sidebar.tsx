
import Tooltip from './Tooltip'
import useSWR from 'swr';
import { Server } from '../types/server';
import request from '../utils/request';
import React from 'react';


type Props = {
  selectedServer: Server | null,
  onServerSelect?: (server: Server) => void
  setIsModalOpen: (isOpen: boolean) => void;
}

const PORT = import.meta.env.VITE_PORT ?? 5000;

const Sidebar = (props: Props) => {
  const {
    data: servers,
    error,
    isValidating,
  } = useSWR<Array<Server>>(`http://localhost:${PORT}/servers`, request);


  return (
    <div className="w-16 bg-gray-900 h-full text-white flex flex-col items-center gap-2 pt-2">
      {servers?.map((server) => (
        <button className='rounded-full bg-neutral-800 aspect-square w-12 p-1 transition duration-200 ease-in-out hover:bg-neutral-700 cursor-pointer' key={server.id} 
        onClick={() =>{props.onServerSelect?.(server)}}>
            <Tooltip message={server.name}>
              <img
                src={server.icon}
                alt={server.name}
                title={server.name}
                className="rounded-full aspect-square w-full"
              />
            </Tooltip>
        </button>
      ))}
      <button className="rounded-full bg-neutral-800 aspect-square w-12 p-1 transition duration-200 ease-in-out 
      hover:bg-neutral-700 flex items-center justify-center cursor-pointer" onClick={() => props.setIsModalOpen(true)}>
        <Tooltip message="Add Server">
          <svg className="rounded-full w-6 h-6 fill-green-400">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
          </svg>
        </Tooltip>
      </button>
    </div>
  )
}

export default Sidebar