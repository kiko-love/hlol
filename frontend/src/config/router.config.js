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
    component: () => import('@/components/appTop.vue'),
    redirect: '/index',
    children: [
      {
        path:'/index',
        component:AppSider,
        children: [
          {
            path: '/index/herolist',
            name: 'heroList',
            component: () => import('@/views/smenu/heroList/Index'), 
            meta: {
              keepAlive: true // 需要缓存页面
            }
          },
          {
            path: '/index/heroDetail',
            name: 'heroDetail',
            component: () => import('@/views/smenu/heroDetail/Index')
          },
          {
            path: '/index/other',
            name: 'OtherIndex',
            component: () => import('@/views/other/Index')
          }
        ]
      }
    ]
  }
]
