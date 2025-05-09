"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

export type FieldOption = {
  label: string
  value: string
}

export type FieldType = "text" | "email" | "checkbox" | "select"

export type ValidationRule = {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: string
}

export type Field = {
  id: string
  label: string
  type: FieldType
  placeholder?: string
  options?: FieldOption[]
  validation?: ValidationRule
}

type FormContextType = {
  fields: Field[]
  addField: (field: Omit<Field, "id">) => void
  updateField: (id: string, field: Partial<Field>) => void
  removeField: (id: string) => void
  moveField: (fromIndex: number, toIndex: number) => void
  formData: Record<string, any>
  updateFormData: (fieldId: string, value: any) => void
  resetForm: () => void
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fields, setFields] = useState<Field[]>([])
  const [formData, setFormData] = useState<Record<string, any>>({})

  const addField = (field: Omit<Field, "id">) => {
    const id = `field_${Date.now()}`
    setFields((prev) => [...prev, { ...field, id }])
  }

  const updateField = (id: string, updatedField: Partial<Field>) => {
    console.log(`Updating field ${id} with:`, updatedField)
    setFields((prev) => {
      const newFields = prev.map((field) => (field.id === id ? { ...field, ...updatedField } : field))
      console.log("Updated fields:", newFields)
      return newFields
    })
  }

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((field) => field.id !== id))
    setFormData((prev) => {
      const newData = { ...prev }
      delete newData[id]
      return newData
    })
  }

  const moveField = (fromIndex: number, toIndex: number) => {
    setFields((prev) => {
      const newFields = [...prev]
      const [movedField] = newFields.splice(fromIndex, 1)
      newFields.splice(toIndex, 0, movedField)
      return newFields
    })
  }

  const updateFormData = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }))
  }

  const resetForm = () => {
    setFormData({})
  }

  return (
    <FormContext.Provider
      value={{
        fields,
        addField,
        updateField,
        removeField,
        moveField,
        formData,
        updateFormData,
        resetForm,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export const useFormContext = () => {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider")
  }
  return context
}
