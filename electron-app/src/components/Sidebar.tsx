
import Tooltip from './Tooltip'
import useSWR from 'swr';
import { Server } from '../types/server';
import request from '../utils/request';


type Props = {
  selectedServer: Server | null,
  onServerSelect?: (server: Server) => void
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
        <button className='rounded-full bg-neutral-800 aspect-square w-12 p-1 transition duration-200 ease-in-out hover:scale-110' key={server.id} 
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
    </div>
  )
}

export default Sidebar