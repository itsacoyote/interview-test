import { NextResponse } from "next/server";

/**
 * Returns (example)
  {
    "id": "_",
    "symbol": "gib",
    "name": "༼ つ ◕_◕ ༽つ",
    "platforms": {
        "ethereum": "0x00000000000000000000000000000000007872cb"
    }
  }
 */
export async function GET() {
  const apiKey = process.env.COINGECKO_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "COINGECKO_API_KEY is not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/list?status=active&include_platform=true",
      {
        headers: {
          "x-cg-demo-api-key": apiKey,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `CoinGecko API error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch coins list", details: String(error) },
      { status: 500 }
    );
  }
}
