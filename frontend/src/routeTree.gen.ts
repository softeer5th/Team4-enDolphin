/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as MainImport } from './routes/_main'
import { Route as IndexImport } from './routes/index'
import { Route as LandingIndexImport } from './routes/landing/index'
import { Route as DiscussionCreateIndexImport } from './routes/discussion/create/index'
import { Route as DiscussionInviteIdImport } from './routes/discussion/invite/$id'
import { Route as DiscussionEditIdImport } from './routes/discussion/edit/$id'
import { Route as DiscussionCreateIdImport } from './routes/discussion/create/$id'

// Create Virtual Routes

const LoginIndexLazyImport = createFileRoute('/login/')()
const MainMyScheduleIndexLazyImport = createFileRoute('/_main/my-schedule/')()

// Create/Update Routes

const MainRoute = MainImport.update({
  id: '/_main',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const LoginIndexLazyRoute = LoginIndexLazyImport.update({
  id: '/login/',
  path: '/login/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login/index.lazy').then((d) => d.Route))

const LandingIndexRoute = LandingIndexImport.update({
  id: '/landing/',
  path: '/landing/',
  getParentRoute: () => rootRoute,
} as any)

const MainMyScheduleIndexLazyRoute = MainMyScheduleIndexLazyImport.update({
  id: '/my-schedule/',
  path: '/my-schedule/',
  getParentRoute: () => MainRoute,
} as any).lazy(() =>
  import('./routes/_main/my-schedule/index.lazy').then((d) => d.Route),
)

const DiscussionCreateIndexRoute = DiscussionCreateIndexImport.update({
  id: '/discussion/create/',
  path: '/discussion/create/',
  getParentRoute: () => rootRoute,
} as any)

const DiscussionInviteIdRoute = DiscussionInviteIdImport.update({
  id: '/discussion/invite/$id',
  path: '/discussion/invite/$id',
  getParentRoute: () => rootRoute,
} as any)

const DiscussionEditIdRoute = DiscussionEditIdImport.update({
  id: '/discussion/edit/$id',
  path: '/discussion/edit/$id',
  getParentRoute: () => rootRoute,
} as any)

const DiscussionCreateIdRoute = DiscussionCreateIdImport.update({
  id: '/discussion/create/$id',
  path: '/discussion/create/$id',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_main': {
      id: '/_main'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof MainImport
      parentRoute: typeof rootRoute
    }
    '/landing/': {
      id: '/landing/'
      path: '/landing'
      fullPath: '/landing'
      preLoaderRoute: typeof LandingIndexImport
      parentRoute: typeof rootRoute
    }
    '/login/': {
      id: '/login/'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/discussion/create/$id': {
      id: '/discussion/create/$id'
      path: '/discussion/create/$id'
      fullPath: '/discussion/create/$id'
      preLoaderRoute: typeof DiscussionCreateIdImport
      parentRoute: typeof rootRoute
    }
    '/discussion/edit/$id': {
      id: '/discussion/edit/$id'
      path: '/discussion/edit/$id'
      fullPath: '/discussion/edit/$id'
      preLoaderRoute: typeof DiscussionEditIdImport
      parentRoute: typeof rootRoute
    }
    '/discussion/invite/$id': {
      id: '/discussion/invite/$id'
      path: '/discussion/invite/$id'
      fullPath: '/discussion/invite/$id'
      preLoaderRoute: typeof DiscussionInviteIdImport
      parentRoute: typeof rootRoute
    }
    '/discussion/create/': {
      id: '/discussion/create/'
      path: '/discussion/create'
      fullPath: '/discussion/create'
      preLoaderRoute: typeof DiscussionCreateIndexImport
      parentRoute: typeof rootRoute
    }
    '/_main/my-schedule/': {
      id: '/_main/my-schedule/'
      path: '/my-schedule'
      fullPath: '/my-schedule'
      preLoaderRoute: typeof MainMyScheduleIndexLazyImport
      parentRoute: typeof MainImport
    }
  }
}

// Create and export the route tree

interface MainRouteChildren {
  MainMyScheduleIndexLazyRoute: typeof MainMyScheduleIndexLazyRoute
}

const MainRouteChildren: MainRouteChildren = {
  MainMyScheduleIndexLazyRoute: MainMyScheduleIndexLazyRoute,
}

const MainRouteWithChildren = MainRoute._addFileChildren(MainRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof MainRouteWithChildren
  '/landing': typeof LandingIndexRoute
  '/login': typeof LoginIndexLazyRoute
  '/discussion/create/$id': typeof DiscussionCreateIdRoute
  '/discussion/edit/$id': typeof DiscussionEditIdRoute
  '/discussion/invite/$id': typeof DiscussionInviteIdRoute
  '/discussion/create': typeof DiscussionCreateIndexRoute
  '/my-schedule': typeof MainMyScheduleIndexLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof MainRouteWithChildren
  '/landing': typeof LandingIndexRoute
  '/login': typeof LoginIndexLazyRoute
  '/discussion/create/$id': typeof DiscussionCreateIdRoute
  '/discussion/edit/$id': typeof DiscussionEditIdRoute
  '/discussion/invite/$id': typeof DiscussionInviteIdRoute
  '/discussion/create': typeof DiscussionCreateIndexRoute
  '/my-schedule': typeof MainMyScheduleIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_main': typeof MainRouteWithChildren
  '/landing/': typeof LandingIndexRoute
  '/login/': typeof LoginIndexLazyRoute
  '/discussion/create/$id': typeof DiscussionCreateIdRoute
  '/discussion/edit/$id': typeof DiscussionEditIdRoute
  '/discussion/invite/$id': typeof DiscussionInviteIdRoute
  '/discussion/create/': typeof DiscussionCreateIndexRoute
  '/_main/my-schedule/': typeof MainMyScheduleIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/landing'
    | '/login'
    | '/discussion/create/$id'
    | '/discussion/edit/$id'
    | '/discussion/invite/$id'
    | '/discussion/create'
    | '/my-schedule'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/landing'
    | '/login'
    | '/discussion/create/$id'
    | '/discussion/edit/$id'
    | '/discussion/invite/$id'
    | '/discussion/create'
    | '/my-schedule'
  id:
    | '__root__'
    | '/'
    | '/_main'
    | '/landing/'
    | '/login/'
    | '/discussion/create/$id'
    | '/discussion/edit/$id'
    | '/discussion/invite/$id'
    | '/discussion/create/'
    | '/_main/my-schedule/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  MainRoute: typeof MainRouteWithChildren
  LandingIndexRoute: typeof LandingIndexRoute
  LoginIndexLazyRoute: typeof LoginIndexLazyRoute
  DiscussionCreateIdRoute: typeof DiscussionCreateIdRoute
  DiscussionEditIdRoute: typeof DiscussionEditIdRoute
  DiscussionInviteIdRoute: typeof DiscussionInviteIdRoute
  DiscussionCreateIndexRoute: typeof DiscussionCreateIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  MainRoute: MainRouteWithChildren,
  LandingIndexRoute: LandingIndexRoute,
  LoginIndexLazyRoute: LoginIndexLazyRoute,
  DiscussionCreateIdRoute: DiscussionCreateIdRoute,
  DiscussionEditIdRoute: DiscussionEditIdRoute,
  DiscussionInviteIdRoute: DiscussionInviteIdRoute,
  DiscussionCreateIndexRoute: DiscussionCreateIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_main",
        "/landing/",
        "/login/",
        "/discussion/create/$id",
        "/discussion/edit/$id",
        "/discussion/invite/$id",
        "/discussion/create/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_main": {
      "filePath": "_main.tsx",
      "children": [
        "/_main/my-schedule/"
      ]
    },
    "/landing/": {
      "filePath": "landing/index.tsx"
    },
    "/login/": {
      "filePath": "login/index.lazy.tsx"
    },
    "/discussion/create/$id": {
      "filePath": "discussion/create/$id.tsx"
    },
    "/discussion/edit/$id": {
      "filePath": "discussion/edit/$id.tsx"
    },
    "/discussion/invite/$id": {
      "filePath": "discussion/invite/$id.tsx"
    },
    "/discussion/create/": {
      "filePath": "discussion/create/index.tsx"
    },
    "/_main/my-schedule/": {
      "filePath": "_main/my-schedule/index.lazy.tsx",
      "parent": "/_main"
    }
  }
}
ROUTE_MANIFEST_END */
