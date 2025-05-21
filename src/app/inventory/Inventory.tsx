import {useEffect, useState} from "react";
import {getInventoryFromWeb} from "@/app/features/services/inventoryService";
import type {WebInventoryResponse} from "@/app/features/types/inventory";
import {toast} from "sonner";

export function Inventory() {
    const [inventory, setInventory] = useState<WebInventoryResponse | null>(null)
    useEffect(() => {
        const saveRequest = async () => {
            await getInventoryFromWeb()
                .then((res) => {
                    setInventory(res)
                    toast.success("Inventory loaded")
                })
                .catch(() => toast.error("Error when loading inventory"))
        }
        saveRequest()
    }, []);


    console.log(inventory)
    if (inventory) {
        return (
            <>
            </>
        )
    } else {
        return <>
        </>
    }
}