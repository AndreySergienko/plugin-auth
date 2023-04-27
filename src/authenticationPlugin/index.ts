import AuthService from './auth.service'
import type {OptionsAuthPlugin} from './types'
import type { App, DirectiveBinding, VNode } from 'vue'

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
  }
}

function createAuthPlugin (options: OptionsAuthPlugin) {
  return (app: App) => {
    service = new AuthService(options)
    app.directive('auth', directive)
  }
}


export {
  createAuthPlugin,
  service as useAuthService
}
