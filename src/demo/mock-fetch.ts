import { serializeAgentEvent, type Message } from "@wisp/core"
import { eventsForUserMessage } from "./fixtures"

type RequestPayload = {
  messages?: Message[]
  context?: Record<string, unknown>
}

function lastUserText(messages: Message[] | undefined): string {
  if (!messages || messages.length === 0) return ""
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i]
    if (m.role === "user" && "content" in m) return m.content
  }
  return ""
}

export const mockAgentFetch: typeof fetch = async (input, init) => {
  const url =
    typeof input === "string"
      ? input
      : input instanceof URL
        ? input.toString()
        : input.url

  if (!url.includes("/api/agent")) {
    return globalThis.fetch(input as RequestInfo, init)
  }

  const body =
    typeof init?.body === "string" ? (JSON.parse(init.body) as RequestPayload) : {}
  const userText = lastUserText(body.messages)

  const { events, delays } = eventsForUserMessage(userText)
  const encoder = new TextEncoder()
  const signal = init?.signal as AbortSignal | undefined

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for (let i = 0; i < events.length; i++) {
          if (signal?.aborted) break
          await new Promise((resolve) => setTimeout(resolve, delays[i] ?? 80))
          if (signal?.aborted) break
          const line = `data: ${serializeAgentEvent(events[i])}\n\n`
          controller.enqueue(encoder.encode(line))
        }
      } catch {
        /* ignore */
      } finally {
        try {
          controller.close()
        } catch {
          /* already closed */
        }
      }
    },
    cancel() {
      /* no-op — natural abort handled in start() loop */
    },
  })

  return new Response(stream, {
    status: 200,
    headers: {
      "content-type": "text/event-stream",
      "cache-control": "no-cache, no-transform",
    },
  })
}
