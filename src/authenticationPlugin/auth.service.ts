import type {
  userScopesAuthPlugin,
  OptionsAuthPlugin,
  fetchMethod, dataAuthPlugin
} from './types'

export default class AuthService {
  public userScopes: userScopesAuthPlugin
  private readonly fetchMethod: fetchMethod

  constructor(options: OptionsAuthPlugin) {
    this.userScopes = {}
    this.fetchMethod = options.fetch
  }

  private setScopes = (data: dataAuthPlugin) => {
    data.permissions.forEach((perm) => this.userScopes[perm] = perm)
  }

  public fetchUser = async (): Promise<void> => {
    await this.fetchMethod(this.setScopes)
  }

  public checkHasScope = (scopes: string[]): boolean => {
    if (!scopes.length) return false
    return scopes.every((scope) => this.userScopes[scope])
  }
}
