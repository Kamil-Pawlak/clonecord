export interface Server {
    id: string
    icon: string
    name: string
    ownerId: string
    createdAt: string
    members?: Array<{
        id: string
        username: string
        discriminator: string
        avatar: string
    }>
    channels?: Array<{
        id: string
        name: string
        type: 'text' | 'voice'
        createdAt: string
        members?: Array<{
            id: string
            username: string
            discriminator: string
            avatar: string
        }>
    }>
}