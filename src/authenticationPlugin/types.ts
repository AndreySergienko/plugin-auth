import type {RouteLocationNormalized, RouteLocationRaw, NavigationGuardNext} from 'vue-router'

export type OptionsAuthPlugin = {
  fetch: fetchMethod
}

export type dataAuthPlugin = {
  permissions: string[]
}

export type setScopes = (data: dataAuthPlugin) => void

export type fetchMethod = (setScopes: setScopes) => Promise<void>

export type userScopesAuthPlugin = {
  [x: string]: string
}

export type accessGuard = (to: RouteLocationNormalized) => RouteLocationRaw | undefined

export * from './index'

declare module 'vue-router' {
  interface RouteMeta {
    accessScopes?: string[]
  }
}
