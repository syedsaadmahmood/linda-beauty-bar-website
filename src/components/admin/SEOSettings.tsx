import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Download, Upload, RotateCcw, Trash2 } from 'lucide-react';
import { exportAllData, importData, resetToDefaults } from '../../utils/adminStorage';
import { clearAllCache } from '../../utils/cache';

export function SEOSettings() {
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importStatus, setImportStatus] = useState<string>('');

  const handleExport = async () => {
    await exportAllData();
  };

  const handleImport = async () => {
    if (!importFile) {
      setImportStatus('Please select a file first');
      return;
    }

    try {
      await importData(importFile);
      setImportStatus('Successfully imported data!');
      setImportFile(null);
      // Reset file input
      const fileInput = document.getElementById('import-file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      setTimeout(() => setImportStatus(''), 3000);
    } catch (error) {
      setImportStatus(`Error: ${error instanceof Error ? error.message : 'Failed to import'}`);
    }
  };

  const handleReset = async () => {
    if (confirm('Are you sure you want to reset all data to defaults? This will clear all your changes.')) {
      try {
        await resetToDefaults();
        setImportStatus('Data reset to defaults');
        setTimeout(() => setImportStatus(''), 3000);
      } catch (error) {
        setImportStatus('Error resetting data');
        setTimeout(() => setImportStatus(''), 3000);
      }
    }
  };

  const handleClearCache = () => {
    if (confirm('Clear all cached data? This will force fresh data from Supabase on next load.')) {
      clearAllCache();
      setImportStatus('Cache cleared successfully');
      setTimeout(() => setImportStatus(''), 3000);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-charcoal">SEO & Data Management</h2>
        <p className="text-gray-600 mt-1">Export, import, and manage your site data</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Export Data</CardTitle>
            <CardDescription>
              Download all your content data as a JSON file for backup or migration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleExport}
              className="bg-blush-pink hover:bg-blush-pink-dark text-charcoal"
            >
              <Download className="w-4 h-4 mr-2" />
              Export All Data
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Import Data</CardTitle>
            <CardDescription>
              Import previously exported JSON data to restore or update your content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="import-file">Select JSON File</Label>
              <Input
                id="import-file"
                type="file"
                accept=".json"
                onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                className="cursor-pointer"
              />
            </div>
            <Button
              onClick={handleImport}
              disabled={!importFile}
              className="bg-blush-pink hover:bg-blush-pink-dark text-charcoal"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import Data
            </Button>
            {importStatus && (
              <div className={`p-3 rounded-md text-sm ${
                importStatus.includes('Error') || importStatus.includes('Failed')
                  ? 'bg-red-50 text-red-600'
                  : 'bg-green-50 text-green-600'
              }`}>
                {importStatus}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cache Management</CardTitle>
            <CardDescription>
              Clear cached data to force fresh fetch from Supabase
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleClearCache}
              variant="outline"
              className="border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Cache
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              Cache TTL: Services/Testimonials (5min), Portfolio (10min), FAQ (15min)
            </p>
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader>
            <CardTitle>Reset to Defaults</CardTitle>
            <CardDescription>
              Delete all data from Supabase (use Seed Data to restore)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear All Data
            </Button>
          </CardContent>
        </Card> */}

        <Card>
          <CardHeader>
            <CardTitle>SEO Information</CardTitle>
            <CardDescription>
              SEO metadata can be added to individual items (services, portfolio items, etc.) through their respective management pages.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">SEO Features Available:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
                <li>Meta Title and Description for search engines</li>
                <li>Meta Keywords</li>
                <li>Tags for content categorization</li>
                <li>Open Graph tags for social media sharing</li>
                <li>Twitter Card support</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Storage:</h4>
              <p className="text-sm text-green-800 mb-2">
                All content changes are stored in Supabase database. Images are uploaded to Supabase Storage and managed automatically.
              </p>
              <p className="text-sm text-green-800">
                Data is cached locally for faster loading. Cache is automatically cleared when data is updated.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

