import AdminProductForm from '@/components/AdminProductForm';

export default function AdminPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Admin Panel</h1>
      <AdminProductForm />
    </div>
  );
}
