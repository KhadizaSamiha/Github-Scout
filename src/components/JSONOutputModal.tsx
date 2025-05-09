"use client"

import type React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/Button"
import { downloadJSON } from "../utils/generateJSON"
import { Download } from "lucide-react"

interface JSONOutputModalProps {
  jsonData: string
}

const JSONOutputModal: React.FC<JSONOutputModalProps> = ({ jsonData }) => {
  const handleDownload = () => {
    downloadJSON(jsonData)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View JSON</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Form Data (JSON)</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="bg-muted p-4 rounded-md overflow-auto max-h-[400px]">
            <pre className="text-sm">{jsonData}</pre>
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={handleDownload} className="flex items-center gap-2">
              <Download size={16} />
              Download JSON
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default JSONOutputModal
