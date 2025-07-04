import React from 'react';
import ChannelButton  from './ChannelButton';
import request from '../utils/request';
import {Channel} from '../types/channel';
import useSWR from 'swr';

type Props = {
  activeChannel: Channel | null;
  onChannelSelect?: (channel: Channel) => void;
}


const ChannelsPanel = (props: Props) => {

  const{
    data: channels,
    error,
    isValidating,
  } = useSWR<Array<Channel>>('http://localhost:5000/channels', request);

   if (error) return <div className="w-64 bg-gray-800 h-full border-gray-500 border-1 text-white p-2 flex flex-col gap-0.5">Failed to load</div>;
  if (isValidating) return <div className="w-64 bg-gray-800 h-full border-gray-500 border-1 text-white p-2 flex flex-col gap-0.5">Loading</div>;
  

  return (
    <div className="w-64 bg-gray-800 h-full border-gray-500 border-1 text-white p-2 flex flex-col gap-0.5">
      {channels?.map((channel: Channel) => (
        
        <ChannelButton key={channel.id} channel={{...channel}} onChannelSelect={props.onChannelSelect} 
        isActive={props.activeChannel?.id === channel.id}/>
      ))}
    </div>
  )
}

export default ChannelsPanel