export default function ({ store, redirect }) {
  if (!store.getters['auth/isSignedIn']) {
    return redirect('/admin')
  }
}
