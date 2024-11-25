import { create } from "zustand"

// This is used to change the queue when we reset the song between different tabs
type QueueStore = {
    activeQueueId : string | null,
    setActiveQueueId: (id:string) => void
}

export const useQueueStore = create<QueueStore>()((set)=>({
    activeQueueId: null,
    setActiveQueueId: (id) => set({activeQueueId : id}),
}))

export const useQueue = () => useQueueStore((state) => state)

