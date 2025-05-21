import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Inventory} from "@/app/inventory/Inventory";

export function Rent2PlayTabs() {
    return (
        <Tabs defaultValue="tabs" className="items-center justify-center min-h-screen pt-10">
            <TabsList>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
            </TabsList>
            <TabsContent value="calendar">Here will come the Calendar</TabsContent>
            <TabsContent value="inventory">
                <Inventory/>
            </TabsContent>
        </Tabs>
    )

}