import { useState, useEffect } from 'react';
import { getFAQCategories, saveFAQCategory, deleteFAQCategory, updateSortOrder, type FAQCategory } from '../../utils/adminStorage';
import { AdminForm } from './AdminForm';
import { SortableDataTable } from './SortableDataTable';
import { SEOFormFields } from './SEOFormFields';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Plus, X, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

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

  const handleCategoriesReorder = async (reorderedCategories: FAQCategory[]) => {
    await updateSortOrder('faq', reorderedCategories);
    await loadCategories();
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

      <SortableDataTable
        data={categories.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))}
        columns={[
          { 
            key: 'category', 
            label: 'Category',
            render: (item: FAQCategory) => (
              <div>
                <div className="font-semibold">{item.category}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {item.questions.length} question{item.questions.length !== 1 ? 's' : ''}
                </div>
              </div>
            )
          },
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onReorder={handleCategoriesReorder}
        keyExtractor={(c) => c.category}
      />
    </div>
  );
}

interface FAQFormProps {
  category?: FAQCategory | null;
  onSave: (category: FAQCategory) => void;
  onCancel: () => void;
}

function SortableQuestionItem({ question, index, onQuestionChange, onRemove }: {
  question: { id: string; question: string; answer: string };
  index: number;
  onQuestionChange: (index: number, field: 'question' | 'answer', value: string) => void;
  onRemove: (index: number) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-4 border rounded-lg space-y-3 ${isDragging ? 'bg-gray-100' : ''}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
            aria-label="Drag to reorder"
          >
            <GripVertical className="w-4 h-4" />
          </button>
          <h4 className="font-medium">Question #{index + 1}</h4>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onRemove(index)}
          className="text-red-600"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      <div className="space-y-2">
        <Input
          placeholder="Question"
          value={question.question}
          onChange={(e) => onQuestionChange(index, 'question', e.target.value)}
        />
        <Textarea
          placeholder="Answer"
          value={question.answer}
          onChange={(e) => onQuestionChange(index, 'answer', e.target.value)}
          rows={3}
        />
      </div>
    </div>
  );
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = formData.questions.findIndex((q) => q.id === active.id);
      const newIndex = formData.questions.findIndex((q) => q.id === over.id);

      setFormData((prev) => ({
        ...prev,
        questions: arrayMove(prev.questions, oldIndex, newIndex).map((q, index) => ({
          ...q,
          sort_order: index,
        })),
      }));
    }
  };

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
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={formData.questions.map((q) => q.id)}
                strategy={verticalListSortingStrategy}
              >
                {formData.questions.map((q, index) => (
                  <SortableQuestionItem
                    key={q.id}
                    question={q}
                    index={index}
                    onQuestionChange={handleQuestionChange}
                    onRemove={removeQuestion}
                  />
                ))}
              </SortableContext>
            </DndContext>
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

