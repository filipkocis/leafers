"use client"

import { Button } from "@shadcn/components/ui/button";
import { LucideSend } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AiChatMessage } from "./utils/types";
import { cn } from "@shadcn/lib/utils";
import { toast } from "sonner";
import { Message } from "./components/Message";
import ResizableTextarea from "@components/ResizableTextarea";
import { ModelToggle } from "./components/ModelToggle";
import { useHeaderHeight } from "@app/contexts/headerHeightContext";

const defaultSystemMessage: AiChatMessage = {
  role: "system",
  content: "You are a helpful funny chill ai assistant, you do not speak in a corporate way and do not care about having to be family friendly. You are a Capybara"
}

export default function AiChat({ limited }: { limited: boolean }) {
  const [systemMessage, setSystemMessage] = useState<AiChatMessage>(defaultSystemMessage)
  const [submitting, setSubmitting] = useState(false)
  const [model, setModel] = useState('gpt-3.5-turbo')
  const [messages, setMessages] = useState<AiChatMessage[]>([defaultSystemMessage])
  const streamRef = useRef<HTMLDivElement>(null)
  const mounted = useRef(true)
  const headerHeight = useHeaderHeight()

  async function submitPrompt(prompt: string) {
    if (streamRef.current === null) return;

    // server only support 3.5 or 4
    const uselatest = (model === "gpt-4-turbo" && !limited) ? true : undefined

    const response = await fetch(window.location.origin + "/ai/api", { 
      method: "POST",
      body: JSON.stringify({ 
        uselatest,
        messages: [...messages,  { content: prompt, role: "user" }]
      }),
      keepalive: true,
    })
    
    if (!response.ok) throw new Error(await response.text())

    const body = response.body
    if (body === null) throw new Error("Response body is empty")

    const reader = body.getReader()
    const textDecoder = new TextDecoder()
    
    try {
      let result = ''

      while (true) {
        if (!mounted.current) return;

        const { done, value } = await reader.read()
        if (done) break;

        const chunk = textDecoder.decode(value)
        const text = chunk
          .replace(/(\"\n|^)0:\"/g, '')
          .replace(/\"\n$/, '')
          .replace(/\\n/g, '\n')
          .replace(/\\"/g, '"')

        result += text
        streamRef.current.textContent = result
      }

      if (!mounted.current) return;
      if (result === "") throw new Error("No response")

      setMessages(messages => [...messages, { content: result, role: "assistant" }])
    } catch (error) {
      toast.error("Failed to process stream")
    }

    reader.releaseLock();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (submitting) return;
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const prompt = formData.get("prompt") as string
    if (!prompt) return;

    const promptElement = document.getElementById("prompt") as HTMLInputElement | null
    if (promptElement) {
      promptElement.value = ""
      promptElement.dispatchEvent(new InputEvent("input", { bubbles: true }))
    }

    setMessages(messages => [...messages, { content: prompt, role: "user" }])

    setSubmitting(true)
    submitPrompt(prompt).catch(error => toast.error(`${error}`)).finally(() => {
      document.getElementById("prompt")?.focus()
      setSubmitting(false) 
    })
  }

  useEffect(() => {
    mounted.current = true
    return () => { mounted.current = false }
  }, [])

  useEffect(() => {
    document.body.scrollIntoView({ block: "end", behavior: "smooth" })
  }, [messages])

  return (
    <div className="grid grid-rows-[1fr_auto]">
      {!limited && 
        <div 
          style={{ top: headerHeight }} 
          className="bg-background flex items-center gap-2 p-2 fixed z-10"
        >
          <ModelToggle model={model} setModel={setModel} />
          <span className="text-sm">{model}</span>
        </div>
      }

      {(messages.length === 1 && !submitting) &&
      <div className="flex items-center justify-center">
        <p className="text-center text-xl">Hello, How can I help you?</p>
      </div>
      }

      <div className="flex flex-col gap-4 px-3 py-2">
        {messages.map((message, index) => <Message key={index} message={message} />)}
        <Message className={cn(!submitting && "h-0")} ref={streamRef} isRef isSubmitting={submitting} /> 
      </div>

      <form onSubmit={handleSubmit} className="grid gap-3 grid-cols-[1fr_auto] py-3 px-4 w-full border-t sticky bottom-0 bg-background">
        <ResizableTextarea 
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey) {
              e.preventDefault()
              e.currentTarget.form?.dispatchEvent(new SubmitEvent("submit", { bubbles: true, cancelable: true })) 
            }
          }}
          disabled={submitting}
          id="prompt"
          name="prompt"
          placeholder="Ask any question"
          className="text-[1rem]"
          maxLength={limited ? 5000 : undefined}
        />
        <Button disabled={submitting} type="submit" className="p-3"><LucideSend /></Button>
      </form>

          
    </div>
  )
}
