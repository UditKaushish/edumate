import React from "react"

interface SwitchProps {
  id?: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

export const Switch: React.FC<SwitchProps> = ({ id, checked, onCheckedChange }) => {
  return (
    <label
      htmlFor={id}
      className="relative inline-flex items-center cursor-pointer"
    >
      <input
        id={id}
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
      />
      <div
        className={`w-11 h-6 rounded-full transition-colors ${
          checked ? "bg-green-500" : "bg-gray-300"
        }`}
      ></div>
      <div
        className={`absolute left-0 top-0 w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      ></div>
    </label>
  )
}
