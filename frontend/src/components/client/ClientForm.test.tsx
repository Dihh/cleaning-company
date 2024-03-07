import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/react'

import { render } from "@testing-library/react"
import ClientForm from "./ClientForm"
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
    const result = render(<ClientForm selectedClient={undefined} onChangeClient={() => { }}
    onCancelEdit={() => { }}
    />)
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
    const result = render(<ClientForm selectedClient={undefined} onChangeClient={() => { }}
    onCancelEdit={() => { }}
    />)
    
    const button = await result.container.querySelector('button')
    const nameInput = await result.container.querySelector('input[name="name"]')
    const emailInput = await result.container.querySelector('input[name="email"]')
    const positionXnput = await result.container.querySelector('input[name="positionX"]')
    const positionYnput = await result.container.querySelector('input[name="positionY"]')

    if(nameInput && button && emailInput && positionXnput && positionYnput){
        fireEvent.change(nameInput,  {target: { value: "teste" }})
        fireEvent.change(emailInput,  {target: { value: "teste@teste.com" }})
        fireEvent.change(positionXnput,  {target: { value: 1 }})
        fireEvent.change(positionYnput,  {target: { value: 1 }})
        fireEvent.click(button)
    }
    expect(window.fetch ).toHaveBeenCalledWith("http://localhost:3000/clients", {"body": "{\"name\":\"teste\",\"email\":\"teste@teste.com\",\"coordinates\":[1,1]}", "headers": {"Content-Type": "application/json"}, "method": "POST"})
})

test("ClientForm on submit update form should send data", async () => {
    window.fetch = jest.fn()
    // @ts-ignore: Unreachable code error
    window.fetch.mockResolvedValue({
        ok: true,
        json: async () => ([])
    })
    const result = render(<ClientForm selectedClient={CLIENTS[0]} onChangeClient={() => { }}
    onCancelEdit={() => { }}
    />)
    
    const button = await result.container.querySelector('button')
    const nameInput = await result.container.querySelector('input[name="name"]')
    const emailInput = await result.container.querySelector('input[name="email"]')
    const positionXnput = await result.container.querySelector('input[name="positionX"]')
    const positionYnput = await result.container.querySelector('input[name="positionY"]')

    if(nameInput && button && emailInput && positionXnput && positionYnput){
        fireEvent.change(nameInput,  {target: { value: "teste" }})
        fireEvent.change(emailInput,  {target: { value: "teste@teste.com" }})
        fireEvent.change(positionXnput,  {target: { value: 1 }})
        fireEvent.change(positionYnput,  {target: { value: 1 }})
        fireEvent.click(button)
    }
    expect(window.fetch ).toHaveBeenCalledWith("http://localhost:3000/clients/1", {"body": "{\"name\":\"teste\",\"email\":\"teste@teste.com\",\"coordinates\":[1,1]}", "headers": {"Content-Type": "application/json"}, "method": "PATCH"})
})