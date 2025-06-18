import {Select} from "@radix-ui/react-select";
import {SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import type {Dispatch, SetStateAction} from "react";

export interface Filters {
    brand: string
    gender: string
    material: string
    hand: string
}

interface FilterButtonsProps {
    setFilters: Dispatch<SetStateAction<Filters>>
}

const filterOptions = [
    {
        key: "brand" as keyof Filters,
        placeholder: "Brand",
        options: [
            { value: "none", label: "None" },
            { value: "Callaway", label: "Callaway Rouge" },
            { value: "TaylorMade", label: "TaylorMade" },
        ],
    },
    {
        key: "gender" as keyof Filters,
        placeholder: "Gender",
        options: [
            { value: "none", label: "None" },
            { value: "Men", label: "Men" },
            { value: "Women", label: "Women" },
        ],
    },
    {
        key: "material" as keyof Filters,
        placeholder: "Material",
        options: [
            { value: "none", label: "None" },
            { value: "Steel", label: "Steel" },
            { value: "Graphite", label: "Graphite" },
        ],
    },
    {
        key: "hand" as keyof Filters,
        placeholder: "Hand",
        options: [
            { value: "none", label: "None" },
            { value: "Left Hand", label: "Left" },
            { value: "Right Hand", label: "Right" },
        ],
    },
]

export function FilterButtons({ setFilters }: FilterButtonsProps) {
    const handleChange = (key: keyof Filters, value: string) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value,
        }))
    }

    return (
        <div className="flex flex-row gap-2">
            {filterOptions.map(({ key, placeholder, options }) => (
                <Select key={key} onValueChange={(value: string) => handleChange(key, value)}>
                    <SelectTrigger className="w-fit">
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            ))}
        </div>
    )
}