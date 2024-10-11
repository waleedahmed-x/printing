import { TextItem } from "@/interfaces/Interfaces";
import Konva from "konva";
import { useState } from "react";

export function useText() {
  const [textItems, setTextItems] = useState<TextItem[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const [selectedFont, setSelectedFont] = useState<string>("Arial");

  const addText = () => {
    const newText: TextItem = {
      id: Date.now().toString(),
      text: "New Text",
      x: 300,
      y: 50,
      fontSize: 30,
      bold: false,
      italic: false,
      underlined: false,
      fontFamily: "Arial",
      fill: selectedColor,
      isEditing: false,
    };
    setTextItems((prev) => [...prev, newText]);
  };

  // Handle double-click to edit text
  const handleTextDoubleClick = (id: string) => {
    setTextItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isEditing: true } : item))
    );
  };
  // Handle text change
  const changeFontSize = (id: string, newSize: number) => {
    setTextItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, fontSize: newSize } : item
      )
    );
  };

  // Handle text change
  const handleTextChange = (id: string, value: string) => {
    setTextItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text: value } : item))
    );
  };

  // Handle input blur to stop editing
  const handleInputBlur = (id: string) => {
    setTextItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isEditing: false } : item
      )
    );
  };

  // Handle drag end to update position
  const handleDragEnd = (id: string, newX: number, newY: number) => {
    setTextItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, x: newX, y: newY } : item
      )
    );
  };

  // Change font family of text item
  const changeFontFamily = (id: string, fontFamily: string) => {
    setTextItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, fontFamily } : item))
    );
  };

  const handleFontChange = (font: string, selectedNode: Konva.Node) => {
    setSelectedFont(font);
    if (selectedNode) {
      changeFontFamily(selectedNode.id(), font);
    }
  };

  // Change text color
  const changeTextColor = (id: string, color: string) => {
    setTextItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, fill: color } : item))
    );
  };

  const handleColorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    selectedNode: Konva.Node | null
  ) => {
    const color = e.target.value;
    setSelectedColor(color);
    if (selectedNode) {
      changeTextColor(selectedNode.id(), color);
    }
  };

  // Toggle bold style
  const toggleBold = (id: string) => {
    setTextItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, bold: !item.bold } : item
      )
    );
  };

  // Toggle italic style
  const toggleItalic = (id: string) => {
    setTextItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, italic: !item.italic } : item
      )
    );
  };

  // Toggle underline style
  const toggleUnderline = (id: string) => {
    setTextItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, underlined: !item.underlined } : item
      )
    );
  };

  return {
    textItems,
    setTextItems,
    addText,
    handleTextDoubleClick,
    handleTextChange,
    handleInputBlur,
    handleDragEnd,
    changeFontSize,
    toggleBold,
    toggleItalic,
    toggleUnderline,
    handleColorChange,
    selectedColor,
    handleFontChange,
    selectedFont,
  };
}
