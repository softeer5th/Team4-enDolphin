/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const MyScheduleIndexLazyImport = createFileRoute('/my-schedule/')()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const MyScheduleIndexLazyRoute = MyScheduleIndexLazyImport.update({
  id: '/my-schedule/',
  path: '/my-schedule/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/my-schedule/index.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/my-schedule/': {
      id: '/my-schedule/'
      path: '/my-schedule'
      fullPath: '/my-schedule'
      preLoaderRoute: typeof MyScheduleIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/my-schedule': typeof MyScheduleIndexLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/my-schedule': typeof MyScheduleIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/my-schedule/': typeof MyScheduleIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/my-schedule'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/my-schedule'
  id: '__root__' | '/' | '/my-schedule/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  MyScheduleIndexLazyRoute: typeof MyScheduleIndexLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  MyScheduleIndexLazyRoute: MyScheduleIndexLazyRoute,
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
        "/my-schedule/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/my-schedule/": {
      "filePath": "my-schedule/index.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
