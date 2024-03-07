export interface Client {
    id?: string
    name: string
    email: string
    coordinates: number[]
    distance?: number
}

export interface SearchClientTerms {
    name: string
    email: string
}