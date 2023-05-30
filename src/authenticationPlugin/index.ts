import AuthService from './auth.service'
import type { OptionsAuthPlugin, accessGuard } from './types'
import type {App, Directive, DirectiveBinding, VNode, Plugin} from 'vue'
import type {NavigationGuardNext, RouteLocationNormalized, RouteLocationRaw} from 'vue-router'

let authService: AuthService | null = null

const authDirective: Directive<HTMLElement, string[]> = {
  async mounted(el: HTMLElement, binding: DirectiveBinding, node: VNode) {
    if (!authService) return
    const { checkHasScope } = authService
    const result = checkHasScope(binding.value)
    if (!result) el.parentNode?.removeChild(el)
  }
}

function createAuthPlugin(options: OptionsAuthPlugin): Plugin {
  return (app: App) => {
    authService = new AuthService(options)
    app.directive('auth', authDirective)
  }
}

async function fetchAuthDataMiddleware(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): Promise<void> {
  if (!authService) return next()
  await authService.fetchUser()
  next()
}

function accessGuardMiddleware(route: RouteLocationRaw): accessGuard {
  return (to: RouteLocationNormalized) => {
    if (!to.meta || !to.meta.accessScopes) return
    if (!authService) return
    const hasScope = authService.checkHasScope(to.meta.accessScopes)
    if (hasScope) return
    return route
  }
}

function useAuthService(): AuthService | null {
  return authService
}

export {
  createAuthPlugin,
  useAuthService,
  fetchAuthDataMiddleware,
  accessGuardMiddleware,
}
