"use client";
import { useState } from "react";

export interface TextItem {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  fill: string;
  isEditing: boolean;
}

export function useText() {
  const [textItems, setTextItems] = useState<TextItem[]>([]);

  const addText = () => {
    const newText: TextItem = {
      id: Date.now().toString(),
      text: "New Text",
      x: 300,
      y: 50,
      fontSize: 30,
      fontFamily: "Arial",
      fill: "#ffffff",
      isEditing: false,
    };
    setTextItems((prev) => [...prev, newText]);
  };

  const handleTextDoubleClick = (id: string) => {
    setTextItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isEditing: true } : item))
    );
  };

  const handleTextChange = (id: string, value: string) => {
    setTextItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text: value } : item))
    );
  };

  const handleInputBlur = (id: string) => {
    setTextItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isEditing: false } : item
      )
    );
  };

  const handleDragEnd = (id: string, newX: number, newY: number) => {
    setTextItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, x: newX, y: newY } : item
      )
    );
  };

  // Update font family
  const changeFontFamily = (id: string, fontFamily: string) => {
    setTextItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, fontFamily } : item))
    );
  };

  // Update text color
  const changeTextColor = (id: string, color: string) => {
    setTextItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, fill: color } : item))
    );
  };

  return {
    textItems,
    addText,
    handleTextDoubleClick,
    handleTextChange,
    handleInputBlur,
    handleDragEnd,
    changeFontFamily,
    changeTextColor,
  };
}
