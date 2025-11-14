import { useState, useEffect } from 'react';
import { getServices, saveService, deleteService, getCategories, saveCategory, deleteCategory, getServiceHighlights, saveServiceHighlight, deleteServiceHighlight, getCategoryNameById, type Service, type Category, type ServiceHighlight } from '../../utils/adminStorage';
import { AdminForm } from './AdminForm';
import { DataTable } from './DataTable';
import { SEOFormFields } from './SEOFormFields';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { ImageUpload } from './ImageUpload';
import { Plus, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import * as LucideIcons from 'lucide-react';

// Icon options for categories
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

function getIconComponent(iconName: string): LucideIcons.LucideIcon {
  if (!iconName || typeof iconName !== 'string') {
    return LucideIcons.Droplet;
  }
  
  const trimmedName = iconName.trim();
  const Icon = (LucideIcons as any)[trimmedName];
  
  if (!Icon) {
    return LucideIcons.Droplet;
  }
  
  return Icon;
}

function getIconName(icon: LucideIcons.LucideIcon | string | undefined | null): string {
  if (!icon) return 'Droplet';
  if (typeof icon === 'string') return icon;
  
  // Try to get the name from the icon's displayName or name property
  const iconNames = ['Brush', 'Smile', 'Heart', 'Eye', 'Dumbbell', 'Sparkles', 'Droplet', 'Star', 'Flower', 'Gem', 'Palette', 'Wand2'];
  
  // First try direct comparison
  for (const name of iconNames) {
    const IconComponent = LucideIcons[name as keyof typeof LucideIcons];
    if (IconComponent && IconComponent === icon) {
      return name;
    }
  }
  
  // If direct comparison fails, try to match by function name
  if (icon && typeof icon === 'function' && icon.name) {
    const functionName = icon.name;
    for (const name of iconNames) {
      if (name === functionName || functionName.includes(name)) {
        return name;
      }
    }
  }
  
  return 'Droplet';
}

export function ManageServices() {
  const [activeTab, setActiveTab] = useState('services');
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [highlights, setHighlights] = useState<ServiceHighlight[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingHighlight, setEditingHighlight] = useState<ServiceHighlight | null>(null);
  const [isServiceFormOpen, setIsServiceFormOpen] = useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [isHighlightFormOpen, setIsHighlightFormOpen] = useState(false);

  useEffect(() => {
    loadServices();
    loadCategories();
    loadHighlights();
  }, []);

  const loadServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error('Error loading services:', error);
    }
  };

  const loadCategories = async (useCache = true) => {
    try {
      const data = await getCategories(useCache);
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadHighlights = async (useCache = true) => {
    try {
      const data = await getServiceHighlights(useCache);
      setHighlights(data);
    } catch (error) {
      console.error('Error loading service highlights:', error);
    }
  };

  const handleServiceSave = async (service: Service) => {
    try {
      await saveService(service);
      await loadServices(); // Reload to get fresh data
      setIsServiceFormOpen(false);
      setEditingService(null);
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Failed to save service. Please try again.');
    }
  };

  const handleDelete = async (service: Service) => {
    if (confirm(`Are you sure you want to delete "${service.title}"?`)) {
      try {
        await deleteService(service.id);
        await loadServices(); // Reload to get fresh data
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('Failed to delete service. Please try again.');
      }
    }
  };

  const handleServiceEdit = (service: Service) => {
    setEditingService(service);
    setIsServiceFormOpen(true);
  };

  const handleServiceCancel = () => {
    setIsServiceFormOpen(false);
    setEditingService(null);
  };

  const handleCategorySave = async (category: Category) => {
    try {
      await saveCategory(category);
      // Reload categories without cache to get fresh data
      await loadCategories(false);
      setIsCategoryFormOpen(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category. Please try again.');
    }
  };

  const handleCategoryDelete = async (category: Category) => {
    if (confirm(`Are you sure you want to delete "${category.name}"?`)) {
      try {
        await deleteCategory(category.id);
        // Reload categories without cache to get fresh data
        await loadCategories(false);
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category. Please try again.');
      }
    }
  };

  const handleCategoryEdit = (category: Category) => {
    setEditingCategory(category);
    setIsCategoryFormOpen(true);
  };

  const handleCategoryCancel = () => {
    setIsCategoryFormOpen(false);
    setEditingCategory(null);
  };

  const handleHighlightSave = async (highlight: ServiceHighlight) => {
    try {
      await saveServiceHighlight(highlight);
      await loadHighlights(false);
      setIsHighlightFormOpen(false);
      setEditingHighlight(null);
    } catch (error) {
      console.error('Error saving service highlight:', error);
      alert('Failed to save service highlight. Please try again.');
    }
  };

  const handleHighlightDelete = async (highlight: ServiceHighlight) => {
    const categoryName = await getCategoryNameById(highlight.categoryId, categories);
    if (confirm(`Are you sure you want to delete the highlight for "${categoryName || highlight.categoryId}"?`)) {
      try {
        await deleteServiceHighlight(highlight.categoryId);
        await loadHighlights(false);
      } catch (error) {
        console.error('Error deleting service highlight:', error);
        alert('Failed to delete service highlight. Please try again.');
      }
    }
  };

  const handleHighlightEdit = (highlight: ServiceHighlight) => {
    setEditingHighlight(highlight);
    setIsHighlightFormOpen(true);
  };

  const handleHighlightCancel = () => {
    setIsHighlightFormOpen(false);
    setEditingHighlight(null);
  };

  const CategoryCell = ({ categoryId }: { categoryId: string }) => {
    const [name, setName] = useState<string>(categoryId);
    
    useEffect(() => {
      const loadName = async () => {
        const categoryName = await getCategoryNameById(categoryId, categories);
        setName(categoryName || categoryId);
      };
      loadName();
    }, [categoryId, categories]);
    
    return <span>{name}</span>;
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { 
      key: 'categoryId', 
      label: 'Category',
      render: (item: Service) => (
        <CategoryCell categoryId={item.categoryId} />
      )
    },
    { key: 'price', label: 'Price' },
    { key: 'duration', label: 'Duration' },
  ];

  if (isServiceFormOpen) {
    return (
      <ServiceForm
        service={editingService}
        categories={categories}
        onSave={handleServiceSave}
        onCancel={handleServiceCancel}
      />
    );
  }

  if (isCategoryFormOpen) {
    return (
      <CategoryForm
        category={editingCategory}
        onSave={handleCategorySave}
        onCancel={handleCategoryCancel}
      />
    );
  }

  if (isHighlightFormOpen) {
    return (
      <ServiceHighlightForm
        highlight={editingHighlight}
        categories={categories}
        onSave={handleHighlightSave}
        onCancel={handleHighlightCancel}
      />
    );
  }

  const categoryColumns = [
    { key: 'name', label: 'Name' },
    { 
      key: 'id', 
      label: 'ID',
      render: (item: Category) => (
        <code className="text-xs bg-gray-100 px-2 py-1 rounded">{item.id}</code>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-charcoal mb-2">Services</h2>
        <p className="text-gray-600">Manage your service offerings and categories</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="categories">Service Categories</TabsTrigger>
          <TabsTrigger value="highlights">Service Highlights</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="mt-0 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-semibold text-charcoal">Service List</h3>
              <p className="text-gray-600 text-sm mt-1">Manage individual services</p>
            </div>
            <Button
              onClick={() => setIsServiceFormOpen(true)}
              className="bg-blush-pink hover:bg-blush-pink-dark text-charcoal"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </div>


          <DataTable
            data={services}
            columns={columns}
            onEdit={handleServiceEdit}
            onDelete={handleDelete}
            keyExtractor={(s) => s.id}
          />
        </TabsContent>

        <TabsContent value="categories" className="mt-0 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-semibold text-charcoal">Service Categories</h3>
              <p className="text-gray-600 text-sm mt-1">Manage service category definitions</p>
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
              <strong>Note:</strong> Category IDs are used in URLs. Changing an ID will break existing links. Category names are displayed to users and used for filtering services.
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

        <TabsContent value="highlights" className="mt-0 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-semibold text-charcoal">Service Highlights</h3>
              <p className="text-gray-600 text-sm mt-1">Manage service highlights shown on the homepage</p>
            </div>
            <Button
              onClick={() => setIsHighlightFormOpen(true)}
              className="bg-blush-pink hover:bg-blush-pink-dark text-charcoal"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Highlight
            </Button>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Service highlights are displayed on the homepage services overview section. Each highlight is associated with a service category.
            </p>
          </div>

          <DataTable
            data={highlights}
            columns={[
              { 
                key: 'categoryId', 
                label: 'Category',
                render: (item: ServiceHighlight) => (
                  <CategoryCell categoryId={item.categoryId} />
                )
              },
              { key: 'title', label: 'Title' },
              { key: 'description', label: 'Description' },
            ]}
            onEdit={handleHighlightEdit}
            onDelete={handleHighlightDelete}
            keyExtractor={(h) => h.categoryId}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface ServiceFormProps {
  service?: Service | null;
  categories: Category[];
  onSave: (service: Service) => void;
  onCancel: () => void;
}

function ServiceForm({ service, categories, onSave, onCancel }: ServiceFormProps) {
  const [formData, setFormData] = useState<Service>(service || {
    id: '',
    title: '',
    description: '',
    longDescription: '',
    price: '',
    duration: '',
    deposit: '',
    categoryId: '',
    imageUrl: '',
    benefits: [],
    process: [],
    aftercare: [],
    faqs: [],
  });

  useEffect(() => {
    if (service) {
      setFormData(service);
    } else {
      // Generate new ID
      setFormData(prev => ({
        ...prev,
        id: `service-${Date.now()}`,
      }));
    }
  }, [service]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleArrayChange = (field: 'benefits' | 'process' | 'aftercare', value: string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFAQChange = (index: number, field: 'question' | 'answer', value: string) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) => i === index ? { ...faq, [field]: value } : faq),
    }));
  };

  const addFAQ = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }],
    }));
  };

  const removeFAQ = (index: number) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  return (
    <AdminForm
      title={service ? 'Edit Service' : 'Add New Service'}
      description="Fill in the service details and SEO information"
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
          <Label htmlFor="description">Short Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            required
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="longDescription">Long Description *</Label>
          <Textarea
            id="longDescription"
            value={formData.longDescription}
            onChange={(e) => setFormData(prev => ({ ...prev, longDescription: e.target.value }))}
            required
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price *</Label>
            <Input
              id="price"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration *</Label>
            <Input
              id="duration"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deposit">Deposit</Label>
            <Input
              id="deposit"
              value={formData.deposit}
              onChange={(e) => setFormData(prev => ({ ...prev, deposit: e.target.value }))}
            />
          </div>
        </div>

        <ImageUpload
          value={formData.imageUrl}
          onChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
          label="Service Image"
          folder="services"
        />

        <ArrayField
          label="Benefits"
          items={formData.benefits}
          onChange={(items) => handleArrayChange('benefits', items)}
        />

        <ArrayField
          label="Process Steps"
          items={formData.process}
          onChange={(items) => handleArrayChange('process', items)}
        />

        <ArrayField
          label="Aftercare Instructions"
          items={formData.aftercare}
          onChange={(items) => handleArrayChange('aftercare', items)}
        />

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>FAQs</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={addFAQ}>
                <Plus className="w-4 h-4 mr-2" />
                Add FAQ
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.faqs.map((faq, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">FAQ #{index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFAQ(index)}
                    className="text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Input
                    placeholder="Question"
                    value={faq.question}
                    onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                  />
                  <Textarea
                    placeholder="Answer"
                    value={faq.answer}
                    onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            ))}
            {formData.faqs.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">No FAQs added yet</p>
            )}
          </CardContent>
        </Card>

        <SEOFormFields
          seoData={formData}
          onChange={(seoData) => setFormData(prev => ({ ...prev, ...seoData }))}
        />
      </div>
    </AdminForm>
  );
}

interface ArrayFieldProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}

function ArrayField({ label, items, onChange }: ArrayFieldProps) {
  const [newItem, setNewItem] = useState('');

  const handleAdd = () => {
    if (newItem.trim()) {
      onChange([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  const handleRemove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input value={item} readOnly className="flex-1" />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleRemove(index)}
              className="text-red-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <div className="flex gap-2">
          <Input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder={`Add ${label.toLowerCase()}`}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
            className="flex-1"
          />
          <Button type="button" variant="outline" onClick={handleAdd}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
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
      // Get icon name - prefer string, then _iconName property, then extract from component
      let iconName = 'Droplet';
      if (typeof category.icon === 'string') {
        iconName = category.icon;
      } else {
        const categoryWithIconName = category as any;
        if (categoryWithIconName._iconName) {
          iconName = categoryWithIconName._iconName;
        } else {
          iconName = getIconName(category.icon) || 'Droplet';
        }
      }
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
    // We need to pass it as a string, but Category type expects LucideIcon, so we use type assertion
    const categoryData = {
      id: formData.id,
      name: formData.name,
      icon: formData.iconName, // Pass as string - saveCategory will handle it
    } as Category;
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

        <div className="space-y-4">
          <div>
            <Label htmlFor="icon">Icon *</Label>
            <p className="text-xs text-gray-500 mt-1 mb-3">
              Select an icon to represent this category
            </p>
          </div>
          
          {/* Icon Grid - Improved UI */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {ICON_OPTIONS.map((icon) => {
              const Icon = getIconComponent(icon.value);
              const isSelected = formData.iconName === icon.value;
              return (
                <button
                  key={icon.value}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, iconName: icon.value }));
                  }}
                  className={`
                    relative p-4 border-2 rounded-xl transition-all duration-200
                    flex flex-col items-center justify-center gap-2
                    min-h-[100px]
                    ${isSelected 
                      ? 'border-blush-pink bg-blush-pink/10 shadow-md scale-105' 
                      : 'border-gray-200 hover:border-blush-pink/50 hover:bg-gray-50 hover:shadow-sm'
                    }
                    focus:outline-none focus:ring-2 focus:ring-blush-pink focus:ring-offset-2
                  `}
                  title={icon.name}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <div className="w-5 h-5 bg-blush-pink rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <Icon className={`w-8 h-8 ${isSelected ? 'text-blush-pink' : 'text-gray-700'}`} />
                  <span className={`text-xs font-medium ${isSelected ? 'text-blush-pink' : 'text-gray-600'}`}>
                    {icon.name}
                  </span>
                </button>
              );
            })}
          </div>
          
          {/* Selected Icon Preview - Enhanced */}
          <div className="mt-4 p-5 bg-gradient-to-r from-blush-pink/5 to-blush-pink/10 rounded-xl border-2 border-blush-pink/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-lg shadow-sm border border-blush-pink/20">
                <SelectedIcon className="w-10 h-10 text-blush-pink" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Selected Icon Preview</p>
                <p className="text-xs text-gray-600 mt-1">
                  Icon: <code className="bg-white px-2 py-1 rounded text-blush-pink font-mono">{formData.iconName}</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminForm>
  );
}

interface ServiceHighlightFormProps {
  highlight?: ServiceHighlight | null;
  categories: Category[];
  onSave: (highlight: ServiceHighlight) => void;
  onCancel: () => void;
}

function ServiceHighlightForm({ highlight, categories, onSave, onCancel }: ServiceHighlightFormProps) {
  const [formData, setFormData] = useState<{
    categoryId: string;
    title: string;
    description: string;
    iconName: string;
  }>({
    categoryId: '',
    title: '',
    description: '',
    iconName: 'Droplet',
  });

  useEffect(() => {
    if (highlight) {
      // Get icon name from highlight
      let iconName = 'Droplet';
      if (typeof highlight.icon === 'string') {
        iconName = highlight.icon;
      } else {
        iconName = getIconName(highlight.icon) || 'Droplet';
      }
      setFormData({
        categoryId: highlight.categoryId,
        title: highlight.title,
        description: highlight.description,
        iconName,
      });
    }
  }, [highlight]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const Icon = getIconComponent(formData.iconName);
    const highlightData: ServiceHighlight = {
      categoryId: formData.categoryId,
      title: formData.title,
      description: formData.description,
      icon: Icon,
    };
    onSave(highlightData);
  };

  const SelectedIcon = getIconComponent(formData.iconName);

  return (
    <AdminForm
      title={highlight ? 'Edit Service Highlight' : 'Add New Service Highlight'}
      description="Create a highlight that will be displayed on the homepage services overview"
      onSubmit={handleSubmit}
      onCancel={onCancel}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="categoryId">Category *</Label>
          <select
            id="categoryId"
            value={formData.categoryId}
            onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
            className="w-full h-9 px-3 rounded-md border border-input bg-input-background"
            required
            disabled={!!highlight} // Don't allow changing category when editing
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500">
            {highlight ? 'Category cannot be changed after creation' : 'Select the service category this highlight represents'}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="e.g., Brow Services"
            required
          />
          <p className="text-xs text-gray-500">
            Display title for the highlight
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Brief description of the service category"
            required
            rows={3}
          />
          <p className="text-xs text-gray-500">
            Short description shown on the homepage
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="icon">Icon *</Label>
            <p className="text-xs text-gray-500 mt-1 mb-3">
              Select an icon to represent this highlight
            </p>
          </div>
          
          {/* Icon Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {ICON_OPTIONS.map((icon) => {
              const Icon = getIconComponent(icon.value);
              const isSelected = formData.iconName === icon.value;
              return (
                <button
                  key={icon.value}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, iconName: icon.value }));
                  }}
                  className={`
                    relative p-4 border-2 rounded-xl transition-all duration-200
                    flex flex-col items-center justify-center gap-2
                    min-h-[100px]
                    ${isSelected 
                      ? 'border-blush-pink bg-blush-pink/10 shadow-md scale-105' 
                      : 'border-gray-200 hover:border-blush-pink/50 hover:bg-gray-50 hover:shadow-sm'
                    }
                    focus:outline-none focus:ring-2 focus:ring-blush-pink focus:ring-offset-2
                  `}
                  title={icon.name}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <div className="w-5 h-5 bg-blush-pink rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <Icon className={`w-8 h-8 ${isSelected ? 'text-blush-pink' : 'text-gray-700'}`} />
                  <span className={`text-xs font-medium ${isSelected ? 'text-blush-pink' : 'text-gray-600'}`}>
                    {icon.name}
                  </span>
                </button>
              );
            })}
          </div>
          
          {/* Selected Icon Preview */}
          <div className="mt-4 p-5 bg-gradient-to-r from-blush-pink/5 to-blush-pink/10 rounded-xl border-2 border-blush-pink/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-lg shadow-sm border border-blush-pink/20">
                <SelectedIcon className="w-10 h-10 text-blush-pink" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Selected Icon Preview</p>
                <p className="text-xs text-gray-600 mt-1">
                  Icon: <code className="bg-white px-2 py-1 rounded text-blush-pink font-mono">{formData.iconName}</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminForm>
  );
}

