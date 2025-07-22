import React from 'react';
import ChannelButton from './ChannelButton';
import request from '../utils/request';
import { Channel } from '../types/channel';
import useSWR, { mutate } from 'swr';
import { Server } from '../types/server';
import DropMeDown from './DropMeDown';
import { useClickAway } from "@uidotdev/usehooks";
import { useModal } from './modal/ModalContext';

type Props = {
  server: Server | null,
  activeChannel: Channel | null;
  onChannelSelect?: (channel: Channel) => void;
}

const PORT = import.meta.env.VITE_PORT ?? 5000;

const ChannelsPanel = (props: Props) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

    const { openModal, closeModal } = useModal();



  const ref = useClickAway<HTMLDivElement>((event: Event) => {
    // check if the click was outside the header button
    const serverHeaderButton = document.getElementById('server-header');
    if (serverHeaderButton && !serverHeaderButton.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  });
  
  const {
    data: channels,
    error,
    isValidating,
  } = useSWR<Array<Channel>>(`http://localhost:${PORT}/channels?serverId=${props.server?.id}`, request);

  if (error) return <div className="w-64 bg-gray-800 h-full border-gray-500 text-white flex flex-col">Empty</div>;

  return (
    <div className="w-64 bg-gray-800 h-full border-gray-500 border-1 text-white flex flex-col gap-0.5">
      <button className="h-14 border-b border-gray-500 mb-2 pb-1 text-lg content-center pl-4 flex flex-row
      items-center cursor-pointer hover:bg-gray-700/50" id='server-header'  onClick={() => { setDropdownOpen(!dropdownOpen); }}>
        <p>{props.server?.name}</p>
        {/* dropdown list button */}
        <button className='ml-auto rounded-full p-2 cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" id='dropdown-icon-open' viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          {/* x svg (if dropdown is active) */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hidden" fill="none" id='dropdown-icon-close' viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </button>
      <div className='relative' ref={ref} >
        <DropMeDown open={dropdownOpen} options={[
          { label: 'Invite People', onClick: () => console.log('Invite People clicked') },
          { label: 'Create Channel', onClick: () => { setDropdownOpen(false); handleCreateChannel(); } },
        ]} />
      </div>
      {channels?.map((channel: Channel) => (

        <ChannelButton key={channel.id} channel={{ ...channel }} onChannelSelect={props.onChannelSelect}
          isActive={props.activeChannel?.id === channel.id} />
      ))}
    </div>
  )

  function handleCreateChannel() {
    openModal({
            title: 'Create Channel',
            description: 'Create a new channel',
            fields: [
              { name: 'channelName', label: 'Channel Name', type: 'text', placeholder: 'Enter channel name', required: true }
            ],
            onSubmit: async (data: any) => {
              closeModal();
              const channelName = data.channelName;
              if (channelName) {
                try {
                  const res: Channel = await request([`/channels`, {
                    method: 'POST',
                    body: JSON.stringify({
                      name: channelName,
                      serverId: props.server?.id
                    }),
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }]);
                  if (res) {
                    await mutate(`http://localhost:${PORT}/channels?serverId=${props.server?.id}`, (current = []) => [...current, res], false);
                    props.onChannelSelect?.(res);

                    setTimeout(() => {
                      mutate(`http://localhost:${PORT}/channels?serverId=${props.server?.id}`);
                    }, 50);

                  } else {
                    console.error('Failed to create channel');
                  }
                } catch (error) {
                  console.error('Error creating channel:', error);
                }
              }
            }
          })
  }

}


export default ChannelsPanel