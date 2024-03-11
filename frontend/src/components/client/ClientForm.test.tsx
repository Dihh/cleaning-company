import '@testing-library/jest-dom'
import { act, fireEvent } from '@testing-library/react'

import { render } from "@testing-library/react"
import ClientForm from "./ClientForm"
import ClientContextProvider, { ClientContext, ClientContextValue } from '../../store/client-context'
import { Client } from '../../interfaces/Client'

const CLIENTS: Client[] = [
    {
        id: "1",
        name: "teste",
        email: "teste@teste.com",
        coordinates: [0, 0]
    }
]

test("ClientForm should render inputs", async () => {
    const result = render(<ClientForm />)
    const nameInput = await result.container.querySelector('input[name="name"]')
    const emailInput = await result.container.querySelector('input[name="email"]')
    const positionXnput = await result.container.querySelector('input[name="positionX"]')
    const positionYnput = await result.container.querySelector('input[name="positionY"]')

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(positionXnput).toBeInTheDocument();
    expect(positionYnput).toBeInTheDocument();
})

test("ClientForm on submit create form should send data", async () => {
    window.fetch = jest.fn()
    // @ts-ignore: Unreachable code error
    window.fetch.mockResolvedValue({
        ok: true,
        json: async () => ([])
    })
    const result = render(<ClientContextProvider><ClientForm /></ClientContextProvider>)

    const button = await result.container.querySelector('button')
    const nameInput = await result.container.querySelector('input[name="name"]')
    const emailInput = await result.container.querySelector('input[name="email"]')
    const positionXnput = await result.container.querySelector('input[name="positionX"]')
    const positionYnput = await result.container.querySelector('input[name="positionY"]')

    if (nameInput && button && emailInput && positionXnput && positionYnput) {
        act(() => {
            fireEvent.change(nameInput, { target: { value: "teste" } })
            fireEvent.change(emailInput, { target: { value: "teste@teste.com" } })
            fireEvent.change(positionXnput, { target: { value: 1 } })
            fireEvent.change(positionYnput, { target: { value: 1 } })
            fireEvent.click(button)
        })
    }
    expect(window.fetch).toHaveBeenCalledWith("http://localhost:3000/clients", { "body": "{\"name\":\"teste\",\"email\":\"teste@teste.com\",\"coordinates\":[1,1]}", "headers": { "Content-Type": "application/json" }, "method": "POST" })
})

test("ClientForm on submit update form should send data", async () => {
    const updateCLient = jest.fn()
    window.fetch = jest.fn()
    // @ts-ignore: Unreachable code error
    window.fetch.mockResolvedValue({
        ok: true,
        json: async () => ([])
    })
    const client = CLIENTS[0]
    const providerData = {
        ...ClientContextValue, selectedClient: client,
        updateClient: updateCLient
    }
    const result = render(<ClientContext.Provider value={providerData}>
        <ClientForm />
    </ClientContext.Provider>)

    const button = await result.container.querySelector('button')
    const nameInput = await result.container.querySelector('input[name="name"]')
    const emailInput = await result.container.querySelector('input[name="email"]')
    const positionXnput = await result.container.querySelector('input[name="positionX"]')
    const positionYnput = await result.container.querySelector('input[name="positionY"]')

    if (nameInput && button && emailInput && positionXnput && positionYnput) {
        act(() => {
            fireEvent.change(nameInput, { target: { value: "teste" } })
            fireEvent.change(emailInput, { target: { value: "teste@teste.com" } })
            fireEvent.change(positionXnput, { target: { value: 1 } })
            fireEvent.change(positionYnput, { target: { value: 1 } })
            fireEvent.click(button)
        })
    }
    expect(updateCLient).toHaveBeenCalledWith({
        "coordinates": [
            1,
            1,
        ],
        "email": "teste@teste.com",
        "name": "teste"
    }, client.id)
})