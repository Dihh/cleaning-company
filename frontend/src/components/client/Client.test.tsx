import '@testing-library/jest-dom'
import { screen as testScreen } from '@testing-library/react'

import { render } from "@testing-library/react"
import Client from "./Client"

test("Client should render table, input search and pagination", async () => {
    const result = render(<Client />)
    const table = await testScreen.findByRole('table')
    const searchInput = await result.container.querySelector('#search')
    const pagination = await result.container.querySelector('.pagination')

    expect(table).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(pagination).toBeInTheDocument();

})