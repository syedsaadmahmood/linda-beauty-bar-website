import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Lock } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message || 'Invalid credentials. Please try again.');
        setIsLoading(false);
        return;
      }

      if (data.user) {
        onLogin();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream to-blush-pink-light p-4">
      <Card className="shadow-lg" style={{ width: '500px', maxWidth: '500px' }}>
        <CardHeader className="text-center space-y-3 pb-6">
          <div className="mx-auto w-14 h-14 bg-blush-pink rounded-full flex items-center justify-center shadow-md">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <CardTitle className="text-2xl font-semibold">Admin Login</CardTitle>
          <CardDescription className="text-sm">
            Sign in to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full"
                autoFocus
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2 mt-4">
              <Label htmlFor="password" className="text-sm font-medium mb-2">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full"
                disabled={isLoading}
                required
              />
            </div>
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
                {error}
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-blush-pink hover:bg-blush-pink-dark text-charcoal font-medium mt-8"
              disabled={isLoading || !email || !password}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
