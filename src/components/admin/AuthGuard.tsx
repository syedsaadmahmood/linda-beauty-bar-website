import { useState, useEffect, ReactNode } from 'react';
import { Login } from './Login';
import { supabase } from '../../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsChecking(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsChecking(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = () => {
    // User will be updated via auth state change listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  };

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-charcoal">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return <>{children}</>;
}

// Export logout function for use in other components
export async function logout() {
  await supabase.auth.signOut();
}
