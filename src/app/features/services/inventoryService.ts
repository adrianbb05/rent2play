import type {Product, WebInventoryResponse} from "@/app/features/types/inventory";

/**
 * Fetches the inventory from the web and filters it to return only the golf clubs
 * @param skusToFilter - The SKUs to filter the inventory by
 */
export async function getClubsFromWeb(skusToFilter: string[]): Promise<Product[]> {
    const rent2playProductsUrl = "https://rent2play.golf/products.json";
    const response = await fetch(rent2playProductsUrl)
    const webProducts = await response.json()
    const webProductsWithDefaultQuantity = {
        ...webProducts,
        quantity: 1
    } as WebInventoryResponse
    return filterInventory(skusToFilter, webProductsWithDefaultQuantity)

}

/**
 * Filters the inventory to return only the golf clubs
 */
function filterInventory(skusToFilter: string[], response: WebInventoryResponse): Product[] {
    return response.products
        .filter((product) => skusToFilter.includes(product.variants[0].sku))
}