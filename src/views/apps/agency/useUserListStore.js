import { defineStore } from 'pinia'
import axios from '@axios'

export const useAgent = defineStore('AgentList', {
  actions: {
    // 👉 Fetch users data
    fetchUsers(params) { return axios.get('/apps/users/list', { params }) },

    // 👉 Add User
    addUser(userData) {
      return new Promise((resolve, reject) => {
        axios.post('/apps/users/user', {
          user: userData,
        }).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    // 👉 fetch single user
    fetchUser(id) {
      return new Promise((resolve, reject) => {
        axios.get(`/apps/users/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})
