import { defineStore } from 'pinia'
import { set } from 'zod'

export const useTripStore = defineStore('trip', {
  state: () => ({
        remixTrip: null as any | null,
        editTrip: null as any | null,
  }),
  actions: {
    setRemixTrip(trip: any) {
      this.remixTrip = trip
    },
    clearRemixTrip() {
      this.remixTrip = null
      },
    setEditTrip(trip: any) {
        this.editTrip = trip
    },
    clearEditTrip() {
        this.editTrip = null
    },
  },
})
