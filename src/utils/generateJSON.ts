import type { Field } from "../contexts/FormContext"

export const generateJSON = (fields: Field[], formData: Record<string, any>): string => {
  const result: Record<string, any> = {}

  fields.forEach((field) => {
    const value = formData[field.id]
    if (value !== undefined) {
      result[field.label] = value
    }
  })

  return JSON.stringify(result, null, 2)
}

export const downloadJSON = (jsonData: string, filename = "form-data.json") => {
  const blob = new Blob([jsonData], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
