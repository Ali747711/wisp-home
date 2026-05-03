import { createContext, useContext } from "react"

export type DemoBubbleApi = {
  open: boolean
  setOpen: (next: boolean) => void
  openWith: (prompt: string) => void
  requestId: number
}

export const DemoBubbleContext = createContext<DemoBubbleApi | null>(null)

const NOOP_API: DemoBubbleApi = {
  open: false,
  setOpen: () => undefined,
  openWith: () => undefined,
  requestId: 0,
}

export function useDemoBubble(): DemoBubbleApi {
  return useContext(DemoBubbleContext) ?? NOOP_API
}
