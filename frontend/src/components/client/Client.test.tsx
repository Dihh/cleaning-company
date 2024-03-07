import '@testing-library/jest-dom'
import { screen as testScreen } from '@testing-library/react'

import { render } from "@testing-library/react"
import Client from "./Client"
import { Metadata } from '../../interfaces/MetaData'
import { Client as ClientInterface } from '../../interfaces/Client'


test("Client should render table, input search and pagination", async () => {
    const metaData: Metadata<ClientInterface> = ({ pages: 1, page: 1, data: [] })
    const result = render(<Client clientsMetadata={metaData} onChangePagination={() => { }} onRemoveClient={() => { }}
        onSearch={() => { }} onSelectClient={() => { }}  onSortClients={() => {}} sortCLients={[]}
    />)
    const table = await testScreen.findByRole('table')
    const searchInput = await result.container.querySelector('#search')
    const pagination = await result.container.querySelector('.pagination')

    expect(table).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(pagination).toBeInTheDocument();

})