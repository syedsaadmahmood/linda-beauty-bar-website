import { useState, useEffect } from 'react';
import { getFAQCategories, saveFAQCategory, deleteFAQCategory, type FAQCategory } from '../../utils/adminStorage';
import { AdminForm } from './AdminForm';
import { SEOFormFields } from './SEOFormFields';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Plus, X, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function ManageFAQ() {
  const [categories, setCategories] = useState<FAQCategory[]>([]);
  const [editingCategory, setEditingCategory] = useState<FAQCategory | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getFAQCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error loading FAQ categories:', error);
    }
  };

  const handleSave = async (category: FAQCategory) => {
    try {
      await saveFAQCategory(category);
      await loadCategories(); // Reload to get fresh data
      setIsFormOpen(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Error saving FAQ category:', error);
      alert('Failed to save FAQ category. Please try again.');
    }
  };

  const handleDelete = async (category: FAQCategory) => {
    if (confirm(`Are you sure you want to delete the "${category.category}" category?`)) {
      try {
        await deleteFAQCategory(category.category);
        await loadCategories(); // Reload to get fresh data
      } catch (error) {
        console.error('Error deleting FAQ category:', error);
        alert('Failed to delete FAQ category. Please try again.');
      }
    }
  };

  const handleEdit = (category: FAQCategory) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingCategory(null);
  };

  if (isFormOpen) {
    return (
      <FAQForm
        category={editingCategory}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <h2 className="text-3xl font-bold text-charcoal mb-2">FAQ</h2>
            <p className="text-gray-600">Manage FAQ categories and questions</p>
          </div>
          <Button
            onClick={() => setIsFormOpen(true)}
            className="bg-blush-pink hover:bg-blush-pink-dark text-charcoal"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {categories.map((category) => (
          <Card key={category.category}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{category.category}</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(category)}
                    className="text-blue-600"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(category)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.questions.map((q) => (
                  <div key={q.id} className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-charcoal mb-1">{q.question}</h4>
                    <p className="text-sm text-gray-600">{q.answer}</p>
                  </div>
                ))}
                {category.questions.length === 0 && (
                  <p className="text-sm text-gray-500">No questions in this category</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {categories.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12">
            <div className="text-center text-gray-500">
              <p className="text-base">No FAQ categories found.</p>
              <p className="text-sm mt-1">Add your first category to get started.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface FAQFormProps {
  category?: FAQCategory | null;
  onSave: (category: FAQCategory) => void;
  onCancel: () => void;
}

function FAQForm({ category, onSave, onCancel }: FAQFormProps) {
  const [formData, setFormData] = useState<FAQCategory>(category || {
    category: '',
    questions: [],
  });

  useEffect(() => {
    if (category) {
      setFormData(category);
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleQuestionChange = (index: number, field: 'question' | 'answer', value: string) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === index ? { ...q, [field]: value } : q
      ),
    }));
  };

  const addQuestion = () => {
    const newId = `faq-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, { id: newId, question: '', answer: '' }],
    }));
  };

  const removeQuestion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  return (
    <AdminForm
      title={category ? 'Edit FAQ Category' : 'Add New FAQ Category'}
      description="Manage FAQ category with questions and SEO"
      onSubmit={handleSubmit}
      onCancel={onCancel}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="category">Category Name *</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            required
            disabled={!!category}
          />
          {category && (
            <p className="text-xs text-gray-500">Category name cannot be changed</p>
          )}
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Questions</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={addQuestion}>
                <Plus className="w-4 h-4 mr-2" />
                Add Question
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.questions.map((q, index) => (
              <div key={q.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Question #{index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeQuestion(index)}
                    className="text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Input
                    placeholder="Question"
                    value={q.question}
                    onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                  />
                  <Textarea
                    placeholder="Answer"
                    value={q.answer}
                    onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            ))}
            {formData.questions.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">No questions added yet</p>
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

