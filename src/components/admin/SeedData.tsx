import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Loader2, CheckCircle, XCircle, Database } from 'lucide-react';
import { seedSupabase } from '../../scripts/seedSupabase';

export function SeedData() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<{ success: boolean; error?: any } | null>(null);

  const handleSeed = async () => {
    if (!confirm('This will seed all data from JSON files into Supabase. Continue?')) {
      return;
    }

    setIsSeeding(true);
    setSeedResult(null);

    try {
      const result = await seedSupabase();
      setSeedResult(result);
      
      if (result.success) {
        // Clear all cache after successful seed
        const { clearAllCache } = await import('../../utils/cache');
        clearAllCache();
      }
    } catch (error) {
      setSeedResult({ success: false, error });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Database className="w-6 h-6 text-blush-pink" />
          <div>
            <CardTitle>Seed Supabase Database</CardTitle>
            <CardDescription>
              Import all data from JSON files into Supabase. Run this once after setting up Supabase.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">What this does:</h4>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-blue-800">
            <li>Imports all service categories and services from default data</li>
            <li>Imports all testimonials</li>
            <li>Imports all FAQ categories with their questions and answers</li>
            <li>Imports all portfolio categories and portfolio items</li>
            <li>Populates your Supabase database with initial/default content</li>
            <li>Automatically clears all cache after successful import</li>
          </ul>
          <p className="text-xs text-blue-700 mt-3 pt-3 border-t border-blue-200">
            <strong>Note:</strong> This will overwrite any existing data in your database. Use this when setting up a new database or resetting to default content.
          </p>
        </div>

        <Button
          onClick={handleSeed}
          disabled={isSeeding}
          className="w-full bg-blush-pink hover:bg-blush-pink-dark text-charcoal"
        >
          {isSeeding ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Seeding Database...
            </>
          ) : (
            <>
              <Database className="w-4 h-4 mr-2" />
              Seed Database
            </>
          )}
        </Button>

        {seedResult && (
          <div className={`p-4 rounded-lg flex items-start gap-3 ${
            seedResult.success 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            {seedResult.success ? (
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <h4 className={`font-semibold mb-1 ${
                seedResult.success ? 'text-green-900' : 'text-red-900'
              }`}>
                {seedResult.success ? 'Seed Completed Successfully!' : 'Seed Failed'}
              </h4>
              {seedResult.success ? (
                <p className="text-sm text-green-800">
                  All data has been imported into Supabase. The cache has been cleared. 
                  Your site will now fetch data from Supabase.
                </p>
              ) : (
                <div className="text-sm text-red-800">
                  <p className="mb-2">An error occurred while seeding the database:</p>
                  <pre className="bg-red-100 p-2 rounded text-xs overflow-auto">
                    {seedResult.error?.message || JSON.stringify(seedResult.error, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}



