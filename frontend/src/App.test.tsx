import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import { render } from "@testing-library/react"
import App from "./App"


test("main page should render cards", async () => {
    window.fetch = jest.fn()
    // @ts-ignore: Unreachable code error
    window.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({pages: 1, page: 1, data: []})
    })
    render(<App />)
    const clientsCard = await screen.findByText('Clients')
    const clientFormsCard = await screen.findByText('Add new client')
    const routesCard = await screen.findByText('Routes')
    
    expect(clientsCard).toBeInTheDocument();
    expect(clientFormsCard).toBeInTheDocument();
    expect(routesCard).toBeInTheDocument();
})