import type {RouteLocationNormalized, RouteLocationRaw} from 'vue-router'

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
export type accessGuard = (to: RouteLocationNormalized) => RouteLocationRaw | undefined

export * from './index'

declare module 'vue-router' {
  interface RouteMeta {
    accessScopes?: string[]
  }
}
