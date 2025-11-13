import { useState, useEffect } from 'react';
import { getCategories, saveCategory, deleteCategory, type Category } from '../../utils/adminStorage';
import { AdminForm } from './AdminForm';
import { DataTable } from './DataTable';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Plus, X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

// Icon options - common icons that might be used for categories
const ICON_OPTIONS = [
  { name: 'Brush', value: 'Brush' },
  { name: 'Smile', value: 'Smile' },
  { name: 'Heart', value: 'Heart' },
  { name: 'Eye', value: 'Eye' },
  { name: 'Dumbbell', value: 'Dumbbell' },
  { name: 'Sparkles', value: 'Sparkles' },
  { name: 'Droplet', value: 'Droplet' },
  { name: 'Star', value: 'Star' },
  { name: 'Flower', value: 'Flower' },
  { name: 'Gem', value: 'Gem' },
  { name: 'Palette', value: 'Palette' },
  { name: 'Wand2', value: 'Wand2' },
] as const;

// Helper to get icon component from string name
function getIconComponent(iconName: string): LucideIcons.LucideIcon {
  const Icon = (LucideIcons as any)[iconName];
  return Icon || LucideIcons.Droplet;
}

// Helper to get icon name from component (for serialization)
function getIconName(icon: LucideIcons.LucideIcon | string | undefined | null): string {
  if (!icon) {
    return 'Droplet';
  }
  if (typeof icon === 'string') {
    return icon;
  }
  // Try to find the icon name by comparing with known icons
  const iconNames = ['Brush', 'Smile', 'Heart', 'Eye', 'Dumbbell', 'Sparkles', 'Droplet', 'Star', 'Flower', 'Gem', 'Palette', 'Wand2'];
  for (const name of iconNames) {
    if (LucideIcons[name as keyof typeof LucideIcons] === icon) {
      return name;
    }
  }
  // Fallback
  return 'Droplet';
}

export function ManageCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleSave = async (category: Category) => {
    try {
      await saveCategory(category);
      await loadCategories(); // Reload to get fresh data
      setIsFormOpen(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category. Please try again.');
    }
  };

  const handleDelete = async (category: Category) => {
    if (confirm(`Are you sure you want to delete "${category.name}"?`)) {
      try {
        await deleteCategory(category.id);
        await loadCategories(); // Reload to get fresh data
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category. Please try again.');
      }
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingCategory(null);
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { 
      key: 'id', 
      label: 'ID',
      render: (item: Category) => (
        <code className="text-xs bg-gray-100 px-2 py-1 rounded">{item.id}</code>
      )
    },
    { 
      key: 'icon', 
      label: 'Icon',
      render: (item: Category) => {
        // Always convert to component to ensure it's valid
        let Icon: LucideIcons.LucideIcon;
        let iconName: string;
        
        if (typeof item.icon === 'string') {
          iconName = item.icon;
          Icon = getIconComponent(item.icon);
        } else {
          // If it's already a component, try to get the name
          // Otherwise use default
          Icon = item.icon || LucideIcons.Droplet;
          iconName = getIconName(item.icon) || 'Droplet';
        }
        
        // Ensure Icon is a valid component
        if (!Icon || typeof Icon !== 'function') {
          Icon = LucideIcons.Droplet;
          iconName = 'Droplet';
        }
        
        return (
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-blush-pink" />
            <span className="text-sm text-gray-600">
              {iconName}
            </span>
          </div>
        );
      }
    },
  ];

  if (isFormOpen) {
    return (
      <CategoryForm
        category={editingCategory}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-charcoal">Service Categories</h2>
          <p className="text-gray-600 mt-1">Manage service category definitions</p>
        </div>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="bg-blush-pink hover:bg-blush-pink-dark text-charcoal"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Category IDs are used in URLs. Changing an ID will break existing links. Category names are displayed to users and used for filtering services.
        </p>
      </div>

      <DataTable
        data={categories}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        keyExtractor={(c) => c.id}
      />
    </div>
  );
}

interface CategoryFormProps {
  category?: Category | null;
  onSave: (category: Category) => void;
  onCancel: () => void;
}

function CategoryForm({ category, onSave, onCancel }: CategoryFormProps) {
  const [formData, setFormData] = useState<{
    id: string;
    name: string;
    iconName: string;
  }>({
    id: '',
    name: '',
    iconName: 'Droplet',
  });

  useEffect(() => {
    if (category) {
      const iconName = typeof category.icon === 'string' 
        ? category.icon 
        : getIconName(category.icon);
      setFormData({
        id: category.id,
        name: category.name,
        iconName,
      });
    } else {
      // Generate new ID
      setFormData(prev => ({
        ...prev,
        id: `category-${Date.now()}`,
      }));
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store icon as string for serialization - it will be converted to component when loaded
    const categoryData: Category = {
      id: formData.id,
      name: formData.name,
      icon: formData.iconName as any, // Store as string, will be converted on load
    };
    onSave(categoryData);
  };

  const SelectedIcon = getIconComponent(formData.iconName);

  return (
    <AdminForm
      title={category ? 'Edit Category' : 'Add New Category'}
      description="Define service categories with name, ID, and icon"
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
              placeholder="e.g., eyebrow-services"
              required
              disabled={!!category} // Don't allow changing ID when editing
            />
            <p className="text-xs text-gray-500">
              Used in URLs. Lowercase, hyphenated (e.g., eyebrow-services)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Category Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Eyebrow Services"
              required
            />
            <p className="text-xs text-gray-500">
              Display name shown to users
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="icon">Icon *</Label>
          <div className="grid grid-cols-4 gap-3">
            {ICON_OPTIONS.map((icon) => {
              const Icon = getIconComponent(icon.value);
              const isSelected = formData.iconName === icon.value;
              return (
                <button
                  key={icon.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, iconName: icon.value }))}
                  className={`
                    p-4 border-2 rounded-lg transition-all
                    ${isSelected 
                      ? 'border-blush-pink bg-blush-pink-light' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="w-6 h-6 mx-auto mb-2 text-charcoal" />
                  <span className="text-xs text-gray-600">{icon.name}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <SelectedIcon className="w-8 h-8 text-blush-pink" />
              <div>
                <p className="text-sm font-medium">Selected Icon Preview</p>
                <p className="text-xs text-gray-500">{formData.iconName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminForm>
  );
}

