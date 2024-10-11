import Konva from "konva";

export interface UploadedImage {
  id: string;
  image: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface ImagePickerProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  uploadedImages: UploadedImage[];
}
export interface ControlsProps {
  selectedNode: Konva.Node | null;
  toggleBold: (id: string) => void;
  toggleUnderline: (id: string) => void;
  toggleItalic: (id: string) => void;
  textItems: TextItem[];
  changeFontSize: (id: string, newSize: number) => void;
  selectedColor: string;
  handleColorChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    selectedNode: Konva.Node | null
  ) => void;
}
export interface TextItem {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  bold: boolean;
  italic: boolean;
  underlined: boolean;
  fill: string;
  isEditing: boolean;
}
