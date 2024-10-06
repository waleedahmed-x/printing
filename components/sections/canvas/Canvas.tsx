"use client";
import { Input } from "@/components/ui/input";
import React, { useState, useRef, useEffect } from "react";
import {
  Layer,
  Stage,
  Image as KonvaImage,
  Text,
  Transformer,
} from "react-konva";
import { Html } from "react-konva-utils";

interface TextItem {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  isEditing: boolean;
}

interface UploadedImage {
  id: string;
  image: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function Canvas() {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [textItems, setTextItems] = useState<TextItem[]>([]);
  const transformerRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedShape, setSelectedShape] = useState<any>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const img = new window.Image();
      img.src = url;
      img.onload = () => {
        const newImage = {
          id: Date.now().toString(),
          image: img,
          x: 150,
          y: 150,
          width: 300,
          height: 300,
        };
        setUploadedImages((prev) => [...prev, newImage]);
      };
    }
  };

  const addText = () => {
    const newText: TextItem = {
      id: Date.now().toString(),
      text: "New Text",
      x: 300,
      y: 50,
      fontSize: 30,
      isEditing: false,
    };
    setTextItems((prev) => [...prev, newText]);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelect = (shape: any) => {
    setSelectedShape(shape);
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
        item.id === id
          ? {
              ...item,
              x: newX,
              y: newY,
            }
          : item
      )
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedShape && (e.key === "Delete" || e.key === "Backspace")) {
        if (e.shiftKey) {
          if (selectedShape.attrs.id) {
            // Remove text
            setTextItems((prev) =>
              prev.filter((item) => item.id !== selectedShape.attrs.id)
            );
            // Remove image
            setUploadedImages((prev) =>
              prev.filter((img) => img.id !== selectedShape.attrs.id)
            );
          }
          setSelectedShape(null);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedShape, uploadedImages]);

  useEffect(() => {
    if (selectedShape && transformerRef.current) {
      // @ts-expect-error kjn
      transformerRef.current.nodes([selectedShape]);
      // @ts-expect-error kjn
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedShape]);

  return (
    <div className="playground-parent">
      <div className="input-container">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginBottom: "10px" }}
        />
        <button onClick={addText} style={{ marginBottom: "10px" }}>
          Add Text
        </button>
      </div>

      <Stage
        width={1000}
        height={700}
        className="playground"
        onMouseDown={(e) => {
          if (e.target === e.target.getStage()) {
            setSelectedShape(null);
          }
        }}
      >
        <Layer>
          {uploadedImages.map((img) => (
            <KonvaImage
              key={img.id}
              id={img.id}
              image={img.image}
              x={img.x}
              y={img.y}
              width={img.width}
              height={img.height}
              draggable
              onClick={(e) => handleSelect(e.target)}
              onTap={(e) => handleSelect(e.target)}
            />
          ))}

          {textItems.map((item) => (
            <React.Fragment key={item.id}>
              {!item.isEditing ? (
                <Text
                  id={item.id}
                  text={item.text}
                  x={item.x}
                  y={item.y}
                  fontSize={item.fontSize}
                  draggable
                  onClick={(e) => handleSelect(e.target)}
                  onTap={(e) => handleSelect(e.target)}
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
                      width: "auto",
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

          {selectedShape && (
            <Transformer
              ref={transformerRef}
              rotateEnabled={true}
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
