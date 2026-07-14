"use client";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function ThemeToggle(){
  const [dark,setDark]=useState(false);
  return (
    <button
      onClick={()=>setDark(!dark)}
      className="glass flex h-10 w-10 items-center justify-center rounded-full"
      aria-label="Toggle theme"
    >
      {dark ? <Moon size={18}/> : <Sun size={18}/>}
    </button>
  );
}
