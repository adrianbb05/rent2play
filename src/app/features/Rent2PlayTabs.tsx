import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useEffect} from "react";
import {getClubsFromWeb} from "@/app/features/services/inventoryService";
import {toast} from "sonner";
import {InventoryOverview} from "@/app/features/inventory/InventoryOverview";
import {useProductStore, useSkusStore} from "@/lib/store";
import {CalendarOverview} from "@/app/features/calendar/CalendarOverview";
import type {CalendarEventResponse} from "@/app/hooks/types/EventTypes";

interface Rent2PlayTabsProps {
    calendarContent: CalendarEventResponse
}

export function Rent2PlayTabs({calendarContent}: Rent2PlayTabsProps) {
    const {products, setProducts} = useProductStore()
    const {skusToFilter} = useSkusStore()

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const res = await getClubsFromWeb(skusToFilter)
                setProducts(res)
                toast.success("Inventory loaded")
            } catch {
                toast.error("Error when loading inventory")
            }
        };
        fetchInventory()
    }, [setProducts, skusToFilter])


    return (
        <Tabs defaultValue="tabs" className="items-center justify-center pt-10 sticky top-0">
            <TabsList>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
            </TabsList>
            <TabsContent value="calendar">
                <CalendarOverview
                    calendarContent={calendarContent}
                    products={products}
                    skusToFilter={skusToFilter}
                />
            </TabsContent>
            <TabsContent value="inventory">
                {products.length > 0 ? <InventoryOverview products={products}/> : <p>Loading...</p>}
            </TabsContent>
        </Tabs>
    );
}