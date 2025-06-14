import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CSVUpload } from "@/components/csv-upload"
import { ManualEntry } from "@/components/manual-entry"

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Employee Data</h1>
          <p className="text-gray-600">Add new employee data via CSV upload or manual entry</p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Data Input Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="csv" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="csv">CSV Upload</TabsTrigger>
                <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              </TabsList>

              <TabsContent value="csv" className="mt-6">
                <CSVUpload />
              </TabsContent>

              <TabsContent value="manual" className="mt-6">
                <ManualEntry />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
