import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { AgentChat, useChat } from "@wisp/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { SparklesIcon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import {
  DemoBubbleContext,
  useDemoBubble,
  type DemoBubbleApi,
} from "./demo-bubble-context"

const SUGGESTIONS = [
  "Create a task to write the README",
  "List my open tasks",
  "Summarize my open pull requests",
]

export function DemoBubbleProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [requestId, setRequestId] = useState(0)
  const pendingPromptRef = useRef<string | null>(null)

  const openWith = useCallback((prompt: string) => {
    pendingPromptRef.current = prompt
    setOpen(true)
    setRequestId((id) => id + 1)
  }, [])

  const value = useMemo<DemoBubbleApi>(
    () => ({ open, setOpen, openWith, requestId }),
    [open, openWith, requestId]
  )

  return (
    <DemoBubbleContext.Provider value={value}>
      {children}
      <FloatingBubble pendingPromptRef={pendingPromptRef} />
    </DemoBubbleContext.Provider>
  )
}

function FloatingBubble({
  pendingPromptRef,
}: {
  pendingPromptRef: React.MutableRefObject<string | null>
}) {
  const { open, setOpen } = useDemoBubble()

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open agent"
          className={cn(
            "fixed bottom-5 right-5 z-50 inline-flex size-14 items-center justify-center rounded-full",
            "bg-primary text-primary-foreground border-primary/40 border",
            "shadow-[0_8px_28px_-6px_color-mix(in_oklab,var(--primary)_55%,transparent),0_0_0_6px_color-mix(in_oklab,var(--primary)_18%,transparent)]",
            "transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
            "data-[state=open]:scale-95"
          )}
        >
          <HugeiconsIcon icon={SparklesIcon} size={22} strokeWidth={2.2} />
          <span className="bg-background absolute right-1 top-1 size-2.5 rounded-full ring-2 ring-primary">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60" />
          </span>
          <span className="sr-only">Open agent</span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content
          className={cn(
            "fixed z-50 flex flex-col overflow-hidden",
            "bottom-24 right-5 left-5 sm:left-auto",
            "h-[min(620px,calc(100vh-7rem))] w-auto sm:w-[400px]",
            "border-border/60 bg-card rounded-2xl border",
            "shadow-[0_30px_80px_-30px_color-mix(in_oklab,var(--primary)_45%,transparent),0_8px_24px_-8px_rgba(0,0,0,0.25)]",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-2",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-bottom-2"
          )}
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">Ask wisp</Dialog.Title>
          <ChatBody pendingPromptRef={pendingPromptRef} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function ChatBody({
  pendingPromptRef,
}: {
  pendingPromptRef: React.MutableRefObject<string | null>
}) {
  const { send, isStreaming } = useChat()
  const { open, setOpen, requestId } = useDemoBubble()

  useEffect(() => {
    if (!open) return
    if (isStreaming) return
    const prompt = pendingPromptRef.current
    if (!prompt) return
    pendingPromptRef.current = null
    void send(prompt)
  }, [open, requestId, isStreaming, pendingPromptRef, send])

  return (
    <div className="flex h-full flex-col">
      <AgentChat
        title="wisp demo agent"
        suggestions={SUGGESTIONS}
        onClose={() => setOpen(false)}
      />
    </div>
  )
}
