import { NextResponse } from "next/server";

/**
 * Returns (example)
  {
    "id": "0x-leverage",
    "symbol": "oxl",
    "name": "0x Leverage",
    "description": {
        "en": "0xLeverage is a ground breaking all-in-one defi trading bot, accessible exclusively on telegram. The bots capabilities are unparalleled in the space as users will have the power to leverage their buying power and amplify their potential profits like never before.\r\n\r\nLet’s make it plain. Using leverage when trading is borrowing additional capital to magnify gains but also exposes you to a higher chance of immutability losing your investment.\r\n\r\nThe advantage is it provides traders with an opportunity to earn higher returns using a smaller initial investment. However the higher reward potential carries higher risk as those borrowed funds must be paid back.\r\n\r\nEither those borrowed funds are paid back when you sell for profit or when the price drops to a liquidation level which is presented to the investor prior to opening a trade.\r\n\r\nThe higher the leverage you choose the closer your liquidation price will be to your initial price, leaving little room when the price of the asset drops, especially if that asset has low liquidity.\r\n\r\nHow our leverage system works on Blockchain\r\nWhen a user is on the leverage menu on our bot, they select their initial funds and the amount of leverage they want to borrow. For example if the user selects $50 and 3x leverage they are borrowing an additional $100 from the leverage pool to give them 3x the position while only risking 1/3 of their actual funds.\r\n\r\nWhen they open the trade their $50 are transferred to their unique leverage wallet. Simultaneously $100 are sent from our leverage pool. With those combined funds a trade is opened for $150 in the selected token.\r\n\r\nOnce that trade is open the user must watch their liquidation price closely. They can track their trade but typing /tracklev and close their position at any time.\r\n\r\nIf the users position falls to liquidation price their position will automatically sell. And those funds are all sent back to the leverage pool.\r\n\r\nIf the user closes the position in profit the user gets their initial plus gains sent to their wallet, minus the loaned amount and fees which are sent to the leverage pool.",
        ...
    },
    "image": {
        "thumb": "https://coin-images.coingecko.com/coins/images/31977/thumb/Ox.jpeg?1696530780",
        "small": "https://coin-images.coingecko.com/coins/images/31977/small/Ox.jpeg?1696530780",
        "large": "https://coin-images.coingecko.com/coins/images/31977/large/Ox.jpeg?1696530780"
    },
    "contract_address": "0x03ee5026c07d85ff8ae791370dd0f4c1ae6c97fc",
    "market_data": {
        "current_price": {
            "usd": 0.00081087,
        },
        "total_value_locked": null,
        "mcap_to_tvl_ratio": null,
        "fdv_to_tvl_ratio": null,
        "roi": null,
        "market_cap": {
            "usd": 0,
        },
        "total_volume": {
            "usd": 21712,
        },
        "total_supply": 1000000000,
        "max_supply": 1000000000,
        "max_supply_infinite": false,
        "circulating_supply": 0,
        "last_updated": "2025-10-06T21:41:05.834Z"
    },
}
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const apiKey = process.env.COINGECKO_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "COINGECKO_API_KEY is not configured" },
      { status: 500 }
    );
  }

  const { id } = await params;

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}`,
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
      { error: "Failed to fetch coin data", details: String(error) },
      { status: 500 }
    );
  }
}
