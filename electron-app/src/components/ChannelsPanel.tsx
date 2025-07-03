import React from 'react';
import ChannelButton  from './ChannelButton';

type Props = {}

const Channelspanel = (props: Props) => {
  return (
    <div className="w-64 bg-gray-800 h-full border-gray-500 border-1 text-white p-2 flex flex-col gap-0.5">
      <ChannelButton channel={{id: "1", name: "general"}}></ChannelButton>
      <ChannelButton channel={{id: "2", name: "music"}}></ChannelButton>
      <ChannelButton channel={{id: "3", name: "memes"}}></ChannelButton>
    </div>
  )
}

export default Channelspanel