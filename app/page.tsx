"use client";

import { useEffect, useState } from "react";

import CoinModal from "./components/CoinModal";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  platforms: {
    ethereum?: string;
    [key: string]: string | undefined;
  };
}

export default function Home() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [selectedCoinId, setSelectedCoinId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/coins")
      .then((res) => res.json())
      .then((data) =>
        data.filter((coin: Coin) => {
          const keys = Object.keys(coin.platforms);
          return keys.includes("ethereum");
        })
      )
      .then((data) => setCoins(data.slice(0, 50)))
      .catch((error) => console.error("Error fetching coins:", error));
  }, []);

  const handleOpenModal = (coinId: string) => {
    setSelectedCoinId(coinId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCoinId(null);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-24"
      data-theme="cupcake"
    >
      <div className="w-full max-w-4xl mb-4">
        <input
          type="text"
          placeholder="Search by coin name..."
          className="input input-bordered w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 bg-white">
        <table className="table">
          <tbody>
            {filteredCoins &&
              filteredCoins.map((coin, idx) => (
                <tr key={idx}>
                  <td>{coin.name}</td>
                  <td>{coin.symbol}</td>
                  <td>{coin.platforms.ethereum}</td>
                  <td>
                    <button
                      className="btn btn-sm"
                      onClick={() => handleOpenModal(coin.id)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <CoinModal
        coinId={selectedCoinId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
}
