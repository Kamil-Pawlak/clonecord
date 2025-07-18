import React from 'react'
import request from '../utils/request';


type Props = {
    setIsModalOpen: (isOpen: boolean) => void;
}


function CreateServerModal({ setIsModalOpen }: Props) {

    function handleBackdropClick(event: React.MouseEvent<HTMLDivElement>) {
        if (event.target === event.currentTarget) {
            event.stopPropagation();
            event.preventDefault();
            // Close the modal when clicking on the backdrop
            setIsModalOpen(false);
        }
    }
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsModalOpen(false);
        const form = event.currentTarget;
        const serverName = (form.elements.namedItem('server-name') as HTMLInputElement).value;
        const serverIcon = (form.elements.namedItem('server-icon') as HTMLInputElement).value;
        if(serverName){
            try{
            const res: { id: string, name: string, ownerId: string, createdAt: string, icon: string } = await request(['/servers', {
                method: 'POST',
                body: JSON.stringify({name: serverName, icon: serverIcon }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }]);
            if(res) {
                window.location.reload();
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
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 flex-col text-center" onClick={handleBackdropClick}>
            <div className="relative bg-gray-700 rounded-lg p-6 w-96 text-white">
                {/* close button */}
                <button className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer" onClick={() => setIsModalOpen(false)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-xl font-semibold mb-4">Create Server</h2>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="mb-4">
                        <label htmlFor='server-name' className="block text-sm font-medium mb-2 text-left">Server Name</label>
                        <input type="text" id='server-name' className="bg-gray-800 text-white p-2 rounded-lg mt-1 mb-2 shadow-[0_0_0_0.4px_#4f545c] focus:shadow-[0_0_0_1px_#5865F2] focus:outline-none
                 border-neutral-500  focus:border-blue-500 w-full" placeholder="Enter server name" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor='server-icon' className="block text-sm font-medium mb-2 text-left">Server Icon URL</label>
                        <input type="text" id='server-icon' className="bg-gray-800 text-white p-2 rounded-lg mt-1 mb-2 shadow-[0_0_0_0.4px_#4f545c] focus:shadow-[0_0_0_1px_#5865F2] focus:outline-none
                 border-neutral-500  focus:border-blue-500 w-full" placeholder="Enter icon" />
                    </div>
                    <button type="submit" className="bg-[#5865F2] text-lg rounded mt-4 p-2 hover:bg-[#4752C4] transition-colors w-full cursor-pointer">
                        Create Server
                    </button>
                </form>
            </div>
        </div>
    )

    
}

export default CreateServerModal