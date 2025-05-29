import {ProductComponent} from "@/app/features/inventory/components/ProductComponent";
import type {Product} from "@/app/features/types/inventory";

interface ProductGridProps {
    products: Product[]
}
export function ProductGrid({products}: ProductGridProps) {
    return (
        <>
            <h2 className="text-xl font-bold mb-2">Golf Clubs Inventory</h2>
            <div className="grid grid-cols-2 gap-4">
                {products.map((product) => (
                    <ProductComponent key={product.id} product={product}/>
                ))}
            </div>
        </>
    )
}