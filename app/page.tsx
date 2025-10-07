'use client'

import { useEffect, useMemo, useState } from 'react'

import CoinModal from './components/CoinModal'
import { QueryClientProvider, useQuery, QueryClient } from '@tanstack/react-query'

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
  const [coins, setCoins] = useState<Coin[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetch('/api/coins').then(res => res.json()).then(data => {
      const coins = []
      for (const coin of data) {
        if (coin.platforms.ethereum) {
          coins.push(coin)
        }
        if (coins.length >= 50) {
          break
        }
      }
      setCoins(coins)
    })
  }, [])


  // const filteredCoins
  // coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  const filteredCoins = useMemo(() => {
    return coins.filter(coin => {
      const searchString = searchTerm.toLocaleLowerCase()
      return coin.name.toLocaleLowerCase().includes(searchString) || coin.symbol.toLocaleLowerCase().includes(searchString)
    })
  }, [coins, searchTerm])

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }


  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-24"
      data-theme="cupcake"
    >
      <div className="w-full max-w-4xl mb-4 flex flex-row gap-4">
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
          {filteredCoins && filteredCoins.map(coin => {
            return (
              <tr>
                <td>{coin.id}</td>
                <td>{coin.name}</td>
                <td>{coin.symbol}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>

      <CoinModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  )
}
