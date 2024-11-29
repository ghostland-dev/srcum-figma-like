export interface Position {
  x: number;
  y: number;
}

export interface CanvasComponent {
  id: string;
  type: 'button' | 'title' | 'text';
  content: string;
  position: {
    x: number;
    y: number;
  };
  width?: number;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: number;
}