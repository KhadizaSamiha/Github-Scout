// FormContext.tsx

"use client";

import React, { createContext, useState, ReactNode } from "react";

// Define types
export type FieldOption = {
  label: string;
  value: string;
};

export type FieldType = "text" | "email" | "checkbox" | "select";

export type ValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
};

export type Field = {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: FieldOption[];
  validation?: ValidationRule;
};

// We will use a more specific type for the form data (e.g., string | number | boolean)
export type FormDataType = Record<string, string | number | boolean>;  // Adjust based on what field data can be

// Define context type
export type FormContextType = {
  fields: Field[];
  addField: (field: Omit<Field, "id">) => void;
  updateField: (id: string, field: Partial<Field>) => void;
  removeField: (id: string) => void;
  moveField: (fromIndex: number, toIndex: number) => void;
  formData: FormDataType;
  updateFormData: (fieldId: string, value: string | number | boolean) => void;  // Use the specific types here
  resetForm: () => void;
};

// Create context
const FormContext = createContext<FormContextType | undefined>(undefined);

// FormProvider component
export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fields, setFields] = useState<Field[]>([]);
  const [formData, setFormData] = useState<FormDataType>({});

  // Add a field
  const addField = (field: Omit<Field, "id">) => {
    const id = `field_${Date.now()}`;
    setFields((prev) => [...prev, { ...field, id }]);
  };

  // Update a field
  const updateField = (id: string, updatedField: Partial<Field>) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, ...updatedField } : field
      )
    );
  };

  // Remove a field
  const removeField = (id: string) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
    setFormData((prev) => {
      const newData = { ...prev };
      delete newData[id];
      return newData;
    });
  };

  // Move a field
  const moveField = (fromIndex: number, toIndex: number) => {
    setFields((prev) => {
      const newFields = [...prev];
      const [movedField] = newFields.splice(fromIndex, 1);
      newFields.splice(toIndex, 0, movedField);
      return newFields;
    });
  };

  // Update form data
  const updateFormData = (fieldId: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  // Reset form data
  const resetForm = () => {
    setFormData({});
  };

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
  );
};

export { FormContext };
