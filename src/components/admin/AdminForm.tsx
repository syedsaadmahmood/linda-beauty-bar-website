import { ReactNode, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

interface AdminFormProps {
  title: string;
  description?: string;
  onSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
  children: ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
}

export function AdminForm({
  title,
  description,
  onSubmit,
  onCancel,
  children,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  isLoading = false,
}: AdminFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleTopSave = (e: React.MouseEvent) => {
    e.preventDefault();
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <Button
          type="button"
          onClick={handleTopSave}
          className="bg-blush-pink hover:bg-blush-pink-dark text-charcoal"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : submitLabel}
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <form ref={formRef} onSubmit={onSubmit} className="space-y-6">
          {children}
          <div className="flex justify-end gap-4 pt-6 mt-6 border-t border-gray-200">
            <Button
              type="submit"
              className="bg-blush-pink hover:bg-blush-pink-dark text-charcoal"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : submitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}



