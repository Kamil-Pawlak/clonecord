import React from 'react';
import ChannelButton from './ChannelButton';
import request from '../utils/request';
import { Channel } from '../types/channel';
import useSWR from 'swr';

type Props = {
  serverId: string | undefined,
  activeChannel: Channel | null;
  onChannelSelect?: (channel: Channel) => void;
}

const PORT = import.meta.env.VITE_PORT ?? 5000;

const ChannelsPanel = (props: Props) => {

  const {
    data: channels,
    error,
    isValidating,
  } = useSWR<Array<Channel>>(`http://localhost:${PORT}/channels?serverId=${props.serverId}`, request);

  if (error) return <div className="w-64 bg-gray-800 h-full border-gray-500 border-1 text-white p-2 flex flex-col gap-0.5">Empty</div>;


  return (
    <div className="w-64 bg-gray-800 h-full border-gray-500 border-1 text-white p-2 flex flex-col gap-0.5">
      {channels?.map((channel: Channel) => (

        <ChannelButton key={channel.id} channel={{ ...channel }} onChannelSelect={props.onChannelSelect}
          isActive={props.activeChannel?.id === channel.id} />
      ))}
    </div>
  )
}

export default ChannelsPanel