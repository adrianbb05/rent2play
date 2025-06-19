import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useEffect} from "react";
import {getClubsFromWeb} from "@/app/features/services/inventoryService";
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
            const res = await getClubsFromWeb(skusToFilter)
            const existingProductIds = products.map((product) => product.id)
            const newProducts = res.filter((product) => !existingProductIds.includes(product.id))
            if (newProducts.length > 0) {
                setProducts([...products, ...newProducts])
            }
        }
        fetchInventory()
    }, [setProducts, skusToFilter, products])


    return (
        <Tabs defaultValue="inventory" className="items-center justify-center pt-10 sticky top-0">
            <TabsList>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
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