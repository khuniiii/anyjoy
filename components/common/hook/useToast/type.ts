export interface useToastProps {
  title?: string;
  content?: string;
  type?: "success" | "warn" | "error";
  duration?: number;
}
