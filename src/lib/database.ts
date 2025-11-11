// Simple localStorage-based database
export interface Hobby {
  id: number
  user_id: string
  title: string
  date: string
  description: string | null
  tags: string[]
  category: string
  image_url: string | null
  created_at: string
  updated_at: string
}

const HOBBIES_KEY = 'hobbies_data'

// Helper to get hobbies from localStorage
const getHobbies = (): Hobby[] => {
  const data = localStorage.getItem(HOBBIES_KEY)
  return data ? JSON.parse(data) : []
}

// Helper to save hobbies to localStorage
const saveHobbies = (hobbies: Hobby[]): void => {
  localStorage.setItem(HOBBIES_KEY, JSON.stringify(hobbies))
}

// Hobby operations (CRUD)
export const hobbyService = {
  async getAllHobbies(): Promise<Hobby[]> {
    return getHobbies()
  },

  async getUserHobbies(userId: string): Promise<Hobby[]> {
    const hobbies = getHobbies()
    return hobbies.filter(h => h.user_id === userId)
  },

  async getHobbyById(hobbyId: number): Promise<Hobby | null> {
    const hobbies = getHobbies()
    return hobbies.find(h => h.id === hobbyId) || null
  },

  async createHobby(
    userId: string,
    hobby: Omit<Hobby, 'id' | 'user_id' | 'created_at' | 'updated_at'>
  ): Promise<Hobby> {
    const hobbies = getHobbies()
    const newHobby: Hobby = {
      ...hobby,
      id: Date.now(),
      user_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    hobbies.unshift(newHobby)
    saveHobbies(hobbies)
    return newHobby
  },

  async updateHobby(hobbyId: number, updates: Partial<Hobby>): Promise<Hobby> {
    const hobbies = getHobbies()
    const index = hobbies.findIndex(h => h.id === hobbyId)
    if (index === -1) throw new Error('Hobby not found')
    
    hobbies[index] = {
      ...hobbies[index],
      ...updates,
      updated_at: new Date().toISOString()
    }
    saveHobbies(hobbies)
    return hobbies[index]
  },

  async deleteHobby(hobbyId: number): Promise<void> {
    const hobbies = getHobbies()
    const filtered = hobbies.filter(h => h.id !== hobbyId)
    saveHobbies(filtered)
  },
}