import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import type {Dispatch, SetStateAction} from "react";

interface SkuConfirmationDialogProps {
    isDialogOpen: boolean
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>
    sku: string | undefined
    handleConfirm: () => void
}

export function SkuConfirmationDialog({isDialogOpen, setIsDialogOpen, sku, handleConfirm}: SkuConfirmationDialogProps) {
    const disabled = !sku
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    onClick={() => setIsDialogOpen(true)}
                    disabled={disabled}
                >
                    {disabled ? "Set SKU" : "Add SKU"}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Filter</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to add the following filter?
                        <br/>
                        <strong>SKU:</strong> {sku || "Not provided"}
                        <br/>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="secondary"
                        onClick={() => setIsDialogOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm}>
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}