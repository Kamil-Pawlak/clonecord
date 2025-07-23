import FriendIcon from '../assets/friend-icon.svg?react';
import NitroIcon from '../assets/nitro.svg?react';

function FriendsPanel() {
  return (
    <div className='w-54 bg-gray-800 border border-gray-600 items-center text-white flex flex-col'>
      <div className='md-4 pb-4 border-b-1 border-gray-600 w-full p-4'>
        <h2 className=' font-semibold'><FriendIcon className="inline-block" /> Friends</h2>
        <h2 className='font-semibold'><NitroIcon className="inline-block" /> Nitro</h2>
      </div>
      <div className='flex-grow'>
        <p className='text-sm text-gray-400'>No friends added yet</p>
      </div>
    </div>
  )
}

export default FriendsPanel