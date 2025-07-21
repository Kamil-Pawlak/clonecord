import React from 'react'

type TooltipProps = {
    message: string
    children: React.ReactNode
}

export default function Tooltip({ message, children }: Readonly<TooltipProps>) {
    return (
    <div className="group relative flex">
        {children}
        <span className="absolute left-15 scale-0 transition-all rounded-2xl bg-gray-900 p-3 text-xs text-white group-hover:scale-100">{message}</span>
    </div>
    )
}
