import { create } from 'zustand'
import { PhotoWithUserID, Post } from '../types'
import { createJSONStorage, persist } from 'zustand/middleware'

export type FavoriteStore = {
    count: number
    photoData:PhotoWithUserID[] | null
    postData:Post[] | null
    inc: () => void
    setPhotoData: (data:PhotoWithUserID) => void
    setPostData: (data:Post) => void
  }
  
  export const useMyStore = create<FavoriteStore>()(persist(
    (set) => ({
      count: 0,
      photoData: null,
      postData: null,
      inc: () => set((state) => ({ count: state.count + 1 })),
      setPhotoData: (data) => set((state) => ({ photoData: state.photoData ? [...state.photoData, data] : [data] })),
      setPostData: (pdata) => set((state) => ({ postData: state.postData ? [...state.postData, pdata] : [pdata], photoData: state.photoData })),
    }),
    {name: 'allData-storage',
    storage: createJSONStorage(() => localStorage),},
  ))
export default useMyStore