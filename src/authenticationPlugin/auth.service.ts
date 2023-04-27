import type {
  userScopesAuthPlugin,
  OptionsAuthPlugin,
  fetchMethod, dataAuthPlugin
} from './types'

export default class AuthService {
  userScopes: userScopesAuthPlugin
  private readonly storage: Storage
  private readonly fetchMethod: fetchMethod

  constructor(options: OptionsAuthPlugin) {
    this.userScopes = {}
    this.storage = options.storage
    this.fetchMethod = options.fetch
  }

  fetchUser = async () => {
    const token = this.storage.getItem('token')
    if (!token) return
    const data: dataAuthPlugin | undefined = await this.fetchMethod(token)
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
