import {Input} from "@/components/ui/input";
import {SkuConfirmationDialog} from "@/app/features/inventory/components/SkuConfirmationDialog";
import {useState} from "react";
import {useSkusStore} from "@/lib/store";

export function SkuRefinement() {
    const [sku, setSku] = useState<string | undefined>(undefined)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const {addSku} = useSkusStore()

    const handleConfirm = () => {
        if (sku?.trim()) {
            addSku(sku)
            setSku("")
        }
        setIsDialogOpen(false)
    }

    return (
        <>
            <h2 className="text-xl font-bold mb-2">Filter Golf Clubs</h2>
            <p className="text-sm text-gray-600 mb-4">
                Add a SKU and club name to filter the golf clubs in the inventory
            </p>
            <div className="flex items-center gap-4 mb-4">
                <Input
                    name="skuInput"
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="Enter SKU (e.g., CALLROGMANGRARH)"
                    className="p-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <SkuConfirmationDialog
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                    sku={sku}
                    handleConfirm={handleConfirm}
                />
            </div>
        </>
    )
}
