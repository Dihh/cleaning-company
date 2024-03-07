import { Client, SearchClientTerms } from "../interfaces/Client"
import { Metadata } from "../interfaces/MetaData"
import { API } from "./api"

export class CLientAPI extends API {
  static async getCLients(page: number, search: SearchClientTerms | undefined = undefined, sortCLients: (string | number)[]) {
    let searchTerm = ""
    if (search) {
      searchTerm = '&' + Object.entries(search).map((entries) => `${entries[0]}=${entries[1]}`).join('&')
    }
    const response = await fetch(`${this.API}/clients?page=${page}&sort=${sortCLients[0]}&orientation=${sortCLients[1]}${searchTerm}`)
    if (response.ok) {
      const data: Metadata<Client> = await response.json()
      return (data)
    }
  }

  static async getCLientsRoutes() {
    const response = await fetch(`${this.API}/clients/calculate-routes`)
    if (response.ok) {
      const data: Client[] = await response.json()
      return (data)
    }
  }

  static async createCLient(data: any) {
    const response = await fetch(`${this.API}/clients`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
    return response.ok
  }

  static async updateCLient(data: any, id: string) {
    const response = await fetch(`${this.API}/clients/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
    return response.ok
  }

  static async deleteCLients(id: string) {
    const response = await fetch(`${this.API}/clients/${id}`, {
      method: "DELETE"
    })
    return response.ok
  }
}