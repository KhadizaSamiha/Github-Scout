"use client";

import type React from "react";
import FieldInput from "./FieldInput";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X } from "lucide-react";
import { useFormContext } from "@/hooks/useFormContext";
import { useFormBuilder } from "@/hooks/useFormBuilders";
import { toast } from "react-toastify";

const FormBuilder: React.FC = () => {
  const { fields, addField } = useFormContext();
  const {
    newField,
    newOption,
    setNewOption,
    handleFieldChange,
    handleValidationChange,
    addOption,
    removeOption,
    resetNewField,
  } = useFormBuilder();

  const handleAddField = () => {
    if (newField.label) {
      console.log("Adding new field:", newField);
      addField({
        label: newField.label,
        type: newField.type,
        placeholder: newField.placeholder,
        options: newField.type === "select" ? newField.options : undefined,
        validation: newField.validation,
      });
      resetNewField();
      toast.success("Form field added successfully!");
    } else {
      toast.error("Field label is required");
    }
  };

  return (
    <div className="space-y-6 ">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Add New Field</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="field-label" className="text-label">
                  Field Label
                </Label>
                <Input
                  id="field-label"
                  value={newField.label}
                  onChange={(e) => handleFieldChange("label", e.target.value)}
                  placeholder="Enter field label"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="field-type" className="text-label">
                  Field Type
                </Label>
                <Select
                  value={newField.type}
                  onValueChange={(value) => handleFieldChange("type", value)}
                >
                  <SelectTrigger id="field-type">
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

            {(newField.type === "text" || newField.type === "email") && (
              <div className="space-y-2">
                <Label htmlFor="field-placeholder" className="text-label">
                  Placeholder
                </Label>
                <Input
                  id="field-placeholder"
                  value={newField.placeholder}
                  onChange={(e) =>
                    handleFieldChange("placeholder", e.target.value)
                  }
                  placeholder="Enter placeholder text"
                />
              </div>
            )}

            {newField.type === "select" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-label">Options</Label>
                  <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
                    <Input
                      value={newOption.label}
                      onChange={(e) =>
                        setNewOption({ ...newOption, label: e.target.value })
                      }
                      placeholder="Option Label"
                    />
                    <Input
                      value={newOption.value}
                      onChange={(e) =>
                        setNewOption({ ...newOption, value: e.target.value })
                      }
                      placeholder="Option Value"
                    />
                    <Button onClick={addOption} size="icon" variant="outline">
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  {newField.options.map((option, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex gap-2 items-center">
                        <span>{option.label}</span>
                        <span className="text-muted-foreground">
                          ({option.value})
                        </span>
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
              <Label className="text-label">Validation</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="validation-required"
                    checked={newField.validation.required || false}
                    onCheckedChange={(checked) =>
                      handleValidationChange("required", checked === true)
                    }
                  />
                  <Label htmlFor="validation-required">Required</Label>
                </div>

                {(newField.type === "text" || newField.type === "email") && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="validation-minLength"
                          className="text-label"
                        >
                          Min Length
                        </Label>
                        <Input
                          id="validation-minLength"
                          type="number"
                          value={newField.validation.minLength || ""}
                          onChange={(e) =>
                            handleValidationChange(
                              "minLength",
                              e.target.value
                                ? Number.parseInt(e.target.value, 10)
                                : ""
                            )
                          }
                          placeholder="Minimum length"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="validation-maxLength"
                          className="text-label"
                        >
                          Max Length
                        </Label>
                        <Input
                          id="validation-maxLength"
                          type="number"
                          value={newField.validation.maxLength || ""}
                          onChange={(e) =>
                            handleValidationChange(
                              "maxLength",
                              e.target.value
                                ? Number.parseInt(e.target.value, 10)
                                : ""
                            )
                          }
                          placeholder="Maximum length"
                        />
                      </div>
                    </div>

                    {newField.type === "text" && (
                      <div className="space-y-2">
                        <Label
                          htmlFor="validation-pattern"
                          className="text-label"
                        >
                          Pattern (RegEx)
                        </Label>
                        <Input
                          id="validation-pattern"
                          value={newField.validation.pattern || ""}
                          onChange={(e) =>
                            handleValidationChange("pattern", e.target.value)
                          }
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
        <CardFooter>
          <Button onClick={handleAddField} className="w-full">
            Add Field
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-primary">
          Fields ({fields.length})
        </h2>
        {fields.length === 0 ? (
          <div className="text-center p-8 border border-dashed rounded-lg">
            <p className="text-muted-foreground">No fields added yet</p>
          </div>
        ) : (
          fields.map((field, index) => (
            <FieldInput
              key={field.id}
              field={field}
              index={index}
              totalFields={fields.length}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FormBuilder;
