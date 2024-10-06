/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useRef, useEffect, useState } from "react";
import { Layer, Stage, Text, Transformer } from "react-konva";
import { Html } from "react-konva-utils";
import { useText } from "@/hooks/useText";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Canvas() {
  const transformerRef = useRef<any>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [selectedFont, setSelectedFont] = useState<string>("Arial");
  const [selectedColor, setSelectedColor] = useState<string>("#000000");

  const {
    textItems,
    addText,
    handleTextDoubleClick,
    handleTextChange,
    handleInputBlur,
    handleDragEnd,
    changeFontFamily,
    changeTextColor,
  } = useText();

  const handleSelect = (node: any) => {
    setSelectedNode(node);
  };

  const handleFontChange = (font: string) => {
    setSelectedFont(font);
    if (selectedNode) {
      changeFontFamily(selectedNode.id(), font);
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setSelectedColor(color);
    if (selectedNode) {
      changeTextColor(selectedNode.id(), color);
    }
  };

  useEffect(() => {
    if (selectedNode && transformerRef.current) {
      transformerRef.current.nodes([selectedNode]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedNode]);

  return (
    <div className="playground-parent">
      <div className="controls">
        <button onClick={addText} style={{ marginBottom: "10px" }}>
          Add Text
        </button>
        {/* shadcn/ui Select Component */}
        <Select value={selectedFont} onValueChange={handleFontChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Font" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Arial">Arial</SelectItem>
            <SelectItem value="Times New Roman">Times New Roman</SelectItem>
            <SelectItem value="Courier New">Courier New</SelectItem>
            {/* Add more fonts if needed */}
          </SelectContent>
        </Select>

        <Input
          type="color"
          value={selectedColor}
          onChange={handleColorChange}
          style={{ marginLeft: "10px" }}
        />
      </div>

      <Stage
        width={1000}
        height={700}
        className="playground"
        onMouseDown={(e) => {
          if (e.target === e.target.getStage()) {
            setSelectedNode(null);
          }
        }}
      >
        <Layer>
          {textItems.map((item) => (
            <React.Fragment key={item.id}>
              {!item.isEditing ? (
                <Text
                  id={item.id}
                  text={item.text}
                  fontSize={item.fontSize}
                  fontFamily={item.fontFamily}
                  fill={item.fill}
                  x={item.x}
                  y={item.y}
                  draggable
                  onClick={(e) => handleSelect(e.target)}
                  onDblClick={() => handleTextDoubleClick(item.id)}
                  onDragEnd={(e) =>
                    handleDragEnd(item.id, e.target.x(), e.target.y())
                  }
                />
              ) : (
                <Html>
                  <input
                    value={item.text}
                    style={{
                      position: "absolute",
                      top: item.y,
                      left: item.x,
                      fontSize: item.fontSize,
                      fontFamily: item.fontFamily,
                      color: item.fill,
                      background: "none",
                      border: "none",
                      outline: "none",
                    }}
                    onChange={(e) => handleTextChange(item.id, e.target.value)}
                    onBlur={() => handleInputBlur(item.id)}
                  />
                </Html>
              )}
            </React.Fragment>
          ))}

          {selectedNode && (
            <Transformer
              ref={transformerRef}
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 50 || newBox.height < 50) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
}
