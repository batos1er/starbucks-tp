import { create } from 'zustand'
import { CartData, ProductLineData } from '../types'
import { ProductData } from 'tp-kit/types'

export const useCart = create<CartData>((set) => ({
  lines: [],
}))

// [...]

/**
 * Ajoute une nouvelle ligne au panier.
 * Si le produit est déjà dans le panier, augmente la quantité de 1.
 * 
 * @param product 
 */
export function addLine(product: ProductData) {
  useCart.setState((state) => {
    const lines = [...state.lines];  
    let ligneproduitId = lines.findIndex((line) => line.product.id === product.id)
    if(ligneproduitId === -1){
      lines.push({product : product,qty : 1});
    }
    else{
      lines[ligneproduitId].qty = lines[ligneproduitId].qty +1;
    }
    console.log(lines)
    return {lines:lines}
  })
}

/**
 * Modifie une ligne produit du panier
 * 
 * @param line 
 */
export function updateLine(line: ProductLineData) {
  useCart.setState((state) =>{
    const lines = [...state.lines];
    let ligneId = lines.findIndex((ligne) => ligne.product.id === line.product.id)
    lines[ligneId] = line;
    return {lines:lines}
  })
}

/**
 * Supprime la ligne produit du panier 
 * 
 * @param productId 
 * @returns 
 */
export function removeLine(productId: number) {
  useCart.setState((state) =>{
    const lines = [...state.lines];
    return {lines:lines.filter(l => l.product.id !== productId)}
  })
}

/**
 * Vide le contenu du panier actuel
 */
export function clearCart() {
  useCart.setState((state) =>{
    return {lines : [],}
  })
}

/**
 * Calcule le total d'une ligne du panier
 */
export function computeLineSubTotal(line: ProductLineData): number {
  return line.qty * line.product.price
}

/**
 * Calcule le total du panier
 */
export function computeCartTotal(lines: ProductLineData[]): number {
  let total = 0.00
  for(let i = 0; i<lines.length; i++){
    total += computeLineSubTotal(lines[i]);
  }
  return total
}