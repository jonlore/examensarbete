import { useSupabaseClient } from '#imports'

export type Trip = {
  id: string
  public_id: string
  title: string
  location: string
  themes: string[]
  saved: boolean
  saves_count: number
  owner_id?: string
  created_at: string
}

export default function useTrips() {
  const supabase = useSupabaseClient()

  // --- State ---
  const trips = ref<Trip[]>([])
  const page = ref(0)
  const limit = 8
  const loading = ref(false)
  const hasMore = ref(true)

  const searchQuery = ref('')
  const selectedCategory = ref('All')
  const sortBy = ref('created_at.desc')

  // --- Fetch Trips ---
  async function loadTrips() {
    if (loading.value || !hasMore.value) return
    loading.value = true

    const from = page.value * limit
    const to = from + limit - 1
    const [column, direction] = sortBy.value.split('.')

    let query = supabase
      .from('trips')
      .select('*')
      .order(column, { ascending: direction === 'asc' })
      .range(from, to)

    if (selectedCategory.value !== 'All') {
      query = query.contains('themes', [selectedCategory.value])
    }

    if (searchQuery.value.trim()) {
      const term = `%${searchQuery.value.trim()}%`
      query = query.or(`title.ilike.${term},location.ilike.${term}`)
    }

    const { data, error } = await query
    if (error) {
      console.error(error)
      loading.value = false
      return
    }

    if (data.length < limit) hasMore.value = false

    trips.value.push(
      ...data.map((trip: Trip) => ({
        ...trip,
        link: `/trip/${trip.public_id}`,
        savesCount: trip.saves_count,
      }))
    )

    page.value++
    loading.value = false
  }

  function resetAndLoad() {
    trips.value = []
    page.value = 0
    hasMore.value = true
    loadTrips()
  }

  return {
    trips,
    loading,
    hasMore,
    searchQuery,
    selectedCategory,
    sortBy,
    loadTrips,
    resetAndLoad,
  }
}
