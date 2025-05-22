import type {Product} from "@/app/features/types/inventory";
import {useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useProductStore, useSkusStore} from "@/lib/store";
import {Button} from "@/components/ui/button";

interface InventoryOverviewProps {
    products: Product[]
}

export function InventoryOverview({products}: InventoryOverviewProps) {
    const [sku, setSku] = useState("")
    const {addSku} = useSkusStore()

    const handleAddSku = () => {
        if (sku.trim()) {
            addSku(sku.trim())
            setSku("")
        }
    }

    return (
        <div>
            <div className="flex items-center gap-4 mb-4">
                <Input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="Refine new SKU to show in inventory"
                    className="p-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <Button
                    onClick={handleAddSku}
                >
                    Add SKU
                </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {products.map((product) => (
                    <ProductComponent key={product.id} product={product}/>
                ))}
            </div>
        </div>
    )
}

interface ProductComponentProps {
    product: Product
}

function ProductComponent({product}: ProductComponentProps) {
    const [quantity, setQuantity] = useState(product.quantity ?? 0)
    const {updateProductQuantity} = useProductStore()

    const incrementQuantity = () => {
        const newQuantity = quantity + 1
        setQuantity(newQuantity)
        updateProductQuantity(product.id, newQuantity)
    }

    const decrementQuantity = () => {
        const newQuantity = Math.max(0, quantity - 1)
        setQuantity(newQuantity)
        updateProductQuantity(product.id, newQuantity)
    }

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isNaN(Number(e.target.value))) {
            return
        }
        const newQuantity = Number(e.target.value)
        setQuantity(newQuantity)
        updateProductQuantity(product.id, newQuantity)
    }

    return (
        <Card className="w-xl p-4 border border-gray-300 rounded-lg shadow-md">
            <CardHeader>
                <CardTitle className="text-lg font-bold text-center">
                    {product.title}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
                <div className="flex flex-row gap-2 items-center content-center">
                    {product.images && product.images.length > 0 && (
                        <img
                            src={product.images[0].src}
                            alt={product.title}
                            className="w-24 h-24"
                        />
                    )}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor={`quantity-${product.id}`}>
                            Set available quantity:
                        </Label>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={decrementQuantity}
                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                -
                            </button>
                            <Input
                                id={`quantity-${product.id}`}
                                type="text"
                                value={quantity}
                                onChange={handleQuantityChange}
                                className="p-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-center"
                                min="0"
                            />
                            <button
                                onClick={incrementQuantity}
                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}