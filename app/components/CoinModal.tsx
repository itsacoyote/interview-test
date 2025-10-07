"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface CoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CoinModal({ isOpen, onClose }: CoinModalProps) {
  useEffect(() => {
    if (isOpen) {

    }
  }, []);

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

        <div className="modal-action">
          <button onClick={onClose} className="btn">
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
