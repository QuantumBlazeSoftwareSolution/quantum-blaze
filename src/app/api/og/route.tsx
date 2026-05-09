import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Dynamic params
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "Premium Software Development Agency";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#050b14", // Deep slate-black
            backgroundImage: "linear-gradient(to bottom right, #050b14, #0a192f)",
            position: "relative",
          }}
        >
          {/* Subtle grid pattern background */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: "radial-gradient(circle at 2px 2px, rgba(14, 165, 233, 0.15) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              zIndex: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                marginBottom: "40px",
              }}
            >
              {/* Logo placeholder - using text as fallback since we can't easily fetch local files in Edge runtime without absolute URLs */}
              <div
                style={{
                  color: "#0ea5e9",
                  fontSize: "60px",
                  fontWeight: "800",
                  letterSpacing: "0.05em",
                }}
              >
                ⚛
              </div>
              <div
                style={{
                  color: "#ffffff",
                  fontSize: "50px",
                  fontWeight: "800",
                  letterSpacing: "0.1em",
                }}
              >
                QUANTUM <span style={{ color: "#0ea5e9" }}>BLAZE</span>
              </div>
            </div>

            <div
              style={{
                color: "#ffffff",
                fontSize: "72px",
                fontWeight: "900",
                textAlign: "center",
                maxWidth: "900px",
                lineHeight: 1.2,
              }}
            >
              {title}
            </div>

            <div
              style={{
                color: "#94a3b8",
                fontSize: "30px",
                marginTop: "30px",
                fontWeight: "500",
                letterSpacing: "0.05em",
              }}
            >
              Architecting Digital Futures
            </div>
          </div>

          {/* Bottom highlight bar */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "8px",
              background: "linear-gradient(to right, #0ea5e9, #3b82f6)",
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error(e.message);
    return new Response("Failed to generate image", { status: 500 });
  }
}
