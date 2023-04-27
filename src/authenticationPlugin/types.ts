export type OptionsAuthPlugin = {
  storage: Storage,
  fetch: fetchMethod
}

export type dataAuthPlugin = {
  permissions: string[]
}

export type fetchMethod = (token: string) => Promise<dataAuthPlugin>

export type userScopesAuthPlugin = {
  [x: string]: string
}

export * from './index'
