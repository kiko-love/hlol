/**
 * 基础路由
 * @type { *[] }
 */
 import {AppSider, DemoMenu} from '@/layouts'

 const RouteView = {
   name: 'RouteView',
   render: (h) => h('router-view')
 }
export const constantRouterMap = [
  {
    path: '/',
    component: AppSider,
    children: [
      {
        path: '/smenu',
        name: 'smenu',
        component: DemoMenu,
        children: [
          {
            path: '/smenu/file/index',
            name: 'DemoFileIndex',
            component: () => import('@/views/smenu/file/Index')
          },
          {
            path: '/smenu/socket/index',
            name: 'DemoSocketIndex',
            component: () => import('@/views/smenu/socket/Index')
          },
          {
            path: '/smenu/windowview/index',
            name: 'DemoWindowViewIndex',
            component: () => import('@/views/smenu/windowview/Index')
          },
          {
            path: '/smenu/window/index',
            name: 'DemoWindowIndex',
            component: () => import('@/views/smenu/window/Index')
          },
          {
            path: '/smenu/extension/index',
            name: 'DemoExtensionIndex',
            component: () => import('@/views/smenu/extension/Index')
          },
          {
            path: '/smenu/notification/index',
            name: 'DemoNotificationIndex',
            component: () => import('@/views/smenu/notification/Index')
          },
          {
            path: '/smenu/powermonitor/index',
            name: 'DemoPowerMonitorIndex',
            component: () => import('@/views/smenu/powermonitor/Index')
          },
          {
            path: '/smenu/screen/index',
            name: 'DemoScreenIndex',
            component: () => import('@/views/smenu/screen/Index')
          },
          {
            path: '/smenu/theme/index',
            name: 'DemoThemeIndex',
            component: () => import('@/views/smenu/theme/Index')
          },                               
          {
            path: '/smenu/shortcut/index',
            name: 'DemoShortcutIndex',
            component: () => import('@/views/smenu/shortcut/Index')
          },
          {
            path: '/smenu/software/open',
            name: 'DemoSoftwareIndex',
            component: () => import('@/views/smenu/software/Index')
          },
          {
            path: '/smenu/system/index',
            name: 'DemoSystemIndex',
            component: () => import('@/views/smenu/system/Index')
          },
          {
            path: '/smenu/testapi/index',
            name: 'DemoTestApiIndex',
            component: () => import('@/views/smenu/testapi/Index')
          },
        ]  
      },
      {
        path: '/other/index',
        name: 'OtherIndex',
        component: () => import('@/views/other/Index')
      }
    ]
  }
]
