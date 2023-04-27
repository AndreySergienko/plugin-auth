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

export type middlewareFetch = Promise<void> | undefined

export * from './index'
