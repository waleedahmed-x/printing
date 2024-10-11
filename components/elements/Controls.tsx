import React from "react";
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
  return (
    <div className="controls">
      <Button
        variant="outline"
        size="icon"
        disabled={textItems.length === 0}
        onClick={() => selectedNode && toggleBold(selectedNode.id())}
      >
        <Bold />
      </Button>
      <Button
        variant="outline"
        size="icon"
        disabled={textItems.length === 0}
        onClick={() => selectedNode && toggleUnderline(selectedNode.id())}
      >
        <Underline />
      </Button>
      <Button
        variant="outline"
        size="icon"
        disabled={textItems.length === 0}
        onClick={() => selectedNode && toggleItalic(selectedNode.id())}
      >
        <Italic />
      </Button>
      <Button
        variant="outline"
        size="icon"
        disabled={textItems.length === 0}
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
        disabled={textItems.length === 0}
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
        disabled={textItems.length === 0}
        onChange={(e) => handleColorChange(e, selectedNode)}
      />
    </div>
  );
}
