export const state = () => ({
  loading: false
})

export const getters = {
  getLoading: state => state.loading
}

export const mutations = {
  setLoading (state, value) {
    state.loading = value
  }
}

export const actions = {}
