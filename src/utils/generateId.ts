export default function generateID(): string {
  return Math.random().toString(36).substring(2, 9);
}