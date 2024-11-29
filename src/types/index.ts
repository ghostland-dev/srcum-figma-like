export interface Position {
  x: number;
  y: number;
}

export interface CanvasComponent {
  id: string;
  type: 'button' | 'title' | 'text' | 'image' | 'geolocalisation' | 'carousel' | 'images';
  content: string;
  position: Position;
  imageSrc?: string;
  images?: string[];
}