export const state = () => ({
  dialogOpen: false,
  dialogComponent: 'BaseLogin',
  subDialogOpen: false,
  subDialogComponent: 'BaseLogin'
})

export const getters = {
  getDialogOpen (state) {
    return state.dialogOpen
  },
  getDialogComponent (state) {
    return state.dialogComponent
  },
  getSubDialogOpen (state) {
    return state.subDialogOpen
  },
  getSubDialogComponent (state) {
    return state.subDialogComponent
  }
}

export const mutations = {
  closeDialog (state) {
    state.dialogOpen = false
  },
  setDialogComponent (state, value) {
    state.dialogComponent = value
    state.dialogOpen = true
  },
  closeSubDialog (state) {
    state.subDialogOpen = false
  },
  setSubDialogComponent (state, value) {
    state.subDialogComponent = value
    state.subDialogOpen = true
  }
}

export const actions = {}
