"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { FormProvider } from "@/contexts/FormContext";
import FormBuilder from "../FormBuilder";
import FormPreview from "../FormPreview";
import JSONOutputModal from "../JSONOutputModal";

const MainLayout: React.FC = () => {
  const [jsonOutput, setJsonOutput] = useState<string>("{}");
  const [showJSON, setShowJSON] = useState(false);

  const handleFormSubmit = (data: string) => {
    setJsonOutput(data);
    setShowJSON(true);
  };



  return (
    <div className='min-h-screen'>
      <Header  />

      <main className="container mx-auto py-8 px-4">
        <FormProvider>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Form Builder</h2>
                <p className="text-sm text-muted-foreground">
                  Create your custom form
                </p>
              </div>
              <FormBuilder />
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Form Preview</h2>
                <p className="text-sm text-muted-foreground">
                  See how your form looks
                </p>
              </div>
              <FormPreview onSubmit={handleFormSubmit} />

              {showJSON && (
                <div className="mt-8 space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Form Data</h2>
                    <JSONOutputModal jsonData={jsonOutput} />
                  </div>
                  <div className="bg-muted p-4 rounded-md overflow-auto max-h-[400px]">
                    <pre className="text-sm">{jsonOutput}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </FormProvider>
      </main>
    </div>
  );
};

export default MainLayout;
