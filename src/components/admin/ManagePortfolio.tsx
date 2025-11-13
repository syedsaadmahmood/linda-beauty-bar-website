import { useState, useEffect } from 'react';
import { getPortfolio, getPortfolioCategories, savePortfolioItem, deletePortfolioItem, savePortfolioCategory, deletePortfolioCategory, type Portfolio, type PortfolioCategory } from '../../utils/adminStorage';
import { AdminForm } from './AdminForm';
import { SEOFormFields } from './SEOFormFields';
import { DataTable } from './DataTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ImageUpload } from './ImageUpload';
import { Plus } from 'lucide-react';

export function ManagePortfolio() {
  const [activeTab, setActiveTab] = useState('items');
  const [portfolioItems, setPortfolioItems] = useState<Portfolio[]>([]);
  const [categories, setCategories] = useState<PortfolioCategory[]>([]);
  const [editingItem, setEditingItem] = useState<Portfolio | null>(null);
  const [editingCategory, setEditingCategory] = useState<PortfolioCategory | null>(null);
  const [isItemFormOpen, setIsItemFormOpen] = useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [items, cats] = await Promise.all([
        getPortfolio(),
        getPortfolioCategories(),
      ]);
      setPortfolioItems(items);
      setCategories(cats);
    } catch (error) {
      console.error('Error loading portfolio:', error);
    }
  };

  const handleItemSave = async (item: Portfolio) => {
    try {
      await savePortfolioItem(item);
      await loadData();
      setIsItemFormOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving portfolio item:', error);
      alert('Failed to save portfolio item. Please try again.');
    }
  };

  const handleItemDelete = async (item: Portfolio) => {
    if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
      try {
        await deletePortfolioItem(item.id);
        await loadData();
      } catch (error) {
        console.error('Error deleting portfolio item:', error);
        alert('Failed to delete portfolio item. Please try again.');
      }
    }
  };

  const handleItemEdit = (item: Portfolio) => {
    setEditingItem(item);
    setIsItemFormOpen(true);
  };

  const handleItemCancel = () => {
    setIsItemFormOpen(false);
    setEditingItem(null);
  };

  const handleCategorySave = async (category: PortfolioCategory) => {
    try {
      await savePortfolioCategory(category);
      await loadData();
      setIsCategoryFormOpen(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Error saving portfolio category:', error);
      alert('Failed to save portfolio category. Please try again.');
    }
  };

  const handleCategoryDelete = async (category: PortfolioCategory) => {
    if (confirm(`Are you sure you want to delete "${category.name}"?`)) {
      try {
        await deletePortfolioCategory(category.id);
        await loadData();
      } catch (error) {
        console.error('Error deleting portfolio category:', error);
        alert('Failed to delete portfolio category. Please try again.');
      }
    }
  };

  const handleCategoryEdit = (category: PortfolioCategory) => {
    setEditingCategory(category);
    setIsCategoryFormOpen(true);
  };

  const handleCategoryCancel = () => {
    setIsCategoryFormOpen(false);
    setEditingCategory(null);
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { 
      key: 'categoryId', 
      label: 'Category',
      render: (item: Portfolio) => {
        const category = categories.find(c => c.id === item.categoryId);
        return <span>{category?.name || item.categoryId}</span>;
      }
    },
    { key: 'alt', label: 'Alt Text' },
  ];

  if (isItemFormOpen) {
    return (
      <PortfolioForm
        item={editingItem}
        categories={categories}
        onSave={handleItemSave}
        onCancel={handleItemCancel}
      />
    );
  }

  if (isCategoryFormOpen) {
    return (
      <PortfolioCategoryForm
        category={editingCategory}
        onSave={handleCategorySave}
        onCancel={handleCategoryCancel}
      />
    );
  }

  const categoryColumns = [
    { key: 'name', label: 'Name' },
    { 
      key: 'id', 
      label: 'ID',
      render: (item: PortfolioCategory) => (
        <code className="text-xs bg-gray-100 px-2 py-1 rounded">{item.id}</code>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-charcoal mb-2">Portfolio</h2>
        <p className="text-gray-600">Manage portfolio items and categories</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="items">Portfolio Items</TabsTrigger>
          <TabsTrigger value="categories">Portfolio Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="items" className="mt-0 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-semibold text-charcoal">Portfolio Items</h3>
              <p className="text-gray-600 text-sm mt-1">Manage individual portfolio items</p>
            </div>
            <Button
              onClick={() => setIsItemFormOpen(true)}
              className="bg-blush-pink hover:bg-blush-pink-dark text-charcoal"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Portfolio Item
            </Button>
          </div>

          <DataTable
            data={portfolioItems}
            columns={columns}
            onEdit={handleItemEdit}
            onDelete={handleItemDelete}
            keyExtractor={(item) => item.id.toString()}
          />
        </TabsContent>

        <TabsContent value="categories" className="mt-0 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-semibold text-charcoal">Portfolio Categories</h3>
              <p className="text-gray-600 text-sm mt-1">Manage portfolio category definitions</p>
            </div>
            <Button
              onClick={() => setIsCategoryFormOpen(true)}
              className="bg-blush-pink hover:bg-blush-pink-dark text-charcoal"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Category IDs are used for organizing portfolio items. Changing an ID will require updating all portfolio items that use it.
            </p>
          </div>

          <DataTable
            data={categories}
            columns={categoryColumns}
            onEdit={handleCategoryEdit}
            onDelete={handleCategoryDelete}
            keyExtractor={(c) => c.id}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface PortfolioFormProps {
  item?: Portfolio | null;
  categories: PortfolioCategory[];
  onSave: (item: Portfolio) => void;
  onCancel: () => void;
}

function PortfolioForm({ item, categories, onSave, onCancel }: PortfolioFormProps) {
  const [formData, setFormData] = useState<Portfolio>(item || {
    id: 0,
    categoryId: categories[0]?.id || '',
    title: '',
    alt: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData(prev => ({
        ...prev,
        categoryId: categories[0]?.id || '',
      }));
    }
  }, [item, categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <AdminForm
      title={item ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
      description="Add portfolio items with images and SEO metadata"
      onSubmit={handleSubmit}
      onCancel={onCancel}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
              placeholder="Portfolio item title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoryId">Category *</Label>
            <select
              id="categoryId"
              value={formData.categoryId}
              onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
              className="w-full h-9 px-3 rounded-md border border-input bg-input-background"
              required
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="alt">Alt Text *</Label>
          <Input
            id="alt"
            value={formData.alt}
            onChange={(e) => setFormData(prev => ({ ...prev, alt: e.target.value }))}
            required
            placeholder="Description of the image for accessibility"
          />
        </div>

        <ImageUpload
          value={formData.imageUrl}
          onChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
          label="Portfolio Image *"
          folder="portfolio"
        />

        <SEOFormFields
          seoData={formData}
          onChange={(seoData) => setFormData(prev => ({ ...prev, ...seoData }))}
        />
      </div>
    </AdminForm>
  );
}

interface PortfolioCategoryFormProps {
  category?: PortfolioCategory | null;
  onSave: (category: PortfolioCategory) => void;
  onCancel: () => void;
}

function PortfolioCategoryForm({ category, onSave, onCancel }: PortfolioCategoryFormProps) {
  const [formData, setFormData] = useState<{
    id: string;
    name: string;
  }>({
    id: '',
    name: '',
  });

  useEffect(() => {
    if (category) {
      setFormData({
        id: category.id,
        name: category.name,
      });
    } else {
      // Generate new ID
      setFormData(prev => ({
        ...prev,
        id: `portfolio-category-${Date.now()}`,
      }));
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const categoryData: PortfolioCategory = {
      id: formData.id,
      name: formData.name,
    };
    onSave(categoryData);
  };

  return (
    <AdminForm
      title={category ? 'Edit Portfolio Category' : 'Add New Portfolio Category'}
      description="Define portfolio categories with name and ID"
      onSubmit={handleSubmit}
      onCancel={onCancel}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="id">Category ID *</Label>
            <Input
              id="id"
              value={formData.id}
              onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
              placeholder="e.g., microblading"
              required
              disabled={!!category} // Don't allow changing ID when editing
            />
            <p className="text-xs text-gray-500">
              Used for organizing portfolio items. Lowercase, hyphenated (e.g., microblading)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Category Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Microblading"
              required
            />
            <p className="text-xs text-gray-500">
              Display name shown to users
            </p>
          </div>
        </div>
      </div>
    </AdminForm>
  );
}
