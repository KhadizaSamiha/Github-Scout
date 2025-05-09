"use client"

import React from "react"
import { type Field, type FieldType, type ValidationRule, useFormContext } from "../context/FormContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, ArrowUp, ArrowDown, Plus, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface FieldInputProps {
  field: Field
  index: number
  totalFields: number
}

const FieldInput: React.FC<FieldInputProps> = ({ field, index, totalFields }) => {
  const { updateField, removeField, moveField } = useFormContext()
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [newOption, setNewOption] = React.useState<{ label: string; value: string }>({
    label: "",
    value: "",
  })

  const handleFieldChange = (key: keyof Field, value: any) => {
    console.log(`Updating field ${field.id}, key: ${key}, value:`, value)
    updateField(field.id, { [key]: value })
  }

  const handleValidationChange = (key: keyof ValidationRule, value: any) => {
    console.log(`Updating validation for field ${field.id}, key: ${key}, value:`, value)
    const updatedValidation = { ...(field.validation || {}), [key]: value }
    updateField(field.id, { validation: updatedValidation })
  }

  const addOption = () => {
    if (newOption.label && newOption.value) {
      const newOptions = [...(field.options || []), { ...newOption }]
      updateField(field.id, { options: newOptions })
      setNewOption({ label: "", value: "" })
    }
  }

  const removeOption = (index: number) => {
    const newOptions = (field.options || []).filter((_, i) => i !== index)
    updateField(field.id, { options: newOptions })
  }

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{field.label || "New Field"}</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => setIsExpanded(!isExpanded)} className="h-8 w-8">
              {isExpanded ? <X size={16} /> : <Plus size={16} />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => removeField(field.id)}
              className="h-8 w-8 text-destructive"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          {index > 0 && (
            <Button variant="outline" size="icon" onClick={() => moveField(index, index - 1)} className="h-8 w-8">
              <ArrowUp size={16} />
            </Button>
          )}
          {index < totalFields - 1 && (
            <Button variant="outline" size="icon" onClick={() => moveField(index, index + 1)} className="h-8 w-8">
              <ArrowDown size={16} />
            </Button>
          )}
          <Badge variant="outline" className="ml-2">
            {field.type}
          </Badge>
          {field.validation?.required && <Badge variant="secondary">Required</Badge>}
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pb-2">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`${field.id}-label`}>Field Label</Label>
                <Input
                  id={`${field.id}-label`}
                  value={field.label}
                  onChange={(e) => {
                    console.log("Label changed:", e.target.value)
                    handleFieldChange("label", e.target.value)
                  }}
                  placeholder="Enter field label"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${field.id}-type`}>Field Type</Label>
                <Select value={field.type} onValueChange={(value) => handleFieldChange("type", value as FieldType)}>
                  <SelectTrigger id={`${field.id}-type`}>
                    <SelectValue placeholder="Select field type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="checkbox">Checkbox</SelectItem>
                    <SelectItem value="select">Select</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {(field.type === "text" || field.type === "email") && (
              <div className="space-y-2">
                <Label htmlFor={`${field.id}-placeholder`}>Placeholder</Label>
                <Input
                  id={`${field.id}-placeholder`}
                  value={field.placeholder || ""}
                  onChange={(e) => handleFieldChange("placeholder", e.target.value)}
                  placeholder="Enter placeholder text"
                />
              </div>
            )}

            {field.type === "select" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Options</Label>
                  <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
                    <Input
                      value={newOption.label}
                      onChange={(e) => setNewOption({ ...newOption, label: e.target.value })}
                      placeholder="Option Label"
                    />
                    <Input
                      value={newOption.value}
                      onChange={(e) => setNewOption({ ...newOption, value: e.target.value })}
                      placeholder="Option Value"
                    />
                    <Button onClick={addOption} size="icon" variant="outline">
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  {(field.options || []).map((option, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex gap-2 items-center">
                        <Badge variant="outline">{i + 1}</Badge>
                        <span>{option.label}</span>
                        <span className="text-muted-foreground">({option.value})</span>
                      </div>
                      <Button
                        onClick={() => removeOption(i)}
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-destructive"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Validation</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`${field.id}-required`}
                    checked={field.validation?.required || false}
                    onCheckedChange={(checked) => handleValidationChange("required", checked === true)}
                  />
                  <Label htmlFor={`${field.id}-required`}>Required</Label>
                </div>

                {(field.type === "text" || field.type === "email") && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`${field.id}-minLength`}>Min Length</Label>
                        <Input
                          id={`${field.id}-minLength`}
                          type="number"
                          value={field.validation?.minLength || ""}
                          onChange={(e) =>
                            handleValidationChange(
                              "minLength",
                              e.target.value ? Number.parseInt(e.target.value) : undefined,
                            )
                          }
                          placeholder="Minimum length"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${field.id}-maxLength`}>Max Length</Label>
                        <Input
                          id={`${field.id}-maxLength`}
                          type="number"
                          value={field.validation?.maxLength || ""}
                          onChange={(e) =>
                            handleValidationChange(
                              "maxLength",
                              e.target.value ? Number.parseInt(e.target.value) : undefined,
                            )
                          }
                          placeholder="Maximum length"
                        />
                      </div>
                    </div>

                    {field.type === "text" && (
                      <div className="space-y-2">
                        <Label htmlFor={`${field.id}-pattern`}>Pattern (RegEx)</Label>
                        <Input
                          id={`${field.id}-pattern`}
                          value={field.validation?.pattern || ""}
                          onChange={(e) => handleValidationChange("pattern", e.target.value)}
                          placeholder="RegEx pattern"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

export default FieldInput
