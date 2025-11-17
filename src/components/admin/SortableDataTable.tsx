import { ReactNode, useState, useEffect } from 'react';
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
import { Button } from '../ui/button';
import { Edit, Trash2, GripVertical } from 'lucide-react';

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => ReactNode;
}

interface SortableDataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onReorder: (items: T[]) => Promise<void>; // Called when items are reordered
  keyExtractor: (item: T) => string | number;
  groupBy?: (item: T) => string; // For per-category sorting
}

interface SortableRowProps<T> {
  item: T;
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  keyExtractor: (item: T) => string | number;
}

function SortableRow<T>({ item, columns, onEdit, onDelete, keyExtractor }: SortableRowProps<T>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: keyExtractor(item) });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-b-0 ${
        isDragging ? 'bg-gray-100' : ''
      }`}
    >
      <td className="px-4 py-4">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
          aria-label="Drag to reorder"
        >
          <GripVertical className="w-5 h-5" />
        </button>
      </td>
      {columns.map((column) => (
        <td key={column.key} className="px-6 py-4 text-sm text-gray-700">
          {column.render ? column.render(item) : (item as any)[column.key]}
        </td>
      ))}
      {(onEdit || onDelete) && (
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(item)}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Edit className="w-4 h-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(item)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </td>
      )}
    </tr>
  );
}

export function SortableDataTable<T extends { sort_order?: number }>({
  data,
  columns,
  onEdit,
  onDelete,
  onReorder,
  keyExtractor,
  groupBy,
}: SortableDataTableProps<T>) {
  const [items, setItems] = useState<T[]>(data);
  const [isSaving, setIsSaving] = useState(false);

  // Update local state when data prop changes
  useEffect(() => {
    setItems(data);
  }, [data]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => keyExtractor(item) === active.id);
      const newIndex = items.findIndex((item) => keyExtractor(item) === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);

      // Update sort_order for all items
      const itemsWithOrder = newItems.map((item, index) => ({
        ...item,
        sort_order: index,
      }));

      try {
        setIsSaving(true);
        await onReorder(itemsWithOrder);
      } catch (error) {
        console.error('Error reordering items:', error);
        // Revert on error
        setItems(items);
        alert('Failed to save new order. Please try again.');
      } finally {
        setIsSaving(false);
      }
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12">
        <div className="text-center text-gray-500">
          <p className="text-base">No items found.</p>
          <p className="text-sm mt-1">Add your first item to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {isSaving && (
        <div className="bg-blue-50 border-b border-blue-200 px-6 py-2 text-sm text-blue-800">
          Saving new order...
        </div>
      )}
      <div className="overflow-x-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-4 text-left text-sm font-semibold text-charcoal w-12">
                  {/* Drag handle column */}
                </th>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-6 py-4 text-left text-sm font-semibold text-charcoal"
                  >
                    {column.label}
                  </th>
                ))}
                {(onEdit || onDelete) && (
                  <th className="px-6 py-4 text-left text-sm font-semibold text-charcoal">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              <SortableContext
                items={items.map((item) => keyExtractor(item))}
                strategy={verticalListSortingStrategy}
              >
                {items.map((item) => (
                  <SortableRow
                    key={keyExtractor(item)}
                    item={item}
                    columns={columns}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    keyExtractor={keyExtractor}
                  />
                ))}
              </SortableContext>
            </tbody>
          </table>
        </DndContext>
      </div>
    </div>
  );
}

