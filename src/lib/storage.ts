// Simple localStorage-based image storage using base64
export const storageService = {
  async uploadImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        const base64String = e.target?.result as string
        resolve(base64String)
      }
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'))
      }
      
      reader.readAsDataURL(file)
    })
  },

  async deleteImage(fileUrl: string): Promise<void> {
    // No-op for localStorage - images are stored as base64 in the hobby object
    return Promise.resolve()
  },

  getPublicUrl(filePath: string): string {
    return filePath
  },
}