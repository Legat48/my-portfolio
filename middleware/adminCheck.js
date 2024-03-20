export default function ({ redirect, store }) {
  if (!store.state.user?.profile?.isStaff && !store.state.user?.profile?.isSuperuser) {
    redirect('/ru')
  }
}
