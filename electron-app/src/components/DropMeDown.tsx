import React from 'react'

type Option = {
    label: string;
    onClick: () => void;
};

type Props = {
    options: Option[]
    open: boolean;
    setOpen?: (open: boolean) => void;
};

function DropMeDown(props: Readonly<Props>) {



    if (!props.open) {
        return null;
    }

    return (
        <div className={`bg-gray-900 mx-2 p-2 rounded-2xl absolute w-59 ${props.open ? '' : 'hidden'}`} id='dropdown-list'>
            <ul className='flex flex-col gap-1'>
                {props.options.map((option) => (
                    <li key={option.label} className='hover:bg-gray-700 p-2 cursor-pointer rounded-2xl'>
                        <button onClick={option.onClick} className='w-full text-left cursor-pointer'>
                            {option.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}



export default DropMeDown