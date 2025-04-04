export interface TouristsSpotsProps {
  audio: string;
  id: string;
  description: string;
  category: string;
  images: string[];
  location: {
    latitude: number;
    longitute: number;
  };
  name: string;
  videoUrl: string;
}
