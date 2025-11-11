// /utils/getTripImage.ts
export function getTripImage(location?: string, themes?: string[]): string {
  const t = (themes && themes[0]?.toLowerCase()) || ''

  const themeLookup: Record<string, string> = {
    nature: 'https://images.unsplash.com/photo-1654002341119-9aeee80cf507?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1172',
    adventure: 'https://plus.unsplash.com/premium_photo-1661838721521-046397d4129a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1172',
    food: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&q=80&w=2000',
    sports: 'https://images.unsplash.com/photo-1674760726595-d12f5e45482a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
    shopping: 'https://images.unsplash.com/photo-1542052125323-e69ad37a47c2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
  }

  for (const [key, url] of Object.entries(themeLookup)) {
    if (t.includes(key)) return url
  }


  return `https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000'
  )}`
}
