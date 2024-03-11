import '@testing-library/jest-dom'
import { screen as testScreen, fireEvent } from '@testing-library/react'

import { render } from "@testing-library/react"
import SystemToast from "./SystemToast"
import { ToastContext, ToastContextValue } from '../../store/toast-context'

test("Search should render toast-container", async () => {
    const providerData = {
        ...ToastContextValue
    }
    const result = render(<ToastContext.Provider value={providerData}><SystemToast /></ToastContext.Provider>)
    const toastContainer = await result.container.querySelector('.toast-container')

    expect(toastContainer).toBeInTheDocument();
})

test("Search should render toast if showToast condition is true", async () => {
    const providerData = {
        ...ToastContextValue,
        showToast: { condition: true }
    }
    const result = render(<ToastContext.Provider value={providerData}><SystemToast /></ToastContext.Provider>)
    const toastCloseImage = await result.container.querySelector('img')

    expect(toastCloseImage).toBeInTheDocument();
})

test("Search should render toast message if showToast messa exists", async () => {
    const providerData = {
        ...ToastContextValue,
        showToast: { condition: true, message: "test" }
    }
    render(<ToastContext.Provider value={providerData}><SystemToast /></ToastContext.Provider>)
    const messageElement = await testScreen.findByText('test')

    expect(messageElement).toBeInTheDocument();
})

test("Search should call setShowToast on close ", async () => {
    const setShowToast = jest.fn()
    const providerData = {
        showToast: { condition: true, message: "test" },
        setShowToast: setShowToast
    }
    const result = render(<ToastContext.Provider value={providerData}><SystemToast /></ToastContext.Provider>)
    const closeButton = await result.container.querySelector('button')
    if (closeButton) {
        fireEvent.click(closeButton)
    }
    expect(setShowToast).toHaveBeenCalled()
})