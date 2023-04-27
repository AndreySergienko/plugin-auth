export type OptionsAuthPlugin = {
  fetch: fetchMethod
}

export type dataAuthPlugin = {
  permissions: string[]
}

export type fetchMethod = () => Promise<dataAuthPlugin>

export type userScopesAuthPlugin = {
  [x: string]: string
}

export * from './index'
