import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { createPortal } from "react-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  SparklesIcon,
  Cancel01Icon,
  ArrowUp01Icon,
  StopCircleIcon,
  Tick02Icon,
  RefreshIcon,
  CodeIcon,
  CommandIcon,
  ArrowRight01Icon,
  Layers01Icon,
  TasbihFreeIcons,
  Agreement01Icon,
  Chat01Icon,
} from "@hugeicons/core-free-icons"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import {
  DemoBubbleContext,
  useDemoBubble,
  type DemoBubbleApi,
} from "./demo-bubble-context"
import { getResponseFrames, type Frame } from "@/demo/fixtures"

const SUGGESTIONS: {
  icon: typeof SparklesIcon
  label: string
  prompt: string
}[] = [
  {
    icon: TasbihFreeIcons,
    label: "Create a task",
    prompt: "Create a task to write the README, due Friday",
  },
  {
    icon: Tick02Icon,
    label: "List my open tasks",
    prompt: "List my open tasks",
  },
  {
    icon: Layers01Icon,
    label: "Summarize open PRs",
    prompt: "Summarize my open pull requests",
  },
]

type ToolCallEvent = {
  id: string
  name: string
  args: Record<string, unknown>
  result?: unknown
}

type ChatMessage =
  | { id: string; role: "user"; text: string }
  | {
      id: string
      role: "assistant"
      text: string
      toolCalls: ToolCallEvent[]
      streaming: boolean
    }

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
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, setOpen])

  if (!mounted) return null

  return createPortal(
    <>
      <Launcher open={open} onClick={() => setOpen(!open)} />
      {open && (
        <ChatPanel
          pendingPromptRef={pendingPromptRef}
          onClose={() => setOpen(false)}
        />
      )}
    </>,
    document.body
  )
}

function Launcher({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <div className="fixed right-5 bottom-5 z-[60] flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={onClick}
        aria-label={open ? "Close agent" : "Open agent"}
        aria-expanded={open}
        className={cn(
          "group relative isolate inline-flex h-14 items-center gap-2.5 overflow-hidden rounded-full pr-5 pl-3 transition-all duration-300",
          "bg-card/95 backdrop-blur-xl",
          "shadow-[0_10px_36px_-8px_color-mix(in_oklab,var(--primary)_55%,transparent),0_2px_0_0_color-mix(in_oklab,var(--foreground)_5%,transparent)_inset]",
          "hover:scale-[1.02]",
          "focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none",
          open && "scale-95"
        )}
      >
        <span
          aria-hidden="true"
          className="absolute -inset-px -z-10 rounded-full p-px"
          style={{
            background:
              "conic-gradient(from 180deg, color-mix(in oklab, var(--primary) 80%, transparent), transparent 30%, color-mix(in oklab, var(--primary) 60%, transparent) 60%, transparent 90%)",
          }}
        >
          <span className="animate-spin-slow block h-full w-full rounded-full" />
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-px -z-10 rounded-full bg-card/95 backdrop-blur-xl"
        />

        <span className="relative flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_18px_-2px_color-mix(in_oklab,var(--primary)_70%,transparent)]">
          <HugeiconsIcon
            icon={open ? Cancel01Icon : ArrowUp01Icon}
            size={16}
            strokeWidth={2.2}
            className="transition-transform duration-300"
          />
          {!open && (
            <>
              <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-400 ring-2 ring-card" />
              <span
                aria-hidden="true"
                className="animate-soft-ping absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-400"
              />
            </>
          )}
        </span>
        <span className="flex flex-col items-start leading-tight">
          <span className="font-heading text-[13px] font-semibold tracking-tight text-foreground">
            {open ? "Close" : "Ask wisp"}
          </span>
          <span className="font-mono-tabular text-[10px] text-muted-foreground">
            {open ? "esc" : "demo agent"}
          </span>
        </span>
      </button>
    </div>
  )
}

function ChatPanel({
  pendingPromptRef,
  onClose,
}: {
  pendingPromptRef: React.MutableRefObject<string | null>
  onClose: () => void
}) {
  const { requestId } = useDemoBubble()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [streaming, setStreaming] = useState(false)
  const abortRef = useRef<{ aborted: boolean } | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const send = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return

    const userId = `u_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`
    const assistantId = `a_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`
    setMessages((prev) => [
      ...prev,
      { id: userId, role: "user", text: trimmed },
      {
        id: assistantId,
        role: "assistant",
        text: "",
        toolCalls: [],
        streaming: true,
      },
    ])
    setInput("")
    setStreaming(true)

    const token = { aborted: false }
    abortRef.current = token

    const frames = getResponseFrames(trimmed)
    for (const frame of frames) {
      if (token.aborted) break
      await wait(frame.delay ?? 80)
      if (token.aborted) break
      applyFrame(setMessages, assistantId, frame)
    }

    setMessages((prev) =>
      prev.map((m) =>
        m.id === assistantId && m.role === "assistant"
          ? { ...m, streaming: false }
          : m
      )
    )
    setStreaming(false)
    abortRef.current = null
  }, [])

  function stop() {
    if (abortRef.current) abortRef.current.aborted = true
  }

  function reset() {
    stop()
    setMessages([])
  }

  useEffect(() => {
    if (streaming) return
    const prompt = pendingPromptRef.current
    if (!prompt) return
    pendingPromptRef.current = null
    void send(prompt)
  }, [requestId, streaming, pendingPromptRef, send])

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages])

  useEffect(() => {
    const t = setTimeout(() => textareaRef.current?.focus(), 120)
    return () => clearTimeout(t)
  }, [])

  function autosize(el: HTMLTextAreaElement) {
    el.style.height = "auto"
    const max = 120
    el.style.height = `${Math.min(el.scrollHeight, max)}px`
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (streaming) return
    void send(input)
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (!streaming) void send(input)
    }
  }

  return (
    <div
      role="dialog"
      aria-label="wisp demo agent"
      className={cn(
        "fixed z-[60]",
        "right-5 bottom-24 left-5 sm:left-auto",
        "h-[min(680px,calc(100vh-7rem))] w-auto sm:w-[440px]",
        "animate-msg-in"
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-3 -z-10 rounded-[28px]"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--primary) 35%, transparent), transparent 70%)",
          filter: "blur(24px)",
        }}
      />

      <div
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-[22px]",
          "border border-border/70 bg-card/95 backdrop-blur-xl",
          "shadow-[0_30px_80px_-30px_color-mix(in_oklab,var(--primary)_45%,transparent),0_8px_28px_-10px_rgba(0,0,0,0.35),0_0_0_1px_color-mix(in_oklab,var(--primary)_12%,transparent)]"
        )}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
        />

        <ChatHeader
          streaming={streaming}
          onReset={reset}
          onClose={onClose}
          hasMessages={messages.length > 0}
        />

        <div className="relative flex-1 overflow-hidden">
          <span
            aria-hidden="true"
            className="bg-dotgrid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent_75%)] opacity-30"
          />
          <ScrollArea className="h-full">
            <div ref={viewportRef} className="px-4">
              {messages.length === 0 ? (
                <EmptyState onPick={(p) => void send(p)} />
              ) : (
                <ol className="flex flex-col gap-4 py-5">
                  {messages.map((m, i) => {
                    const prev = messages[i - 1]
                    const groupedWithPrev = prev?.role === m.role
                    return (
                      <MessageBubble
                        key={m.id}
                        message={m}
                        groupedWithPrev={groupedWithPrev}
                      />
                    )
                  })}
                </ol>
              )}
            </div>
          </ScrollArea>
        </div>

        <Composer
          input={input}
          onChange={(v) => {
            setInput(v)
            if (textareaRef.current) autosize(textareaRef.current)
          }}
          onSubmit={handleSubmit}
          onKey={handleKey}
          streaming={streaming}
          onStop={stop}
          textareaRef={textareaRef}
        />
      </div>
    </div>
  )
}

function ChatHeader({
  streaming,
  onReset,
  onClose,
  hasMessages,
}: {
  streaming: boolean
  onReset: () => void
  onClose: () => void
  hasMessages: boolean
}) {
  return (
    <header className="relative flex items-center gap-3 border-b border-border/60 bg-gradient-to-b from-muted/40 to-transparent px-4 py-3">
      <Avatar className="size-9 border border-primary/30 shadow-[0_0_18px_-4px_color-mix(in_oklab,var(--primary)_60%,transparent)]">
        <AvatarFallback className="bg-primary text-primary-foreground">
          <HugeiconsIcon icon={Agreement01Icon} size={15} strokeWidth={2.2} />
        </AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-1 flex-col leading-tight">
        <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold tracking-tight text-foreground">
          wisp
          <Badge
            variant="outline"
            className="font-mono-tabular h-4 rounded-full border-primary/30 bg-primary/10 px-1.5 text-[9px] tracking-widest text-primary uppercase"
          >
            demo
          </Badge>
        </span>
        <span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <span aria-hidden="true" className="relative inline-flex size-1.5">
            <span className="absolute inset-0 rounded-full bg-emerald-400" />
            <span className="animate-soft-ping absolute inset-0 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono-tabular">
            {streaming ? "streaming…" : "online · gpt-4o-mini"}
          </span>
        </span>
      </div>
      <div className="flex items-center gap-0.5">
        {hasMessages && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={onReset}
                className="size-8 rounded-full text-muted-foreground hover:text-foreground"
                aria-label="Reset conversation"
              >
                <HugeiconsIcon icon={RefreshIcon} size={14} strokeWidth={2} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-[11px]">
              Reset conversation
            </TooltipContent>
          </Tooltip>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={onClose}
              className="size-8 rounded-full text-muted-foreground hover:text-foreground"
              aria-label="Close agent"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={14} strokeWidth={2} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-[11px]">
            Close · esc
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  )
}

function EmptyState({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="flex flex-col items-center gap-6 py-10">
      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute -inset-2 rounded-3xl bg-primary/30 blur-xl"
        />
        <span className="relative inline-flex size-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
          <HugeiconsIcon icon={Chat01Icon} size={22} strokeWidth={2} />
        </span>
      </div>
      <div className="text-center">
        <h3 className="font-heading text-lg font-semibold tracking-tight">
          What can I do for you?
        </h3>
        <p className="mx-auto mt-1.5 max-w-[280px] text-xs leading-relaxed text-muted-foreground">
          Same component you'd ship — wired to a scripted demo. Pick a prompt or
          type one below.
        </p>
      </div>
      <ul className="flex w-full flex-col gap-1.5">
        {SUGGESTIONS.map((s, i) => (
          <li key={s.label}>
            <button
              type="button"
              onClick={() => onPick(s.prompt)}
              style={{ animationDelay: `${i * 50}ms` }}
              className={cn(
                "group flex w-full items-center gap-3 rounded-xl border border-border/60 bg-card/40 px-3 py-2.5 text-left",
                "animate-msg-in transition-all",
                "hover:border-primary/40 hover:bg-card hover:shadow-[0_8px_24px_-12px_color-mix(in_oklab,var(--primary)_45%,transparent)]",
                "focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none"
              )}
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                <HugeiconsIcon icon={s.icon} size={13} strokeWidth={2.2} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-[12.5px] font-medium text-foreground">
                  {s.label}
                </span>
                <span className="font-mono-tabular truncate text-[10px] text-muted-foreground">
                  {s.prompt}
                </span>
              </span>
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={13}
                strokeWidth={2.2}
                className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function MessageBubble({
  message,
  groupedWithPrev,
}: {
  message: ChatMessage
  groupedWithPrev: boolean
}) {
  if (message.role === "user") {
    return (
      <li
        className={cn(
          "animate-msg-in flex justify-end",
          groupedWithPrev && "mt-[-6px]"
        )}
      >
        <div
          className={cn(
            "max-w-[85%] rounded-2xl rounded-tr-md px-3.5 py-2 text-sm",
            "bg-gradient-to-br from-primary to-primary/85 text-primary-foreground",
            "shadow-[0_8px_24px_-12px_color-mix(in_oklab,var(--primary)_70%,transparent)]"
          )}
        >
          {message.text}
        </div>
      </li>
    )
  }

  const showAvatar = !groupedWithPrev
  return (
    <li
      className={cn(
        "animate-msg-in flex gap-2.5",
        groupedWithPrev && "mt-[-6px]"
      )}
    >
      {showAvatar ? (
        <Avatar className="mt-0.5 size-7 shrink-0 border border-primary/30">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <HugeiconsIcon icon={SparklesIcon} size={12} strokeWidth={2.2} />
          </AvatarFallback>
        </Avatar>
      ) : (
        <span className="size-7 shrink-0" />
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {message.toolCalls.map((tc) => (
          <ToolCallCard key={tc.id} call={tc} />
        ))}
        {message.text ||
        (message.streaming && message.toolCalls.length === 0) ? (
          <div className="max-w-full rounded-2xl rounded-tl-md border border-border/60 bg-background/70 px-3.5 py-2 text-sm shadow-[0_2px_0_0_color-mix(in_oklab,var(--foreground)_3%,transparent)_inset]">
            {message.text ? (
              <FormattedText text={message.text} />
            ) : (
              <span className="dot-pulse inline-flex items-center gap-1 py-0.5">
                <span />
                <span />
                <span />
              </span>
            )}
            {message.streaming && message.text && (
              <span
                aria-hidden="true"
                className="ml-0.5 inline-block h-3.5 w-[2px] animate-pulse bg-foreground align-middle"
              />
            )}
          </div>
        ) : null}
      </div>
    </li>
  )
}

function ToolCallCard({ call }: { call: ToolCallEvent }) {
  const [expanded, setExpanded] = useState(false)
  const hasResult = call.result !== undefined

  const summary = useMemo(() => {
    const entries = Object.entries(call.args)
    if (entries.length === 0) return ""
    return entries
      .slice(0, 2)
      .map(([k, v]) => `${k}: ${truncate(JSON.stringify(v), 14)}`)
      .join(", ")
  }, [call.args])

  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-muted/25">
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full items-center gap-2 border-b border-border/60 bg-muted/30 px-3 py-1.5 text-left transition-colors hover:bg-muted/40"
        aria-expanded={expanded}
      >
        <span className="flex size-5 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
          <HugeiconsIcon icon={CodeIcon} size={11} strokeWidth={2.2} />
        </span>
        <span className="flex min-w-0 flex-1 flex-col leading-tight">
          <span className="font-mono-tabular text-[11.5px] font-semibold text-foreground/90">
            {call.name}
            <span className="text-muted-foreground/70">()</span>
          </span>
          {summary && (
            <span className="font-mono-tabular truncate text-[10px] text-muted-foreground">
              {summary}
            </span>
          )}
        </span>
        {hasResult ? (
          <Badge
            variant="outline"
            className="font-mono-tabular h-5 gap-1 rounded-full border-emerald-400/30 bg-emerald-400/10 px-1.5 text-[9px] tracking-wider text-emerald-700 uppercase dark:text-emerald-300"
          >
            <HugeiconsIcon icon={Tick02Icon} size={9} strokeWidth={2.4} />
            done
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="font-mono-tabular h-5 gap-1 rounded-full border-amber-400/30 bg-amber-400/10 px-1.5 text-[9px] tracking-wider text-amber-700 uppercase dark:text-amber-300"
          >
            <span className="dot-pulse inline-flex items-center gap-0.5">
              <span />
              <span />
              <span />
            </span>
            calling
          </Badge>
        )}
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          size={11}
          strokeWidth={2.2}
          className={cn(
            "shrink-0 text-muted-foreground/70 transition-transform",
            expanded && "rotate-90"
          )}
        />
      </button>

      {expanded && (
        <div className="animate-msg-in">
          <div className="font-mono-tabular border-b border-border/60 bg-background/40 px-3 py-1 text-[9px] tracking-wider text-muted-foreground uppercase">
            args
          </div>
          <pre className="font-mono-tabular overflow-x-auto bg-background/40 px-3 py-2 text-[11px] leading-relaxed text-foreground/85">
            <code>{JSON.stringify(call.args, null, 2)}</code>
          </pre>
          {hasResult && (
            <>
              <div className="font-mono-tabular border-y border-border/60 bg-muted/30 px-3 py-1 text-[9px] tracking-wider text-muted-foreground uppercase">
                result
              </div>
              <pre className="font-mono-tabular overflow-x-auto px-3 py-2 text-[11px] leading-relaxed text-foreground/85">
                <code>{JSON.stringify(call.result, null, 2)}</code>
              </pre>
            </>
          )}
        </div>
      )}
    </div>
  )
}

function Composer({
  input,
  onChange,
  onSubmit,
  onKey,
  streaming,
  onStop,
  textareaRef,
}: {
  input: string
  onChange: (v: string) => void
  onSubmit: (e: React.FormEvent) => void
  onKey: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  streaming: boolean
  onStop: () => void
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
}) {
  const canSend = input.trim().length > 0 && !streaming
  return (
    <form
      onSubmit={onSubmit}
      className="relative border-t border-border/60 bg-gradient-to-t from-muted/30 to-transparent px-3 pt-3 pb-2.5"
    >
      <div
        className={cn(
          "relative flex items-end gap-2 rounded-2xl border border-border/60 bg-background/70 px-2.5 py-2 transition-colors",
          "focus-within:border-primary/40 focus-within:shadow-[0_0_0_3px_color-mix(in_oklab,var(--primary)_15%,transparent)]"
        )}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKey}
          placeholder={
            streaming ? "Streaming response…" : "Ask the demo agent…"
          }
          disabled={streaming}
          rows={1}
          className={cn(
            "max-h-[120px] min-h-7 flex-1 resize-none bg-transparent px-1.5 py-1 text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground",
            "scrollbar-none disabled:cursor-not-allowed disabled:opacity-50"
          )}
        />
        {streaming ? (
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={onStop}
            className="size-9 shrink-0 rounded-xl border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
            aria-label="Stop generating"
          >
            <HugeiconsIcon icon={StopCircleIcon} size={15} strokeWidth={2} />
          </Button>
        ) : (
          <Button
            type="submit"
            size="icon"
            disabled={!canSend}
            className={cn(
              "size-9 shrink-0 rounded-xl",
              canSend &&
                "shadow-[0_0_18px_-4px_color-mix(in_oklab,var(--primary)_60%,transparent)]"
            )}
            aria-label="Send"
          >
            <HugeiconsIcon icon={ArrowUp01Icon} size={15} strokeWidth={2.4} />
          </Button>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between px-1 text-[10px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <kbd className="font-mono-tabular inline-flex items-center gap-0.5 rounded border border-border/70 bg-muted/40 px-1 py-0.5 text-[9px]">
            <HugeiconsIcon icon={CommandIcon} size={8} strokeWidth={2} />
            <span>↵</span>
          </kbd>
          <span>to send · shift + ↵ for newline</span>
        </span>
        <span className="font-mono-tabular tracking-wider uppercase opacity-70">
          powered by wisp
        </span>
      </div>
      <Separator className="absolute inset-x-0 -top-px bg-transparent" />
    </form>
  )
}

function FormattedText({ text }: { text: string }) {
  if (!text) return null
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|_[^_]+_)/g)
  return (
    <span className="leading-relaxed break-words whitespace-pre-wrap">
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          )
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={i}
              className="font-mono-tabular rounded bg-muted px-1 py-0.5 text-[12px] text-foreground"
            >
              {part.slice(1, -1)}
            </code>
          )
        }
        if (part.startsWith("_") && part.endsWith("_")) {
          return (
            <em key={i} className="text-muted-foreground">
              {part.slice(1, -1)}
            </em>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </span>
  )
}

function applyFrame(
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  assistantId: string,
  frame: Frame
) {
  setMessages((prev) =>
    prev.map((m) => {
      if (m.id !== assistantId || m.role !== "assistant") return m

      if (frame.kind === "text") {
        return { ...m, text: m.text + frame.delta }
      }

      if (frame.kind === "tool_call") {
        return {
          ...m,
          toolCalls: [
            ...m.toolCalls,
            {
              id: `call_${Math.random().toString(36).slice(2, 8)}`,
              name: frame.name,
              args: frame.args,
            },
          ],
        }
      }

      if (frame.kind === "tool_result") {
        const idx = [...m.toolCalls]
          .reverse()
          .findIndex((c) => c.name === frame.name && c.result === undefined)
        if (idx === -1) return m
        const realIdx = m.toolCalls.length - 1 - idx
        const updated = [...m.toolCalls]
        updated[realIdx] = { ...updated[realIdx], result: frame.result }
        return { ...m, toolCalls: updated }
      }

      return m
    })
  )
}

function truncate(s: string, n: number): string {
  if (s.length <= n) return s
  return s.slice(0, n - 1) + "…"
}

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}
