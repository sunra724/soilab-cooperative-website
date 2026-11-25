import { notFound } from 'next/navigation'

// The implicit children slot needs a fallback alongside the head-data slot.
export default function DefaultPage() {
  notFound()
}
