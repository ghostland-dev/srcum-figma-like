export interface Position {
  x: number;
  y: number;
}

export interface CanvasComponent {
  id: string;
  type: 'button' | 'title' | 'text' | 'image' | 'geolocalisation' | 'carousel' | 'images';
  content: string;
  position: {
    x: number;
    y: number;
  };
  width?: number;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: number;
  imageSrc?: string;
  images?: string[];
}