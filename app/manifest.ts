import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Typing Shadowing",
    short_name: "TypingShadowing",
    description: "Aprende inglés tipeando y escuchando por niveles MCER A1 a C2.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f7fa",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
