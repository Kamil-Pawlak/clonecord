import React from 'react';
import ChannelButton  from './ChannelButton';

type Props = {
  activeChannel: { id: string; name: string } | null;
  onChannelSelect?: (channel: { id: string; name: string }) => void;
}

const ChannelsPanel = (props: Props) => {

  
  const channels = [
    { id: "1", name: "general" },
    { id: "2", name: "music" },
    { id: "3", name: "memes" }
  ];
  return (
    <div className="w-64 bg-gray-800 h-full border-gray-500 border-1 text-white p-2 flex flex-col gap-0.5">
      {channels.map((channel) => (
        
        <ChannelButton key={channel.id} channel={{...channel}} onChannelSelect={props.onChannelSelect} 
        isActive={props.activeChannel?.id == channel.id}/>
      ))}
    </div>
  )
}

export default ChannelsPanel