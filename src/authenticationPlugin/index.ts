import AuthService from './auth.service'
import type { OptionsAuthPlugin, accessGuard } from './types'
import type { App, DirectiveBinding, VNode } from 'vue'
import type {NavigationGuardNext, RouteLocationNormalized, RouteLocationRaw} from 'vue-router'

let service: AuthService | null = null

const directive = {
  async mounted(el: HTMLElement, binding: DirectiveBinding, node: VNode) {
    if (!service) return
    const { checkHasScope } = service
    const result = checkHasScope(binding.value)
    if (!result) {
      node.el!.parentElement.removeChild(el)
    }
    return result
  },
}

function createAuthPlugin(options: OptionsAuthPlugin) {
  return (app: App) => {
    service = new AuthService(options)
    app.directive('auth', directive)
  }
}

async function fetchAuthDataMiddleware(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): Promise<NavigationGuardNext | undefined> {
  if (!service) return
  const { fetchUser } = service
  await fetchUser()
  next()
}

function accessGuardMiddleware(route: RouteLocationRaw): accessGuard {
  return (to: RouteLocationNormalized) => {
    if (!to.meta) return
    const { accessScopes } = to.meta
    if (!accessScopes) return
    if (!service) return
    const { checkHasScope } = service
    if (checkHasScope(accessScopes)) return

    return route
  }
}

function useAuthService(): AuthService | null {
  return service
}

export {
  createAuthPlugin,
  useAuthService,
  fetchAuthDataMiddleware,
  accessGuardMiddleware,
}
