import '@testing-library/jest-dom'
import { screen as testScreen, 
    fireEvent, 
    waitFor 
} from '@testing-library/react'

import { render } from "@testing-library/react"
import App from "./App"
import { Client } from './interfaces/Client'

const CLIENTS: Client[] = [
    {
        id: "1",
        name: "teste",
        email: "teste@teste.com",
        coordinates: [0, 0]
    }
]

test("main page should render cards", async () => {
    window.fetch = jest.fn()
    // @ts-ignore: Unreachable code error
    window.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({pages: 1, page: 1, data: []})
    })
    render(<App />)
    const clientsCard = await testScreen.findByText('Clients')
    const clientFormsCard = await testScreen.findByText('Add new client')
    const routesCard = await testScreen.findByText('Routes')
    
    expect(clientsCard).toBeInTheDocument();
    expect(clientFormsCard).toBeInTheDocument();
    expect(routesCard).toBeInTheDocument();
})

test("should refresh clients when delete some client", async () => {
    window.fetch = jest.fn()
    // @ts-ignore: Unreachable code error
    window.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({pages: 1, page: 1, data: CLIENTS})
    })
    render(<App />)
    const removeButton = await testScreen.findByTitle('delete')
    if(removeButton){
        fireEvent.click(removeButton)
    }
    await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(2))
})

test("should setSelectedClient when click edit button", async () => {
    window.fetch = jest.fn()
    // @ts-ignore: Unreachable code error
    window.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({pages: 1, page: 1, data: CLIENTS})
    })
    render(<App />)
    const removeButton = await testScreen.findByTitle('edit')
    const addClientElement = await testScreen.findByText('Add new client')
    expect(addClientElement).toBeInTheDocument();
    
    if(removeButton){
        fireEvent.click(removeButton)
    }
    const editClientElement = await testScreen.findByText('Edit client')
    expect(editClientElement).toBeInTheDocument();
})

test("should get client when set page", async () => {
    window.fetch = jest.fn()
    // @ts-ignore: Unreachable code error
    window.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({pages: 1, page: 1, data: CLIENTS})
    })
    render(<App />)
    const pageButtonElement = await testScreen.findByText('1')
    expect(pageButtonElement).toBeInTheDocument();
    
    if(pageButtonElement){
        fireEvent.click(pageButtonElement)
    }
    await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(2))
})

test("should get client when search", async () => {
    window.fetch = jest.fn()
    // @ts-ignore: Unreachable code error
    window.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({pages: 1, page: 1, data: CLIENTS})
    })
    render(<App />)
    const searchInputElement = await testScreen.findByTestId('search')
    expect(searchInputElement).toBeInTheDocument();
    
    if(searchInputElement){
        fireEvent.change(searchInputElement, { target: { value: "teste" } })
    }
    await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(2), {timeout: 2000})
})