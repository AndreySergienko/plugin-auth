# Setup plugin

```sh
npm i auth-analytic-vue
```

main.js example
```sh
createApp(App)
  .use(
    createAuthPlugin({
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

### Directives

Use the directive to check access. Pass an array of necessary rights inside the directive

```
<h1 v-auth="['checkHeading']">Test</h1>
```

### Guards Router

Create our access guard or use accessGuardMiddleware. 

<i>router/middleware/accessGuardMiddleware</i>

example
```
export function accessGuardMiddleware(to) {
  const { accessScopes } = to.meta
  if (!accessScopes) return
  const { checkHasScope } = useAuthService
  if (checkHasScope(accessScopes)) return

  return { name: routesNameList.AUTH }
}
```

Connect first fetch guard & second access guard

Don't forget to import fetch Middleware

<i>router/index.js</i>
```
import { fetchAuthDataMiddleware } from 'auth-analytic-vue'

router.beforeEach(fetchAuthDataMiddleware)
router.beforeEach(accessGuardMiddleware)
```

### CheckHasScope - use it everywhere
If it is necessary to filter the array of pages in the menu depending on the role

example
```
import { useAuthService } from 'auth-analytic-vue'
const { checkHasScope } = useAuthService

const items = [{ name: 'Home', scopes: ['home.visible'] }, { name: 'AdminPanel, scopes: ['admin.panel'] }]

const itemsFiltered = computed(() => {
    return items.filter((item) => checkHasScope(item.scopes))
})

```

####Use with satisfaction!

Contact:
tlg: https://t.me/ensine
e-mail: andrey.aker899@gmail.com

Thats great idea  Mirtov Sergey.
