"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, Trash2, Globe } from "lucide-react"
import translations from "@/app/intl/translations"
import type { Language } from "@/app/intl/language"


export default function Home() {
  const [files, setFiles] = useState<File[]>([])
  const [format, setFormat] = useState("png")
  const [isDragging, setIsDragging] = useState(false)
  const [language, setLanguage] = useState<Language>("en")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const t = translations[language]

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("image/"))

      if (droppedFiles.length > 0) {
        setFiles((prevFiles) => [...prevFiles, ...droppedFiles])
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files).filter((file) => file.type.startsWith("image/"))

      if (selectedFiles.length > 0) {
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles])
      }
    }
  }

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormat(e.target.value)
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  return (
    <main className="min-h-screen flex flex-col items-center p-4 md:p-8">
      <div className="w-full flex justify-end mb-4">
        <div className="flex items-center">
          <Globe className="mr-2 h-4 w-4" />
          <label htmlFor="language" className="mr-2 text-xs">
            {t.language}:
          </label>
          <select
            id="language"
            value={language}
            onChange={handleLanguageChange}
            className="p-1 bg-[#001100] border border-[#00A800] text-[#00A800] text-xs font-mono focus:outline-none"
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="tr">Türkçe</option>
            <option value="zh">中文</option>
            <option value="de">Deutsch</option>
            <option value="nl">Nederlands</option>
          </select>
        </div>
      </div>

      <h1 className="text-2xl md:text-4xl font-bold mb-8 text-center font-orbitron">{t.title}</h1>

      <div className="w-full">
        <hr className="border-[#00A800] border-t-[1px] mb-8" />

        <div
          className={`border-2 border-dashed border-[#00A800] rounded-none p-8 mb-6 text-center cursor-pointer transition-colors ${isDragging ? "bg-[#002200]" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            multiple
          />
          <Upload className="mx-auto mb-4 h-12 w-12" />
          <p className="mb-2 font-spacemono">{t.dragDrop}</p>
          <p className="font-spacemono">{t.orClick}</p>
        </div>

        {files.length > 0 && (
          <div className="mb-6 border-2 border-[#00A800] p-2">
            <p className="mb-2 font-spacemono">{t.selected}</p>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li key={index} className="flex justify-between items-center p-2 bg-[#002200]">
                  <span className="truncate font-spacemono">{file.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile(index)
                    }}
                    className="ml-2 p-1 hover:bg-[#003300] transition-colors"
                    aria-label={t.remove}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-8">
          <label htmlFor="format" className="block mb-2 font-spacemono">
            {t.outputFormat}
          </label>
          <select
            id="format"
            value={format}
            onChange={handleFormatChange}
            className="w-full p-2 bg-[#001100] border-2 border-[#00A800] text-[#00A800] font-spacemono focus:outline-none"
          >
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
            <option value="webp">WEBP</option>
            <option value="gif">GIF</option>
            <option value="bmp">BMP</option>
            <option value="tiff">TIFF</option>
          </select>
        </div>

        <button
          className="w-full p-3 bg-[#00A800] text-[#001100] font-bold hover:bg-[#008800] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-spacemono"
          disabled={files.length === 0}
        >
          {t.convert}
        </button>
      </div>

      <footer className="mt-auto pt-8 w-full max-w-2xl">
        <hr className="border-[#00A800] border-t-[1px] mb-4" />
        <p className="text-xs md:text-sm text-center font-spacemono">{t.privacy1}</p>
        <p className="text-xs md:text-sm text-center mt-2 font-spacemono">{t.privacy2}</p>
      </footer>
    </main>
  )
}

