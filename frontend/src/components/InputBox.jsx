import React from "react";

export function InputBox({ label, placeholder, type, onChange }) {
  return <div>
    <div className="text-sm text-left font-medium py-2">
      { label }
    </div>
    <input onChange={onChange} type={ type } placeholder={ placeholder } className="w-full px-2 py-1 border rounded border-slate-200" />
  </div>
}