import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'produtos', component: () => import('../views/ProdutosList.vue') },
  { path: '/produtos/novo', name: 'produto-new', component: () => import('../views/ProdutoForm.vue') },
  { path: '/produtos/:id', name: 'produto-edit', component: () => import('../views/ProdutoForm.vue') },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
