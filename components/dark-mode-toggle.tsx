"use client"

import { useIFS } from "./ifs-context"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useIFS()

  return (
    <Button
      onClick={toggleDarkMode}
      variant="outline"
      size="sm"
      className={`h-9 w-9 p-0 rounded-full ${
        darkMode
          ? "bg-gray-700 border-gray-600 hover:bg-gray-700 hover:border-gray-500"
          : "bg-white border-gray-200 hover:bg-gray-50"
      } transition-all duration-300`}
    >
      <div className="relative w-5 h-5">
        {darkMode ? (
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.3 }}
          >
            <Moon className="w-4 h-4 text-yellow-300" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: 30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: -30 }}
            transition={{ duration: 0.3 }}
          >
            <Sun className="w-4 h-4 text-amber-500" />
          </motion.div>
        )}
      </div>
    </Button>
  )
}
