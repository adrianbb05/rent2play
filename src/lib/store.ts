import {create} from "zustand";
import type {Product} from "@/app/features/types/inventory";

interface ProductStore {
    products: Product[];
    setProducts: (products: Product[]) => void;
    updateProductQuantity: (id: number, quantity: number) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    setProducts: (products) => set({products}),
    updateProductQuantity: (id, quantity) =>
        set((state) => ({
            products: state.products.map((product) =>
                product.id === id ? {...product, quantity: quantity} : product
            ),
        })),
}));

interface SkusFilterStore {
    skusToFilter: string[];
    addSku: (sku: string) => void;
}

export const useSkusStore = create<SkusFilterStore>((set) => ({
    skusToFilter: [
        "CALLROGMANGRARH",
        "TMQI35MANSTERH",
        "TMQI35MANSTELH",
        "TMQI35MANGRRH",
        "TMQI35MANGRLH",
        "TMKALWOMGRLH",
        "TMKALWOMGRRH",
        "CALLROGWOMGRARH",
    ],
    addSku: (sku) =>
        set((state) => ({
            skusToFilter: [...state.skusToFilter, sku],
        })),
}));