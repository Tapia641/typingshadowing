import { NextResponse } from "next/server";

/**
 * ads.txt para Google AdSense. Si NEXT_PUBLIC_ADSENSE_CLIENT está definido
 * (formato ca-pub-XXXXXXXXXXXXXXXX), se publica la línea de autorización.
 */
export function GET() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const pubId = client?.replace(/^ca-/, "");

  const body = pubId
    ? `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`
    : "# ads.txt — configura NEXT_PUBLIC_ADSENSE_CLIENT para habilitar AdSense.\n";

  return new NextResponse(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
