import React from 'react'
import { ModalFields } from '../types/modal';

type Props = {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    onClose: () => void;
    fields: ModalFields[];
    title: string;
    description?: string;
}

function Modal(props: Props) {

    function handleBackdropClick(event: React.MouseEvent<HTMLDivElement>) {
        // Close the modal if the backdrop is clicked
        if (event.target === event.currentTarget) {
            props.onClose();
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 flex-col text-center" onClick={handleBackdropClick}>
            <div className="relative bg-gray-700 rounded-lg p-6 w-96 text-white">
                {/* close button */}
                <button className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer" onClick={() => props.onClose()}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-xl font-semibold mb-4">{props.title}</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const data = Object.fromEntries(formData.entries());
                    props.onSubmit(data as any);
                }} className="flex flex-col">
                    {props.fields.map((field, index) => (
                        <div key={index} className="mb-4">
                            <label htmlFor={field.name} className="block text-sm font-medium mb-2 text-left">{field.label}</label>
                            <input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                placeholder={field.placeholder}
                                required={field.required}
                                className="bg-gray-800 text-white p-2 rounded-lg mt-1 mb-2 shadow-[0_0_0_0.4px_#4f545c] focus:shadow-[0_0_0_1px_#5865F2] focus:outline-none
                 border-neutral-500  focus:border-blue-500 w-full"
                            />
                        </div>
                    ))}
                    <button type="submit" className="bg-[#5865F2] text-lg rounded mt-4 p-2 hover:bg-[#4752C4] transition-colors w-full cursor-pointer">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Modal