import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Bold,
  FontDecrease,
  FontIncrease,
  Italic,
  Underline,
} from "@/components/icons/Icons";
import { Input } from "@/components/ui/input";
import { ControlsProps } from "@/interfaces/Interfaces";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Controls({
  selectedNode,
  toggleBold,
  toggleUnderline,
  toggleItalic,
  textItems,
  changeFontSize,
  selectedColor,
  handleColorChange,
}: ControlsProps) {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const disabled = textItems.length === 0;

  useEffect(() => {
    if (selectedNode?.attrs?.fontStyle?.includes("bold")) {
      setIsBold(true);
    } else {
      setIsBold(false);
    }

    if (selectedNode?.attrs?.fontStyle?.includes("italic")) {
      setIsItalic(true);
    } else {
      setIsItalic(false);
    }

    if (selectedNode?.attrs?.textDecoration === "underline") {
      setIsUnderline(true);
    } else {
      setIsUnderline(false);
    }
  }, [selectedNode, textItems]);

  return (
    <div className="controls">
      <Button
        variant={isBold ? "default" : "outline"}
        size="icon"
        disabled={disabled}
        onClick={() => selectedNode && toggleBold(selectedNode.id())}
      >
        <Bold />
      </Button>
      <Button
        variant={isUnderline ? "default" : "outline"}
        size="icon"
        disabled={disabled}
        onClick={() => selectedNode && toggleUnderline(selectedNode.id())}
      >
        <Underline />
      </Button>
      <Button
        variant={isItalic ? "default" : "outline"}
        size="icon"
        disabled={disabled}
        onClick={() => selectedNode && toggleItalic(selectedNode.id())}
      >
        <Italic />
      </Button>
      <Button
        variant="outline"
        size="icon"
        disabled={disabled}
        onClick={() => {
          if (selectedNode) {
            const currentFontSize =
              textItems.find((item) => item.id === selectedNode.id())
                ?.fontSize || 30;
            changeFontSize(selectedNode.id(), currentFontSize + 2);
          }
        }}
      >
        <FontDecrease />
      </Button>
      <Button
        variant="outline"
        size="icon"
        disabled={disabled}
        onClick={() => {
          if (selectedNode) {
            const currentFontSize =
              textItems.find((item) => item.id === selectedNode.id())
                ?.fontSize || 30;
            changeFontSize(selectedNode.id(), Math.max(currentFontSize - 2, 1));
          }
        }}
      >
        <FontIncrease />
      </Button>
      <Input
        type="color"
        className="colorpicker"
        value={selectedColor}
        disabled={disabled}
        onChange={(e) => handleColorChange(e, selectedNode)}
      />
    </div>
  );
}
