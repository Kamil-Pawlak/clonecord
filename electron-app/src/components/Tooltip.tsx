import React from 'react'

type TooltipProps = {
    message: string
    children: React.ReactNode
}

export default function Tooltip({ message, children }: Readonly<TooltipProps>) {
    return (
    <div className="group relative flex">
        {children}
        <span className="absolute left-12 scale-0 transition-all rounded bg-gray-700 p-2 text-xs text-white group-hover:scale-100">{message}</span>
    </div>
    )
}
