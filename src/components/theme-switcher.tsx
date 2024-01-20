"use client";
import { useEffect } from "react";
import { themeChange } from "theme-change";

export default function ThemeSwitcher({ className = "" }) {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);

  return (
    <button
      data-toggle-theme="sunset,light"
      data-act-class="ACTIVECLASS"
      className={`${className} flex items-center justify-center`}
    >
      <input type={`checkbox`} className={`toggle`} />
    </button>
  );
}
