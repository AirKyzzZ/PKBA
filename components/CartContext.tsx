'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  color: string
  size: string
  quantity: number
  customization?: string
  image: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getTotalPriceInCents: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from cookies on mount
  useEffect(() => {
    try {
      const savedCart = typeof window !== 'undefined' ? window.localStorage.getItem('cart') : null
      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error('Error reading cart from localStorage:', error)
      setItems([])
    }
  }, [])

  // Save cart to cookies whenever items change
  useEffect(() => {
    try {
      if (items.length > 0) {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('cart', JSON.stringify(items))
        }
      } else {
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem('cart')
        }
      }
    } catch (error) {
      console.error('Error saving cart to localStorage:', error)
    }
  }, [items])

  const addToCart = (newItem: CartItem) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === newItem.id && 
                item.color === newItem.color && 
                item.size === newItem.size &&
                item.customization === newItem.customization
      )

      if (existingItemIndex > -1) {
        // Update existing item quantity
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += newItem.quantity
        return updatedItems
      } else {
        // Add new item
        return [...prevItems, newItem]
      }
    })
  }

  const removeFromCart = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const itemPrice = item.price + (item.customization ? 5 : 0) // Add 5€ for customization
      return total + (itemPrice * item.quantity)
    }, 0)
  }

  const getTotalPriceInCents = () => {
    return Math.round(items.reduce((total, item) => {
      const itemPrice = item.price + (item.customization ? 5 : 0) // Add 5€ for customization
      return total + (itemPrice * item.quantity)
    }, 0) * 100)
  }

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getTotalPriceInCents,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
