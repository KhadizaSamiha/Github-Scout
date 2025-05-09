"use client"

import { useState } from "react"
import type { FieldOption, FieldType, ValidationRule } from "@/contexts/FormContext"

export const useFormBuilder = () => {
  const [newField, setNewField] = useState<{
    label: string
    type: FieldType
    placeholder?: string
    options: FieldOption[]
    validation: ValidationRule
  }>({
    label: "",
    type: "text",
    placeholder: "",
    options: [],
    validation: {},
  })

  const [newOption, setNewOption] = useState<FieldOption>({ label: "", value: "" })

  // Restrict key to only valid field keys and value type according to key
  const handleFieldChange = (key: keyof typeof newField, value: string | FieldOption[]) => {
    setNewField((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "type" && value !== "select" ? { options: [] } : {}),
    }))
  }

  // Restrict key to keys of ValidationRule and value to appropriate types
  const handleValidationChange = (key: keyof ValidationRule, value: boolean | number | string) => {
    setNewField((prev) => ({
      ...prev,
      validation: { ...prev.validation, [key]: value },
    }))
  }

  const addOption = () => {
    if (newOption.label && newOption.value) {
      setNewField((prev) => ({
        ...prev,
        options: [...prev.options, newOption],
      }))
      setNewOption({ label: "", value: "" })
    }
  }

  const removeOption = (index: number) => {
    setNewField((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }))
  }

  const resetNewField = () => {
    setNewField({
      label: "",
      type: "text",
      placeholder: "",
      options: [],
      validation: {},
    })
    setNewOption({ label: "", value: "" })
  }

  return {
    newField,
    newOption,
    setNewOption,
    handleFieldChange,
    handleValidationChange,
    addOption,
    removeOption,
    resetNewField,
  }
}
