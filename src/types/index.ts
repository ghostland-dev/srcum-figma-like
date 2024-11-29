export interface Position {
  x: number;
  y: number;
}

export interface CanvasComponent {
  id: string;
  type: 'button' | 'title' | 'text' | 'geolocalisation';
  content: string;
  position: Position;
}