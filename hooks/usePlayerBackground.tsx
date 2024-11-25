// import { useState, useEffect } from "react";
// import { Platform } from "react-native";
// import { IOSImageColors, AndroidImageColors } from "react-native-image-colors/build/types";
// import { getColors } from "react-native-image-colors";
// import { colors } from "@/constants/tokens";

// type ImageColors = IOSImageColors | AndroidImageColors | null;

// export const usePlayerBackground = (imageUrl: string) => {
//   const [imageColors, setImageColors] = useState<ImageColors>(null);

//   useEffect(() => {
//     const fetchColors = async () => {
//       try {
//         const result = await getColors(imageUrl, {
//           fallback: colors.background,
//           cache: true,
//           key: imageUrl,
//         });

//         setImageColors(result);
//       } catch (error) {
//         console.error("Error fetching image colors:", error);
//         setImageColors(null); // Fallback if color extraction fails
//       }
//     };

//     fetchColors();
//   }, [imageUrl]);

//   const primaryColor =
//     Platform.OS === "ios"
//       ? imageColors?.background
//       : (imageColors as AndroidImageColors)?.dominant || colors.background;

//   return { imageColors, primaryColor };
// };
