import { Metadata } from 'next';
import { Suspense } from 'react';
import { fetchFilteredCustomers } from '@/app/lib/data';
import CustomersTable from '@/app/ui/customers/table';
import Search from '@/app/ui/search';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page({ searchParams }: { searchParams?: { query?: string } }) {
  const query = searchParams?.query || '';
  const customers = await fetchFilteredCustomers(query);

  return (
    <div className="w-full">
      {/* Search needs Suspense because it uses `useSearchParams` */}
      <Suspense fallback={<div className="h-10 mb-4 bg-gray-100 rounded-md" />}>
        <Search placeholder="Search customers..." />
      </Suspense>

      {/* Table is server-rendered */}
      <CustomersTable customers={customers} />
    </div>
  );
}
