import '@testing-library/jest-dom'
import { screen as testScreen, fireEvent, waitFor } from '@testing-library/react'

import { render } from "@testing-library/react"
import ClientTable from "./ClientTable"
import { Client } from '../../interfaces/Client'
import { ClientContext, ClientContextValue } from '../../store/client-context'

const CLIENTS: Client[] = [
    {
        id: "1",
        name: "teste",
        email: "teste@teste.com",
        coordinates: [0, 0]
    }
]

test("ClientTable should render table", async () => {
    const result = render(<ClientTable clients={CLIENTS} />)
    const table = await result.container.querySelector('table')

    expect(table).toBeInTheDocument();
})

test("ClientTable should render clients", async () => {
    const result = render(<ClientTable clients={CLIENTS} />)
    const rows = await result.container.querySelectorAll('tbody tr')
    expect(rows).toHaveLength(CLIENTS.length)
})

test("ClientTable line clients should have data", async () => {
    render(<ClientTable clients={CLIENTS} />)
    const name = await testScreen.findByText(CLIENTS[0].name)
    const email = await testScreen.findByText(CLIENTS[0].email)
    const coordinates = await testScreen.findByText(CLIENTS[0].coordinates.join(','))

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
    const providerData = {
        ...ClientContextValue,
        remove: onRemoveClient
    }
    const result = render(<ClientContext.Provider value={providerData}>
        <ClientTable clients={CLIENTS} />
    </ClientContext.Provider>)
    const removeButton = await result.container.querySelector('svg[data-icon="trash"]')
    if (removeButton) {
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
    const providerData = {
        ...ClientContextValue,
        select: onSelectClient
    }
    const result = render(<ClientContext.Provider value={providerData}>
        <ClientTable clients={CLIENTS} />
    </ClientContext.Provider>)
    const removeButton = await result.container.querySelector('svg[data-icon="pen-to-square"')
    if (removeButton) {
        fireEvent.click(removeButton)
    }
    await waitFor(() => expect(onSelectClient).toHaveBeenCalledTimes(1))
})


test("ClientTable should have button sort-name-desc when receive ordenation by name desc", async () => {
    const providerData = {
        ...ClientContextValue,
        sortField: [0, 'desc']
    }
    render(<ClientContext.Provider value={providerData}>
        <ClientTable clients={CLIENTS} />
    </ClientContext.Provider>)
    const sortButton = await testScreen.findByTitle('sort-name-desc')
    expect(sortButton).toBeInTheDocument()
})

test("ClientTable should have button sort-name-desc when receive ordenation by name asc", async () => {
    const providerData = {
        ...ClientContextValue,
        sortField: [0, 'asc']
    }
    render(<ClientContext.Provider value={providerData}>
        <ClientTable clients={CLIENTS} />
    </ClientContext.Provider>)
    const sortButton = await testScreen.findByTitle('sort-name-asc')
    expect(sortButton).toBeInTheDocument()
})

test("ClientTable should have button sort-name-desc when receive ordenation by email desc", async () => {
    const providerData = {
        ...ClientContextValue,
        sortField: [1, 'desc']
    }
    render(<ClientContext.Provider value={providerData}>
        <ClientTable clients={CLIENTS} />
    </ClientContext.Provider>)
    const sortButton = await testScreen.findByTitle('sort-email-desc')
    expect(sortButton).toBeInTheDocument()
})

test("ClientTable should have button sort-name-desc when receive ordenation by email asc", async () => {
    const providerData = {
        ...ClientContextValue,
        sortField: [1, 'asc']
    }
    render(<ClientContext.Provider value={providerData}>
        <ClientTable clients={CLIENTS} />
    </ClientContext.Provider>)
    const sortButton = await testScreen.findByTitle('sort-email-asc')
    expect(sortButton).toBeInTheDocument()
})
