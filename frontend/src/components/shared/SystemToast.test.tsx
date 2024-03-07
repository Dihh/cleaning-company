import '@testing-library/jest-dom'
import { screen as testScreen, fireEvent } from '@testing-library/react'

import { render } from "@testing-library/react"
import SystemToast from "./SystemToast"

test("Search should render toast-container", async () => {
    const result = render(<SystemToast setShowToast={() => {}} showToast={{ }} />)
    const toastContainer = await result.container.querySelector('.toast-container')

    expect(toastContainer).toBeInTheDocument();
})

test("Search should render toast if showToast condition is true", async () => {
    const result = render(<SystemToast setShowToast={() => {}} showToast={{ condition: true }} />)
    const toastCloseImage = await result.container.querySelector('img')

    expect(toastCloseImage).toBeInTheDocument();
})

test("Search should render toast message if showToast messa exists", async () => {
    render(<SystemToast setShowToast={() => {}} showToast={{ condition: true, message: "test" }} />)
    const messageElement = await testScreen.findByText('test')

    expect(messageElement).toBeInTheDocument();
})

test("Search should call setShowToast on close ", async () => {
    const setShowToast = jest.fn()
    const result = render(<SystemToast setShowToast={setShowToast} showToast={{ condition: true, message: "test" }} />)
    const closeButton = await result.container.querySelector('button')
    if(closeButton){
        fireEvent.click(closeButton)
    }
    expect(setShowToast).toHaveBeenCalled()
})