import { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Upload, X, Loader2 } from 'lucide-react';
import { uploadImage, deleteImage } from '../../lib/supabase';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: string; // Folder in storage bucket (e.g., 'services', 'portfolio')
}

export function ImageUpload({ value, onChange, label = 'Image URL', folder = 'general' }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setUploadError('');

    try {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setPreview(dataUrl);
      };
      reader.readAsDataURL(file);

      // Upload to Supabase Storage
      const url = await uploadImage(file, folder);
      onChange(url);
      setPreview(url);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to upload image');
      setPreview(null);
    } finally {
      setIsUploading(false);
      // Reset file input
      e.target.value = '';
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    onChange(url);
    setPreview(url || null);
    setUploadError('');
  };

  const handleClear = async () => {
    // Delete from Supabase if it's a Supabase URL
    if (value && value.includes('supabase.co')) {
      try {
        await deleteImage(value);
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
    onChange('');
    setPreview(null);
    setUploadError('');
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      <div className="flex gap-2">
        <Input
          type="url"
          value={value || ''}
          onChange={handleUrlChange}
          placeholder="https://example.com/image.jpg or upload a file"
          className="flex-1"
          disabled={isUploading}
        />
        <div className="relative">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id={`image-upload-${folder}`}
            disabled={isUploading}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById(`image-upload-${folder}`)?.click()}
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </div>
        {value && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleClear}
            disabled={isUploading}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {uploadError && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded-md">
          {uploadError}
        </div>
      )}

      {preview && (
        <div className="mt-2">
          <img
            src={preview}
            alt="Preview"
            className="max-w-xs max-h-48 rounded-lg border border-gray-200 object-cover"
            onError={() => {
              setPreview(null);
              setUploadError('Failed to load image preview');
            }}
          />
        </div>
      )}

      <p className="text-xs text-gray-500">
        Upload an image file (max 5MB) or enter an image URL. Images are stored in Supabase Storage.
      </p>
    </div>
  );
}
