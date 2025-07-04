
import {Channel} from '../types/channel';

type Props = {
    channel: Channel;
    isActive: boolean;
    onChannelSelect?: (channel: Channel) => void;
};

function ChannelButton(props: Readonly<Props>) {

    return (
        <button
            type="button"
            className={`p-0.5 rounded-2xl transform duration-200 hover:bg-neutral-300/5 text-left ${props.isActive ? 'bg-gray-700' : ''}`}
            onClick={() => props.onChannelSelect?.(props.channel)}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
            >
                <line x1="6" y1="10" x2="19" y2="10" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="5" y1="15" x2="18" y2="15" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="10" y1="5" x2="7" y2="20" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="16" y1="5" x2="13" y2="20" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-white">{props.channel.name}</span>
        </button>
    );
}

export default ChannelButton;
