import '@testing-library/jest-dom'
import { screen as testScreen } from '@testing-library/react'

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
    const clientsCard = await testScreen.findByText('Clients')
    const clientFormsCard = await testScreen.findByText('Add new client')
    const routesCard = await testScreen.findByText('Routes')
    
    expect(clientsCard).toBeInTheDocument();
    expect(clientFormsCard).toBeInTheDocument();
    expect(routesCard).toBeInTheDocument();
})