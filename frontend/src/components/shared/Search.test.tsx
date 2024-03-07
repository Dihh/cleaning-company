import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/react'

import { render } from "@testing-library/react"
import Search from "./Search"

test("Search should render inputs", async () => {
    const result = render(<Search onSearch={() => { }} />)
    const searchInput = await result.container.querySelector('#search')

    expect(searchInput).toBeInTheDocument();
})

test("Search should call clearTimeout on input changes", async () => {
    window.clearTimeout = jest.fn()

    const result = render(<Search onSearch={() => { }} />)

    const searchInput = await result.container.querySelector('input')

    if (searchInput) {
        fireEvent.change(searchInput, { target: { value: "teste" } })
    }

    expect(window.clearTimeout).toHaveBeenCalledTimes(1)
})