import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb/types'
let firstMenu: any = undefined
let firstRoute: RouteRecordRaw | undefined = undefined

export function menuMapToRoutes(userMeus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 获取本地所有路由
  const locaRoutes: RouteRecordRaw[] = []
  // 2.菜单映射

  const _recurseGetRoute = (menus: any) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = locaRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstRoute && !firstMenu) {
          firstMenu = menu
          firstRoute = route
        }
      } else {
        _recurseGetRoute(menu.children ?? [])
      }
    }
  }
  _recurseGetRoute(userMeus)
  return routes
}
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const firstMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (firstMenu) {
        breadcrumbs?.push({ name: menu.name, path: '/' })
        breadcrumbs?.push({ name: firstMenu.name, path: '/' })
        return firstMenu
      }
    } else if (menu.type === 2 && menu.ur === currentPath) {
      return menu
    }
  }
}
export { firstRoute }
