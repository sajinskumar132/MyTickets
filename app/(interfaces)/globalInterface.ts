export interface AuthorizationError {
    status: number;
    message: string;
}

export interface ITicket {
    _id: string
    title: string
    description: string
    category: string
    priority: string
    status: string
    progress: string
    createdAt: string
    updatedAt: string
    __v: number
}