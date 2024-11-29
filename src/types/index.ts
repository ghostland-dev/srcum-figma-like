export interface Position {
  x: number;
  y: number;
}

export interface CanvasComponent {
  id: string;
  type: 'button' | 'title' | 'text' | 'image';
  content: string;
  position: Position;
  imageSrc?: string;
}