import { request } from '@/utils/request'

const BASE_URL = 'https://reqres.in/api/'
const USERS_ENDPOINTS = {
  users: `${BASE_URL}users`
}

class UsersService {
  async   listUsers() {
    // regres.in does not support search so we need to fetch all users to handle search on the client side

    return await request({
      url: USERS_ENDPOINTS.users,
      query: {
        page: 1,
        per_page: 999999999
      }
    })
  }

  async getUser(id) {
    return await request({
      url: `${USERS_ENDPOINTS.users}/${id}`
    })
  }

  async createUser(body) {
    return await request({
      url: USERS_ENDPOINTS.users,
      method: 'post',
      body: body
    })
  }

  async updateUser(id, body) {
    return await request({
      url: `${USERS_ENDPOINTS.users}/${id}`,
      method: 'put',
      body: body
    })
  }

  async deleteUser(id) {
    return await request({
      url: `${USERS_ENDPOINTS.users}/${id}`,
      method: 'delete'
    })
  }
}

export default new UsersService()
