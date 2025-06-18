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
    setFilters: Dispatch<SetStateAction<Filters>>;
}

export function FilterButtons({setFilters}: FilterButtonsProps) {

    const handleChange = (key: keyof Filters, value: string) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value,
        }))
    }

    return (
        <div className="flex flex-row gap-2">
            <Select onValueChange={(value: string) => handleChange("brand", value)}>
                <SelectTrigger className="w-fit">
                    <SelectValue placeholder="Brand"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="Callaway">Callaway Rouge</SelectItem>
                    <SelectItem value="TaylorMade">TaylorMade</SelectItem>
                </SelectContent>
            </Select>
            <Select onValueChange={(value: string) => handleChange("gender", value)}>
                <SelectTrigger className="w-fit">
                    <SelectValue placeholder="Gender"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="Men">Men</SelectItem>
                    <SelectItem value="Women">Women</SelectItem>
                </SelectContent>
            </Select>
            <Select onValueChange={(value: string) => handleChange("material", value)}>
                <SelectTrigger className="w-fit">
                    <SelectValue placeholder="Material"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="Steel">Steel</SelectItem>
                    <SelectItem value="Graphite">Graphite</SelectItem>
                </SelectContent>
            </Select>
            <Select onValueChange={(value: string) => handleChange("hand", value)}>
                <SelectTrigger className="w-fit">
                    <SelectValue placeholder="Hand"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="Left Hand">Left</SelectItem>
                    <SelectItem value="Right Hand">Right</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}