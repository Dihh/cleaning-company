import '@testing-library/jest-dom'
import { screen as testScreen, fireEvent } from '@testing-library/react'

import { render } from "@testing-library/react"
import Routes from "./Routes"
import { ClientContext, ClientContextValue } from '../../store/client-context'

test("Routes should render calculate routes button", async () => {
    render(<Routes />)
    const calculateRoutesButton = await testScreen.getByText('Calculate routes')

    expect(calculateRoutesButton).toBeInTheDocument();
})

test("Routes should render modal when button is clicked", async () => {
    render(<Routes />)
    const calculateRoutesButton = await testScreen.getByText('Calculate routes')
    if (calculateRoutesButton) {
        fireEvent.click(calculateRoutesButton)
    }
    const routesModalTitle = await testScreen.getAllByText('Routes')
    expect(routesModalTitle).toHaveLength(2)
})

test("Routes should get clients routes", async () => {
    window.fetch = jest.fn()
    // @ts-ignore: Unreachable code error
    window.fetch.mockResolvedValue({
        ok: true,
        json: async () => null
    })
    const providerData = {
        ...ClientContextValue,
        getclientsRoutesKey: 1
    }
    render(<ClientContext.Provider value={providerData}>
        <Routes />
    </ClientContext.Provider>)
    expect(window.fetch).toHaveBeenCalled
})