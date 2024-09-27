export interface Message {
  id: number;
  name: string;
  content: string;
  time: string; // Adjust this based on your backend format (ISO string, timestamp, etc.)
  sender: string;
  type: string;
  text: string;
}
