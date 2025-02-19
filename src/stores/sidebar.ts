import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    isCollapse: false,
  }),
  actions: {
    toggle() {
      this.isCollapse = !this.isCollapse
    },
  },
})
