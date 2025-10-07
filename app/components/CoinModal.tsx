'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface CoinModalProps {
  id: string
  isOpen: boolean;
  onClose: () => void;
}

export default function CoinModal({ id, isOpen, onClose }: CoinModalProps) {
  const [coin, setCoin] = useState()

  useEffect(() => {
    if (isOpen) {
      fetch(`/api/coin/${id}`).then(res => res.json()).then(data => {
        setCoin(data)
      })
    }
  }, [isOpen, id])

  if (!isOpen) return null

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
        <div>
          {coin && coin.name}
        </div>

        <div className="modal-action">
          <button onClick={onClose} className="btn">
            Close
          </button>
        </div>
      </div>
    </dialog>
  )
}
