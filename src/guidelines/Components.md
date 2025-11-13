# Component Guidelines

## Component Organization

### Admin Components
Located in `src/components/admin/`
- Form components
- Data tables
- Management interfaces

### UI Components
Located in `src/components/ui/`
- Reusable shadcn/ui components
- Base UI primitives

### Page Components
Located in `src/components/`
- Feature-specific components
- Page sections

## Component Patterns

### Data Fetching
```typescript
const [data, setData] = useState<DataType[]>([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  loadData();
}, []);

const loadData = async () => {
  try {
    const result = await getData();
    setData(result);
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    setIsLoading(false);
  }
};
```

### Form Handling
- Use controlled components
- Validate on submit
- Show error messages clearly
- Provide loading states

## Reusability

- Extract common patterns into hooks
- Create reusable utility functions
- Share types across components
- Document component props

