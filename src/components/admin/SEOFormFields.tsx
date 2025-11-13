import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import type { SEOData } from '../../data/types';
import { X, Plus } from 'lucide-react';
import { Button } from '../ui/button';

interface SEOFormFieldsProps {
  seoData: SEOData;
  onChange: (data: SEOData) => void;
}

export function SEOFormFields({ seoData, onChange }: SEOFormFieldsProps) {
  const handleChange = (field: keyof SEOData, value: string | string[]) => {
    onChange({ ...seoData, [field]: value });
  };

  const handleTagAdd = (tag: string) => {
    if (tag.trim() && !seoData.tags?.includes(tag.trim())) {
      handleChange('tags', [...(seoData.tags || []), tag.trim()]);
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    handleChange('tags', seoData.tags?.filter(tag => tag !== tagToRemove) || []);
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-charcoal mb-4">SEO Settings</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="metaTitle">Meta Title</Label>
          <Input
            id="metaTitle"
            value={seoData.metaTitle || ''}
            onChange={(e) => handleChange('metaTitle', e.target.value)}
            placeholder="Page title for search engines"
          />
          <p className="text-xs text-gray-500">Recommended: 50-60 characters</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="metaKeywords">Meta Keywords</Label>
          <Input
            id="metaKeywords"
            value={seoData.metaKeywords || ''}
            onChange={(e) => handleChange('metaKeywords', e.target.value)}
            placeholder="Comma-separated keywords"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="metaDescription">Meta Description</Label>
        <Textarea
          id="metaDescription"
          value={seoData.metaDescription || ''}
          onChange={(e) => handleChange('metaDescription', e.target.value)}
          placeholder="Description for search engines"
          rows={3}
        />
        <p className="text-xs text-gray-500">Recommended: 150-160 characters</p>
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {seoData.tags?.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blush-pink-light text-charcoal rounded-full text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleTagRemove(tag)}
                className="hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Add a tag"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleTagAdd(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            onClick={(e) => {
              const input = e.currentTarget.previousElementSibling as HTMLInputElement;
              if (input) {
                handleTagAdd(input.value);
                input.value = '';
              }
            }}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="border-t border-gray-300 pt-4">
        <h4 className="text-md font-semibold text-charcoal mb-4">Open Graph (Social Media)</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ogTitle">OG Title</Label>
            <Input
              id="ogTitle"
              value={seoData.ogTitle || ''}
              onChange={(e) => handleChange('ogTitle', e.target.value)}
              placeholder="Title for social sharing"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ogImage">OG Image URL</Label>
            <Input
              id="ogImage"
              value={seoData.ogImage || ''}
              onChange={(e) => handleChange('ogImage', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <Label htmlFor="ogDescription">OG Description</Label>
          <Textarea
            id="ogDescription"
            value={seoData.ogDescription || ''}
            onChange={(e) => handleChange('ogDescription', e.target.value)}
            placeholder="Description for social sharing"
            rows={2}
          />
        </div>
      </div>
    </div>
  );
}

