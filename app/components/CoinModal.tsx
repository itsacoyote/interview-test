"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface CoinModalProps {
  coinId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  description?: {
    en?: string;
  };
  market_data?: {
    current_price?: {
      usd?: number;
    };
    market_cap?: {
      usd?: number;
    };
    total_volume?: {
      usd?: number;
    };
  };
  image?: {
    large?: string;
  };
}

export default function CoinModal({ coinId, isOpen, onClose }: CoinModalProps) {
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && coinId) {
      setLoading(true);
      setError(null);
      fetch(`/api/coin/${coinId}`)
        .then((res) => res.json())
        .then((data) => {
          setCoinData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to load coin data");
          setLoading(false);
          console.error("Error fetching coin data:", err);
        });
    }
  }, [coinId, isOpen]);

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <form method="dialog">
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>

        {loading && (
          <div className="flex justify-center p-8">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}

        {coinData && !loading && (
          <div>
            <div className="flex items-center gap-4 mb-4">
              {coinData.image?.large && (
                <Image
                  src={coinData.image.large}
                  alt={coinData.name}
                  width={64}
                  height={64}
                  className="w-16 h-16"
                />
              )}
              <div>
                <h3 className="font-bold text-lg">{coinData.name}</h3>
                <p className="text-sm opacity-70 uppercase">
                  {coinData.symbol}
                </p>
              </div>
            </div>

            {coinData.market_data?.current_price?.usd && (
              <div className="stats shadow w-full mb-4">
                <div className="stat">
                  <div className="stat-title">Price (USD)</div>
                  <div className="stat-value text-2xl">
                    ${coinData.market_data.current_price.usd.toLocaleString()}
                  </div>
                </div>
              </div>
            )}

            {coinData.market_data && (
              <div className="grid grid-cols-2 gap-2 mb-4">
                {coinData.market_data.market_cap?.usd && (
                  <div className="stat bg-base-200 rounded-lg p-3">
                    <div className="stat-title text-xs">Market Cap</div>
                    <div className="stat-value text-sm">
                      ${(coinData.market_data.market_cap.usd / 1000000000).toFixed(2)}B
                    </div>
                  </div>
                )}
                {coinData.market_data.total_volume?.usd && (
                  <div className="stat bg-base-200 rounded-lg p-3">
                    <div className="stat-title text-xs">24h Volume</div>
                    <div className="stat-value text-sm">
                      ${(coinData.market_data.total_volume.usd / 1000000000).toFixed(2)}B
                    </div>
                  </div>
                )}
              </div>
            )}

            {coinData.description?.en && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Description</h4>
                <div
                  className="text-sm opacity-80 max-h-48 overflow-y-auto"
                  dangerouslySetInnerHTML={{
                    __html: coinData.description.en.slice(0, 500) + "...",
                  }}
                />
              </div>
            )}
          </div>
        )}

        <div className="modal-action">
          <button onClick={onClose} className="btn">
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
