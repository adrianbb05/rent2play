import type {WebInventoryResponse} from "@/app/features/types/inventory";

export async function getInventoryFromWeb(): Promise<WebInventoryResponse> {
    const rent2playProductsUrl = "https://rent2play.golf/es/products.json";
    const response = await fetch(rent2playProductsUrl)
    return await response.json()

}