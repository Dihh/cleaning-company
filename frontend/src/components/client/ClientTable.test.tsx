import '@testing-library/jest-dom'
import { screen, fireEvent, waitFor } from '@testing-library/react'

import { render } from "@testing-library/react"
import ClientTable from "./ClientTable"
import { Client } from '../../interfaces/Client'

const CLIENTS: Client[] = [
    {
        id: "1",
        name: "teste",
        email: "teste@teste.com",
        coordinates: [0, 0]
    }
]

test("ClientTable should render table", async () => {
    const result = render(<ClientTable clients={CLIENTS} onRemoveClient={() => { }}
        onSelectClient={() => { }}
    />)
    const table = await result.container.querySelector('table')

    expect(table).toBeInTheDocument();
})

test("ClientTable should render clients", async () => {
    const result = render(<ClientTable clients={CLIENTS} onRemoveClient={() => { }}
        onSelectClient={() => { }}
    />)
    const rows = await result.container.querySelectorAll('tbody tr')
    expect(rows).toHaveLength(CLIENTS.length)
})

test("ClientTable line clients should have data", async () => {
    const onRemoveClient = jest.fn()
    render(<ClientTable clients={CLIENTS} onRemoveClient={onRemoveClient}
        onSelectClient={() => { }}
    />)
    const name = await screen.findByText(CLIENTS[0].name)
    const email = await screen.findByText(CLIENTS[0].email)
    const coordinates = await screen.findByText(CLIENTS[0].coordinates.join(','))

    expect(name).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(coordinates).toBeInTheDocument()
})

test("ClientTable should call onRemoveClient function when remove button have been clicked", async () => {
    window.fetch = jest.fn()
    // @ts-ignore: Unreachable code error
    window.fetch.mockResolvedValue({
        ok: true,
        json: async () => ([])
    })
    const onRemoveClient = jest.fn()
    const result = render(<ClientTable clients={CLIENTS} onRemoveClient={onRemoveClient}
        onSelectClient={() => { }}
    />)
    const removeButton = await result.container.querySelector('svg[data-icon="trash"')
    if(removeButton){
        fireEvent.click(removeButton)
    }
    await waitFor(() => expect(onRemoveClient).toHaveBeenCalledTimes(1))
})

test("ClientTable should call onSelectClient function when edit button have been clicked", async () => {
    window.fetch = jest.fn()
    // @ts-ignore: Unreachable code error
    window.fetch.mockResolvedValue({
        ok: true,
        json: async () => ([])
    })
    const onSelectClient = jest.fn()
    const result = render(<ClientTable clients={CLIENTS} onRemoveClient={() => {}}
        onSelectClient={onSelectClient}
    />)
    const removeButton = await result.container.querySelector('svg[data-icon="pen-to-square"')
    if(removeButton){
        fireEvent.click(removeButton)
    }
    await waitFor(() => expect(onSelectClient).toHaveBeenCalledTimes(1))
})
