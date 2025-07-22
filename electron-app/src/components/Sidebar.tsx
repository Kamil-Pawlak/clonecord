
import Tooltip from './Tooltip'
import useSWR, { mutate } from 'swr';
import { Server } from '../types/server';
import request from '../utils/request';
import { useModal } from './modal/ModalContext';



type Props = {
  selectedServer: Server | null,
  onServerSelect?: (server: Server | null) => void
}

const PORT = import.meta.env.VITE_PORT ?? 5000;

const Sidebar = (props: Props) => {
  const { openModal, closeModal } = useModal();
  const {
    data: servers,
    error,
    isValidating,
  } = useSWR<Array<Server>>(`http://localhost:${PORT}/servers`, request);

  if (error) return <div className="w-16 bg-gray-900 h-full text-white flex flex-col items-center gap-2 pt-2">Error loading servers</div>;
  if (isValidating) return <div className="w-16 bg-gray-900 h-full text-white flex flex-col items-center gap-2 pt-2">Loading...</div>;


  return (
    <div className="w-16 bg-gray-900 h-full text-white flex flex-col items-center gap-2 pt-2">
      <Tooltip message="Direct Messages">
        <button className="rounded-full bg-neutral-800 aspect-square w-12 p-1 transition duration-200 ease-in-out 
        hover:bg-neutral-700 flex items-center justify-center cursor-pointer" onClick={() => { props.onServerSelect?.(null) }}>
          <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 512"><path fill="#5865F2" d="M256 0c141.385 0 256 114.615 256 256S397.385 512 256 512 0 397.385 0 256 114.615 0 256 0z" /><g data-name="å¾å± 2"><g data-name="Discord Logos"><path fill="#fff" fillRule="nonzero" d="M360.932 160.621a250.49 250.49 0 00-62.384-19.182 174.005 174.005 0 00-7.966 16.243 232.677 232.677 0 00-34.618-2.602c-11.569 0-23.196.879-34.623 2.58-2.334-5.509-5.044-10.972-7.986-16.223a252.55 252.55 0 00-62.397 19.222c-39.483 58.408-50.183 115.357-44.833 171.497a251.546 251.546 0 0076.502 38.398c6.169-8.328 11.695-17.193 16.386-26.418a161.718 161.718 0 01-25.813-12.318c2.165-1.569 4.281-3.186 6.325-4.756 23.912 11.23 50.039 17.088 76.473 17.088 26.436 0 52.563-5.858 76.475-17.09 2.069 1.689 4.186 3.306 6.325 4.756a162.642 162.642 0 01-25.859 12.352 183.919 183.919 0 0016.386 26.396 250.495 250.495 0 0076.553-38.391l-.006.006c6.278-65.103-10.724-121.529-44.94-171.558zM205.779 297.63c-14.908 0-27.226-13.53-27.226-30.174 0-16.645 11.889-30.294 27.179-30.294 15.289 0 27.511 13.649 27.249 30.294-.261 16.644-12.007 30.174-27.202 30.174zm100.439 0c-14.933 0-27.202-13.53-27.202-30.174 0-16.645 11.889-30.294 27.202-30.294 15.313 0 27.44 13.649 27.178 30.294-.261 16.644-11.984 30.174-27.178 30.174z" data-name="Discord Logo - Large - White" /></g></g></svg>
        </button>
      </Tooltip>
      {servers?.map((server) => (
        <button className='rounded-full bg-neutral-800 aspect-square w-12 p-1 transition duration-200 ease-in-out hover:bg-neutral-700 cursor-pointer' key={server.id}
          onClick={() => { props.onServerSelect?.(server) }}>
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
      hover:bg-neutral-700 flex items-center justify-center cursor-pointer" onClick={openCreateServerModal}>
        <Tooltip message="Add Server">
          <svg className="rounded-full w-6 h-6 fill-green-400">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
          </svg>
        </Tooltip>
      </button>
    </div>
  );


  async function openCreateServerModal() {
    const fields = [
      { name: 'serverName', label: 'Server Name', type: 'text' as const, placeholder: 'Enter server name', required: true },
      { name: 'serverIcon', label: 'Server Icon URL', type: 'text' as const, placeholder: 'Enter server icon URL', required: false }
    ];
    const modalConfig = {
      title: 'Create Server',
      fields: fields,
      description: 'Create a new server',
      onSubmit: async (data: any) => {
        await handleSubmit(data);
      }
    };
    openModal(modalConfig);
  }


  async function handleSubmit(data: any) {
    closeModal();
    const serverName = data.serverName;
    const serverIcon = data.serverIcon;
    if (serverName) {
      try {
        const res: { id: string, name: string, ownerId: string, createdAt: string, icon: string } = await request(['/servers', {
          method: 'POST',
          body: JSON.stringify({ name: serverName, icon: serverIcon }),
          headers: {
            'Content-Type': 'application/json'
          }
        }]);
        if (res) {
          await request([`/servers/${res.id}/join`, { method: 'POST' }]);

          // ➕ Dodaj do cache lokalnie
          await mutate(`http://localhost:${PORT}/servers`, (current = []) => [...current, res], false);

          setTimeout(() => {
            mutate(`http://localhost:${PORT}/servers`);
          }, 2000);

          // ➕ Zaznacz nowy serwer
          props.onServerSelect?.(res);
        } else {
          alert('Failed to create server');
        }
        await request([`/servers/${res.id}/join`, {
          method: 'POST',
        }]);
      }
      catch (error) {
        console.error('Error creating server:', error);

      }
    }
  }
}




export default Sidebar