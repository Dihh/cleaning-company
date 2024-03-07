import '@testing-library/jest-dom'
import { fireEvent, waitFor } from '@testing-library/react'

import { render } from "@testing-library/react"
import SystemPagination from "./SystemPagination"

test("SystemPagination should render inputs", async () => {
    const result = render(<SystemPagination metaData={{page: 1, pages: 1, data: []}} onChangePagination={() => { }} />)
    const paginationsListElement = await result.container.querySelector('.pagination')

    expect(paginationsListElement).toBeInTheDocument();
})

test("SystemPagination should render 3 page itens if have 3 or more pages ", async () => {
    const result = render(<SystemPagination metaData={{page: 1, pages: 3, data: []}} onChangePagination={() => { }} />)
    const pageItems = await result.container.querySelectorAll('.page-link')

    expect(pageItems).toHaveLength(3)
})

test("SystemPagination should have active page", async () => {
    const result = render(<SystemPagination metaData={{page: 1, pages: 3, data: []}} onChangePagination={() => { }} />)
    const pageItems = await result.container.querySelectorAll('.active')

    expect(pageItems).toHaveLength(1)
})

test("SystemPagination should call onChangePagination on click page", async () => {
    const onChangePagination = jest.fn()

    const result = render(<SystemPagination metaData={{page: 1, pages: 1, data: []}} onChangePagination={onChangePagination} />)

    const pageItem = await result.container.querySelector('.page-link')
    if (pageItem) {
        fireEvent.click(pageItem)
    }

    await waitFor(() => expect(onChangePagination).toHaveBeenCalledTimes(1))
})