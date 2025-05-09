"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useFormContext, type Field } from "../context/FormContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { generateJSON } from "../utils/generateJSON"

interface FormPreviewProps {
  onSubmit: (jsonData: string) => void
}

const FormPreview: React.FC<FormPreviewProps> = ({ onSubmit }) => {
  const { fields, formData, updateFormData, resetForm } = useFormContext()
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Reset errors when fields change
    setErrors({})
  }, [fields])

  const validateField = (field: Field, value: any): string => {
    if (!field.validation) return ""

    if (field.validation.required && (value === undefined || value === "")) {
      return "This field is required"
    }

    if (typeof value === "string") {
      if (field.validation.minLength && value.length < field.validation.minLength) {
        return `Minimum ${field.validation.minLength} characters required`
      }

      if (field.validation.maxLength && value.length > field.validation.maxLength) {
        return `Maximum ${field.validation.maxLength} characters allowed`
      }

      if (field.type === "email" && !/\S+@\S+\.\S+/.test(value)) {
        return "Please enter a valid email address"
      }
    }

    return ""
  }

  const handleChange = (fieldId: string, value: any) => {
    updateFormData(fieldId, value)

    const field = fields.find((f) => f.id === fieldId)
    if (field) {
      const error = validateField(field, value)
      setErrors((prev) => ({
        ...prev,
        [fieldId]: error,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const newErrors: Record<string, string> = {}
    let hasErrors = false

    fields.forEach((field) => {
      const value = formData[field.id]
      const error = validateField(field, value)
      if (error) {
        newErrors[field.id] = error
        hasErrors = true
      }
    })

    setErrors(newErrors)

    if (!hasErrors) {
      const json = generateJSON(fields, formData)
      onSubmit(json)
    }
  }

  const handleReset = () => {
    resetForm()
    setErrors({})
  }

  if (fields.length === 0) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="text-center text-muted-foreground">
            <p>No fields added yet</p>
            <p className="mt-2">Add fields from the form builder</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.id} className="space-y-2">
              {field.type === "checkbox" ? (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={field.id}
                    checked={formData[field.id] || false}
                    onCheckedChange={(checked) => handleChange(field.id, checked === true)}
                  />
                  <Label htmlFor={field.id}>{field.label}</Label>
                </div>
              ) : (
                <Label htmlFor={field.id}>
                  {field.label}
                  {field.validation?.required && <span className="text-destructive ml-1">*</span>}
                </Label>
              )}

              {field.type === "text" && (
                <Input
                  id={field.id}
                  value={formData[field.id] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                />
              )}

              {field.type === "email" && (
                <Input
                  id={field.id}
                  type="email"
                  value={formData[field.id] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                />
              )}

              {field.type === "select" && (
                <Select value={formData[field.id] || ""} onValueChange={(value) => handleChange(field.id, value)}>
                  <SelectTrigger id={field.id}>
                    <SelectValue placeholder={field.placeholder || "Select an option"} />
                  </SelectTrigger>
                  <SelectContent>
                    {(field.options || []).map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {errors[field.id] && (
                <Alert variant="destructive" className="py-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors[field.id]}</AlertDescription>
                </Alert>
              )}
            </div>
          ))}
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button type="submit" className="flex-1">
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormPreview
