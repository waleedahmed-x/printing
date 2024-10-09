import React from "react";
import { Button } from "../ui/button";
import {
  Bold,
  FontDecrease,
  FontIncrease,
  Italic,
  Underline,
} from "@/components/icons/Icons";
import { TextItem } from "@/hooks/useText";
import Konva from "konva";

interface ControlsProps {
  selectedNode: Konva.Node | null;
  toggleBold: (id: string) => void;
  toggleUnderline: (id: string) => void;
  toggleItalic: (id: string) => void;
  textItems: TextItem[];
  changeFontSize: (id: string, newSize: number) => void;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Controls({
  selectedNode,
  toggleBold,
  toggleUnderline,
  toggleItalic,
  textItems,
  changeFontSize,
}: ControlsProps) {
  return (
    <div className="controls">
      <Button
        variant="outline"
        size="icon"
        onClick={() => selectedNode && toggleBold(selectedNode.id())}
      >
        <Bold />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => selectedNode && toggleUnderline(selectedNode.id())}
      >
        <Underline />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => selectedNode && toggleItalic(selectedNode.id())}
      >
        <Italic />
      </Button>
      <Button
        variant="outline"
        size="icon"
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
    </div>
  );
}
