
const routes = [
  {
    path: '/',
    component: () => import('layouts/default.vue'),
    children: [
      { name: 'home', path: '', component: () => import('components/Home') },
      { name: 'addword', path: 'addword', component: () => import('components/Addword') },
      { name: 'allwords', path: 'allwords', component: () => import('components/Allwords') },
      { name: 'editword', path: 'word/:id', component: () => import('components/Editword') },
      { name: 'settings', path: 'settings', component: () => import('components/Settings') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
