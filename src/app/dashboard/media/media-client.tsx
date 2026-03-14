'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Asset } from '@prisma/client';
import { AssetList } from './asset-list';
import { AssetForm } from './asset-form';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export function MediaClient({ assets: initialAssets }: { assets: Asset[] }) {
  const [assets, setAssets] = useState(initialAssets);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleAssetCreated = (newAsset: Asset) => {
    setAssets([newAsset, ...assets]);
    setIsSheetOpen(false);
    toast({ title: 'Asset created', description: `The asset "${newAsset.name}" has been successfully created.` });
  };

  const handleAssetUpdated = (updatedAsset: Asset) => {
    setAssets(assets.map(asset => asset.id === updatedAsset.id ? updatedAsset : asset));
    setEditingAsset(null);
    setIsSheetOpen(false);
    toast({ title: 'Asset updated', description: `The asset "${updatedAsset.name}" has been successfully updated.` });
  };

  const handleAssetDeleted = async (assetId: number) => {
    try {
      const response = await fetch(`/api/assets/${assetId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete asset');
      setAssets(assets.filter(asset => asset.id !== assetId));
      toast({ title: 'Asset deleted', description: 'The asset has been successfully deleted.' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete asset.' });
    }
  };

  const openSheetForEdit = (asset: Asset) => {
    setEditingAsset(asset);
    setIsSheetOpen(true);
  };

  const openSheetForNew = () => {
    setEditingAsset(null);
    setIsSheetOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Site Assets</h1>
        <Button onClick={openSheetForNew}><Plus className="mr-2 h-4 w-4" /> Add Asset</Button>
      </div>
      <AssetList assets={assets} onEdit={openSheetForEdit} onDelete={handleAssetDeleted} />
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{editingAsset ? 'Edit Asset' : 'Add New Asset'}</SheetTitle>
          </SheetHeader>
          <AssetForm 
            asset={editingAsset} 
            onAssetCreated={handleAssetCreated} 
            onAssetUpdated={handleAssetUpdated} 
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
