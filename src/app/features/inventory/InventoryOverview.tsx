import type {Product} from "@/app/features/types/inventory"
import {SkuRefinement} from "@/app/features/inventory/components/SkuRefinement";
import {ProductGrid} from "@/app/features/inventory/components/ProductGrid";

interface InventoryOverviewProps {
    products: Product[]
}

export function InventoryOverview({products}: InventoryOverviewProps) {
    return (
        <>
            <SkuRefinement/>
            <ProductGrid products={products}/>
        </>
    )
}