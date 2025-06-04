"use client"

import { useState } from "react"
import { useIFS } from "./ifs-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trash2, UploadCloud, Save, ListChecks } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useI18n } from "./i18n-context"

export default function SavedFractalsPanel() {
  const { savedFractals, saveCurrentFractal, loadSavedFractal, deleteSavedFractal } = useIFS()
  const [newFractalName, setNewFractalName] = useState("")
  const { t } = useI18n()

  const handleSave = () => {
    if (newFractalName.trim()) {
      saveCurrentFractal(newFractalName.trim())
      setNewFractalName("") // Reset input field
    } else {
      // Consider showing a toast or inline message for error
      alert(t.enterFractalNamePrompt || "Vui lòng nhập tên cho fractal.")
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString(t.locale || "vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6 p-1">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Save className="w-5 h-5 mr-2" />
            {t.saveCurrentFractal || "Lưu Fractal Hiện Tại"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            type="text"
            value={newFractalName}
            onChange={(e) => setNewFractalName(e.target.value)}
            placeholder={t.fractalNamePlaceholder || "Nhập tên fractal..."}
            className="text-sm"
          />
          <Button onClick={handleSave} className="w-full bg-green-600 hover:bg-green-700 text-sm">
            <Save className="w-4 h-4 mr-2" />
            {t.saveButton || "Lưu"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <ListChecks className="w-5 h-5 mr-2" />
            {t.savedFractalsList || "Danh Sách Fractal Đã Lưu"}
          </CardTitle>
          <CardDescription>
            {savedFractals.length > 0
              ? `${t.youHave || "Bạn có"} ${savedFractals.length} ${t.savedFractalsCount || "fractal đã lưu."}`
              : t.noSavedFractals || "Chưa có fractal nào được lưu."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {savedFractals.length > 0 ? (
            <ScrollArea className="h-[300px] pr-3">
              {" "}
              {/* Added pr-3 for scrollbar spacing */}
              <div className="space-y-3">
                {savedFractals.map((fractal) => (
                  <Card key={fractal.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="p-3">
                      <CardTitle className="text-base truncate" title={fractal.name}>
                        {fractal.name}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {t.savedOn || "Lưu lúc"}: {formatDate(fractal.timestamp)}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="p-3 bg-muted/30 dark:bg-muted/20 flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => loadSavedFractal(fractal.id)}
                        className="text-xs"
                      >
                        <UploadCloud className="w-3 h-3 mr-1.5" />
                        {t.loadButton || "Tải"}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm" className="text-xs">
                            <Trash2 className="w-3 h-3 mr-1.5" />
                            {t.deleteButton || "Xóa"}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>{t.confirmDeleteTitle || "Xác nhận xóa?"}</AlertDialogTitle>
                            <AlertDialogDescription>
                              {t.confirmDeleteMessage || "Hành động này không thể hoàn tác. Fractal"} "{fractal.name}"{" "}
                              {t.willBePermanentlyDeleted || "sẽ bị xóa vĩnh viễn."}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>{t.cancelButton || "Hủy"}</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteSavedFractal(fractal.id)}>
                              {t.confirmButton || "Xác nhận"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              {t.startSavingPrompt || "Hãy bắt đầu lưu các fractal yêu thích của bạn!"}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
