# Setup plugin

```sh
npm i auth-analytic-vue
```

main.js example
```sh
createApp(App)
  .use(
    createAuthPlugin({
      storage: window.localStorage,
      fetch: fetchToken
    })
  )
```

## Configuration

### fetch - required
The method by which you get access rights to the user session

`The returned date must necessarily be an object with the permissions key`

You can also, as in the example, use other request data.

example
```
async function fetchToken() {
  const token = localStorage.getItem('token')
  const response = await fetch(`${process.env.VUE_APP_SERVER_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const { data } = await response.json()
  const store = useUserStore()
  store.setPersonal(data)
  return data
}
```

Contact:
tlg: https://t.me/ensine
e-mail: andrey.aker899@gmail.com

Thats great idea  Mirtov Sergey.
