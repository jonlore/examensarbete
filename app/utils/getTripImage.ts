// /utils/getTripImage.ts
export function getTripImage(location?: string, themes?: string[]): string {
  const l = location?.toLowerCase() || ''
  const t = (themes && themes[0]?.toLowerCase()) || ''

  // Theme-based
  const themeLookup: Record<string, string> = {
    hiking:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=2000',
    beach:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000',
    food:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2000',
    culture:
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=2000',
    adventure:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000',
    nature:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000',
    relaxation:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000',
  }

  for (const [key, url] of Object.entries(themeLookup)) {
    if (t.includes(key)) return url
  }

  // --- fallback to location-based ---
  const locationLookup: Record<string, string> = {
    europe:
      'https://images.unsplash.com/photo-1526747706152-4c4a035b81b4?auto=format&fit=crop&q=80&w=2000',
    asia:
      'https://images.unsplash.com/photo-1504788362161-1d36bffb71a3?auto=format&fit=crop&q=80&w=2000',
    africa:
      'https://images.unsplash.com/photo-1500534314209-a26db0f5b7f9?auto=format&fit=crop&q=80&w=2000',
    america:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000',
    oceania:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000',
    iceland:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=1966',
    japan:
      'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&q=80&w=2070',
    indonesia:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1966',
  }

  for (const [key, url] of Object.entries(locationLookup)) {
    if (l.includes(key)) return url
  }

  // fallback
  return `https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000'
  )}`
}
