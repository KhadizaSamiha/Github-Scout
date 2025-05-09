// types/form.ts
export type Field = {
  id: string
  label: string
  type: "text" | "email" | "select" | "checkbox"
  placeholder?: string
  options?: { label: string; value: string }[]
  validation?: {
    required?: boolean
    minLength?: number
    maxLength?: number
  }
}
