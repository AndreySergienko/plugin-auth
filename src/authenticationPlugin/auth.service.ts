import type {
  userScopesAuthPlugin,
  OptionsAuthPlugin,
  fetchMethod, dataAuthPlugin
} from './types'

export default class AuthService {
  userScopes: userScopesAuthPlugin
  private readonly fetchMethod: fetchMethod

  constructor(options: OptionsAuthPlugin) {
    this.userScopes = {}
    this.fetchMethod = options.fetch
  }

  fetchUser = async () => {
    const data: dataAuthPlugin | undefined = await this.fetchMethod()
    if (!data) {
      throw new Error('Data is invalid')
    }
    data.permissions.forEach((perm) => (this.userScopes[perm] = perm))
  }

  checkHasScope = (scopes: string[]) => {
    if (!scopes.length) return false
    return scopes.every((scope) => this.userScopes[scope])
  }
}
