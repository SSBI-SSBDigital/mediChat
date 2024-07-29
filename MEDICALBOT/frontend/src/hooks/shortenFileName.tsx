// export const shortenFileName = (fileName: string): string => {
export const shortenFileName = (fileName: string): string => {
  const extensionMatch = fileName.match(/\.[^.]+$/);
  const extension = extensionMatch ? extensionMatch[0] : "";

  const nameWithoutExtension = extension
    ? fileName.slice(0, -extension.length)
    : fileName;

  const cleanedName = nameWithoutExtension
    .replace(/[- =]+/g, "") // Remove hyphens, spaces, and equal signs
    .replace(/\.+/g, ".") // Replace multiple dots with a single dot
    .trim();

  if (cleanedName.length > 10) {
    const firstPart = cleanedName.slice(0, 5);
    const lastPart = cleanedName.slice(-3);
    return `${firstPart}...${lastPart}${extension}`;
  }

  return fileName;
};

export default shortenFileName;
