import ColorThief from 'colorthief';

const colorThief = new ColorThief();

export function extractDominantColor(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Permet le chargement de l'image depuis un autre domaine
    img.onload = function() {
      const dominantColor = colorThief.getColor(img);
      resolve(dominantColor);
    };
    img.onerror = function() {
      reject(new Error("Impossible de charger l'image."));
    };
    img.src = imageUrl;
  });
}