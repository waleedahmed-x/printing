/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useRef, useEffect, useState } from "react";
import {
  Layer,
  Stage,
  Text,
  Transformer,
  Image as KonvaImage,
} from "react-konva";
import { Html } from "react-konva-utils";
import { useText } from "@/hooks/useText";
import { useImages } from "@/hooks/useImage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { fontFamilies } from "@/utils/fontsFamilies";
import Controls from "@/components/elements/Controls";
import ImagePicker from "@/components/elements/ImagePicker";

export default function Canvas() {
  const transformerRef = useRef<any>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const {
    textItems,
    setTextItems,
    addText,
    changeFontSize,
    handleTextDoubleClick,
    handleTextChange,
    handleInputBlur,
    handleDragEnd,
    handleFontChange,
    handleColorChange,
    selectedColor,
    selectedFont,
    toggleBold,
    toggleItalic,
    toggleUnderline,
  } = useText();
  console.log(textItems);

  const { uploadedImages, setUploadedImages, handleFileChange } = useImages();

  const handleDeleteSelectedNode = () => {
    if (selectedNode) {
      const nodeId = selectedNode.id();
      if (selectedNode.className === "Text") {
        setTextItems((prevTextItems) =>
          prevTextItems.filter((item) => item.id !== nodeId)
        );
      } else if (selectedNode.className === "Image") {
        setUploadedImages((prevImages) =>
          prevImages.filter((img) => img.id !== nodeId)
        );
      }
      setSelectedNode(null);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === "Delete" || e.key === "Backspace")) {
        handleDeleteSelectedNode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNode]);

  useEffect(() => {
    if (selectedNode && transformerRef.current) {
      transformerRef.current.nodes([selectedNode]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedNode]);

  return (
    <div className="playground-parent">
      <div className="elements">
        <Button onClick={addText}>Add Text</Button>
        <Select
          value={selectedFont}
          onValueChange={(value) => handleFontChange(value, selectedNode)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue
              placeholder="Select Font"
              style={{ fontFamily: selectedFont }}
            />
          </SelectTrigger>
          <SelectContent>
            {fontFamilies.map((font) => (
              <SelectItem
                key={font.value}
                value={font.value}
                style={{ fontFamily: font.value }}
              >
                {font.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <ImagePicker
          handleFileChange={handleFileChange}
          uploadedImages={uploadedImages}
        />
      </div>
      <div className="play-controls">
        <Controls
          selectedNode={selectedNode}
          toggleBold={toggleBold}
          toggleItalic={toggleItalic}
          toggleUnderline={toggleUnderline}
          textItems={textItems}
          changeFontSize={changeFontSize}
          selectedColor={selectedColor}
          handleColorChange={handleColorChange}
        />

        <Stage
          width={1140}
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
                    onClick={(e) => setSelectedNode(e.target)}
                    onDblClick={() => handleTextDoubleClick(item.id)}
                    onDragEnd={(e) =>
                      handleDragEnd(item.id, e.target.x(), e.target.y())
                    }
                    fontStyle={`${item.bold ? "bold" : "normal"} ${
                      item.italic ? "italic" : "normal"
                    }`}
                    textDecoration={item.underlined ? "underline" : "none"}
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
                        fontWeight: item.bold ? "bold" : "normal",
                        fontStyle: item.italic ? "italic" : "normal",
                        textDecoration: item.underlined ? "underline" : "none",
                      }}
                      onChange={(e) =>
                        handleTextChange(item.id, e.target.value)
                      }
                      onBlur={() => handleInputBlur(item.id)}
                    />
                  </Html>
                )}
              </React.Fragment>
            ))}

            {uploadedImages.map((image) => (
              <KonvaImage
                key={image.id}
                id={image.id}
                image={image.image}
                x={image.x}
                y={image.y}
                width={image.width}
                height={image.height}
                draggable
                onClick={(e) => setSelectedNode(e.target)}
                onDragEnd={(e) => {
                  const newX = e.target.x();
                  const newY = e.target.y();
                  setUploadedImages((prev) =>
                    prev.map((img) =>
                      img.id === image.id ? { ...img, x: newX, y: newY } : img
                    )
                  );
                }}
              />
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
    </div>
  );
}
