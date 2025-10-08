import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotifications = defineStore('notifications', () => {
  const items = ref<Array<{ id: number; message: string; type?: 'success'|'error' }>>([])
  let seq = 1

  function push(message: string, type: 'success'|'error' = 'success') {
    const id = seq++
    items.value.push({ id, message, type })
    setTimeout(() => {
      items.value = items.value.filter(i => i.id !== id)
    }, 4000)
  }

  function remove(id: number) {
    items.value = items.value.filter(i => i.id !== id)
  }

  return { items, push, remove }
})
