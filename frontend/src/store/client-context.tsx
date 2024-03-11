import { FC, createContext, useContext, useState } from 'react'
import { Metadata } from '../interfaces/MetaData';
import { Client, SearchClientTerms } from '../interfaces/Client';
import { ClientAPI } from '../api/client';
import { ToastContext } from './toast-context';

export type ClientContextProps = {
  clients: Metadata<Client>,
  sortField: (string | number)[],
  searchTerm?: SearchClientTerms,
  getClients: any,
  updateClient: any,
  search: any,
  remove: any,
  select: any,
  sort: any,
  paginate: any,
  createClient: any,
  getClientsKey: number,
  getclientsRoutesKey: number,
  setclientsRoutesKey: any,
  selectedClient?: Client
}

export const ClientContextValue = {
  clients: {
    data: [],
    page: 0,
    pages: 0
  },
  sortField: [],
  searchTerm: undefined,
  getClients: () => { },
  search: () => { },
  remove: () => { },
  select: () => { },
  sort: () => { },
  paginate: () => { },
  updateClient: () => { },
  createClient: () => { },
  getClientsKey: 0,
  getclientsRoutesKey: 0,
  setclientsRoutesKey: () => { }
}


export const ClientContext = createContext<ClientContextProps>(ClientContextValue);

type props = {
  children: any
}
const ClientContextProvider: FC<props> = ({ children }) => {
  const { setShowToast } = useContext(ToastContext)

  const [clientsMetadata, setClientsMetadata] = useState<Metadata<Client>>({ data: [], page: 0, pages: 0 })
  const [selectedClient, setSelectedClient] = useState(undefined as (Client | undefined))
  const [getClientsKey, setGetClientsKey] = useState(0)
  const [searchTerm, setSearchTerm] = useState(undefined as SearchClientTerms | undefined)
  const [getclientsRoutesKey, setclientsRoutesKey] = useState(0)
  const [sortCLientsField, setSortClientsField] = useState([0, 'asc'])

  function handleRefreshGetClient(type: string, message: string) {
    setShowToast((oldShowToast: any) => ({ ...oldShowToast, condition: true, type, message }))
    setGetClientsKey(oldKey => oldKey + 1)
    setclientsRoutesKey(oldKey => oldKey + 1)
  }

  function handleSelectCLient(client?: Client) {
    setSelectedClient(client)
  }

  function handleClickPagination(page: number) {
    getClients(page, searchTerm)
  }

  function handleSearch(term: string) {
    let search: SearchClientTerms | undefined
    if (term) {
      search = { name: term, email: term }
    }
    setSearchTerm(search)
  }

  function handleSortClients(sort: (string | number)[]) {
    setSortClientsField(sort)
  }

  async function getClients(page = 1, search = searchTerm, sortCLients = sortCLientsField) {
    const clientsMetadata = await ClientAPI.getCLients(page, search, sortCLients)
    if (clientsMetadata) {
      setClientsMetadata(clientsMetadata)
    }
  }

  async function handleRemoveCLient(id: string) {
    const response = await ClientAPI.deleteCLients(id)
    if (response) {
      handleRefreshGetClient('warning', 'Cliente removed successfully')
    } else {
      handleRefreshGetClient('danger', 'Something went wrong')
    }
  }

  async function createClient(data: any) {
    const response = await ClientAPI.createCLient(data)
    if (response) {
      handleRefreshGetClient('success', 'Cliente created successfully')
    } else {
      handleRefreshGetClient('danger', 'Something went wrong')
    }
  }

  async function updateClient(data: any, id: string) {
    const response = await ClientAPI.updateCLient(data, id)
    if (response) {
      handleRefreshGetClient('info', 'Cliente updated successfully')
      handleSelectCLient(undefined)
    } else {
      handleRefreshGetClient('danger', 'Something went wrong')
    }
  }


  const ctxClients: ClientContextProps = {
    clients: clientsMetadata,
    sortField: sortCLientsField,
    searchTerm: searchTerm,
    getClients: getClients,
    updateClient: updateClient,
    createClient: createClient,
    search: handleSearch,
    remove: handleRemoveCLient,
    select: handleSelectCLient,
    sort: handleSortClients,
    paginate: handleClickPagination,
    getClientsKey: getClientsKey,
    getclientsRoutesKey: getclientsRoutesKey,
    setclientsRoutesKey: setclientsRoutesKey,
    selectedClient: selectedClient,
  }

  return <ClientContext.Provider value={ctxClients}>
    {children}
  </ClientContext.Provider>
}

export default ClientContextProvider