'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { useDeleteProduct, useDeleteProducts } from '@/lib/hooks/useProductMutations';
import { useQueryClient } from '@tanstack/react-query';

type DeletableProduct = {
  id: string;
  name: string;
  sku?: string | null;
};

interface ProductDeleteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleteSuccess?: () => void;
  product?: DeletableProduct | null;
  products?: DeletableProduct[];
}

export default function ProductDeleteModal({
  open,
  onOpenChange,
  onDeleteSuccess,
  product = null,
  products,
}: ProductDeleteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteProduct = useDeleteProduct();
  const deleteProducts = useDeleteProducts();
  const queryClient = useQueryClient();

  const targets =
    products && products.length > 0
      ? products
      : product
        ? [product]
        : [];
  const isBulk = targets.length > 1;

  const handleDelete = async () => {
    if (!targets.length) return;

    setIsDeleting(true);
    try {
      if (isBulk) {
        await deleteProducts.mutateAsync(targets.map((item) => item.id));
        toast.success(`${targets.length} products have been deleted successfully.`);
      } else {
        await deleteProduct.mutateAsync(targets[0].id);
        toast.success(`Product "${targets[0].name}" has been deleted successfully.`);
      }

      await queryClient.refetchQueries({
        queryKey: ['products'],
        type: 'active',
      });

      if (onDeleteSuccess) {
        onDeleteSuccess();
      } else {
        onOpenChange(false);
      }
    } catch {
      // Error toast is handled by the mutation hook
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    if (!isDeleting) {
      onOpenChange(false);
    }
  };

  if (!targets.length) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <DialogTitle className="text-left">
                {isBulk ? 'Delete Products' : 'Delete Product'}
              </DialogTitle>
              <DialogDescription className="text-left">
                This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="font-medium text-sm mb-2">
              {isBulk ? 'Products to be deleted:' : 'Product to be deleted:'}
            </h4>
            <div className="max-h-40 space-y-2 overflow-y-auto">
              {targets.map((item) => (
                <div key={item.id} className="space-y-0.5">
                  <p className="font-semibold">{item.name}</p>
                  {item.sku ? (
                    <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-destructive">
              ⚠️ Warning: This will permanently delete:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Product information and details</li>
              <li>• Product images and gallery</li>
              <li>• Inventory and stock data</li>
              <li>• Product reviews and ratings</li>
              <li>• Sales history and analytics</li>
            </ul>
          </div>

          <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3">
            <p className="text-sm text-destructive font-medium">
              💡 Consider deactivating the product instead of deleting it to preserve historical data.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isDeleting}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="cursor-pointer"
          >
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isDeleting
              ? 'Deleting...'
              : isBulk
                ? `Delete ${targets.length} Products`
                : 'Delete Product'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
