import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface ErrorProps {
  message: string | null
}

export function Error({ message }: ErrorProps) {
  if (!message) return null

  return (
    <Alert variant="destructive" className="my-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Hata</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}