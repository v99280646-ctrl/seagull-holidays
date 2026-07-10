export function imageSrc(image: string | { src: string }) {
  return typeof image === "string" ? image : image.src;
}
