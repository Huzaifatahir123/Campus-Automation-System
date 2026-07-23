"use client"
import React from 'react'
import { useStore } from '@/store/useStore'

const unauthorize = () => {
  const Role = useStore((state) => state.Role);
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
  <div className="w-full max-w-md text-center">
    <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-6">
      Campus Login System
    </p>

    <div className="inline-block border-2 border-black px-6 py-2 mb-8 -rotate-2">
      <span className="font-serif text-sm uppercase tracking-widest text-black">
        Access Denied
      </span>
    </div>

    <h1 className="font-serif text-3xl text-black mb-4">
      You are not permitted to access this page
    </h1>

    <p className="text-sm text-neutral-500 mb-10 leading-relaxed">
      This area is restricted to authorized accounts only. If you believe
      this is a mistake, contact your campus administrator.
    </p>

    <div className="flex items-center justify-center gap-4">
      <a
        href={`/${Role}`}
        className="px-6 py-3 bg-black text-white text-sm uppercase tracking-wide hover:bg-neutral-800 transition-colors"
      >
        Return Home
      </a>
       <a
        href="/login"
        className="px-6 py-3 border-2 border-black text-black text-sm uppercase tracking-wide hover:bg-black hover:text-white transition-colors"
      >
        Sign In
      </a>
    </div>
  </div>
</div>
  )
}

export default unauthorize