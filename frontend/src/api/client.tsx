import { Client, SearchClientTerms } from "../interfaces/Client"
import { Metadata } from "../interfaces/MetaData"
import { API } from "./api"

export class CLientAPI extends API{
    static async getCLients(page: number, search: SearchClientTerms | undefined = undefined){
        let searchTerm = ""
        if(search){
          searchTerm = '&' + Object.entries(search).map((entries) => `${entries[0]}=${entries[1]}`).join('&')
        }
        const response = await fetch(`${this.API}/clients?page=${page}${searchTerm}`)
        if(response.ok){
          const data: Metadata<Client> = await response.json()
          return(data)
        }
    }

    static async getCLientsRoutes(){
      const response = await fetch(`${this.API}/clients/calculate-routes`)
      if(response.ok){
        const data: Client[] = await response.json()
        return(data)
      }
  }
}