export async function compressImageToFile(
  file: File | Blob,
  maxDimension: number = 1200, // Default maximum dimension for either width or height
  quality: number = 0.9 // Default quality reduction for significant file size decrease
): Promise<File> {
  if (!file.type.startsWith("image/")) {
    throw new Error("File is not an image");
  }

  const img = new Image();
  img.src = URL.createObjectURL(file);

  try {
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = () => reject(new Error("Error loading image"));
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    // Calculate new dimensions while keeping aspect ratio
    const ratio = Math.min(maxDimension / img.width, maxDimension / img.height);
    const newWidth = img.width * ratio;
    const newHeight = img.height * ratio;

    canvas.width = newWidth;
    canvas.height = newHeight;

    // Draw the image onto the canvas with the new dimensions
    ctx.drawImage(img, 0, 0, newWidth, newHeight);

    // Convert the canvas to a Blob and then to a File
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Compression failed: Unable to convert canvas to blob."));
          }
        },
        "image/jpeg",
        quality
      );
    });

    // Return a new File object with the same name as the original file
    return new File([blob], file.name, {
      type: "image/jpeg",
      lastModified: Date.now(),
    });
  } catch (error) {
    URL.revokeObjectURL(img.src);
    throw error; // Rethrow to be caught by the caller
  }
}
