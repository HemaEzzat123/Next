import { Metadata } from 'next';
import { Suspense } from 'react';
import { fetchFilteredCustomers } from '@/app/lib/data';
import CustomersTable from '@/app/ui/customers/table';
import Search from '@/app/ui/search';

export const metadata: Metadata = {
  title: 'Customers',
};

interface SearchParamsProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function Page({ searchParams }: SearchParamsProps) {
  const queryParam = searchParams?.query;
  const query = Array.isArray(queryParam) ? queryParam[0] : queryParam || '';
  const customers = await fetchFilteredCustomers(query);

  return (
    <div className="w-full">
      <Suspense fallback={<div className="h-10 mb-4 bg-gray-100 rounded-md" />}>
        <Search placeholder="Search customers..." />
      </Suspense>
      <CustomersTable customers={customers} />
    </div>
  );
}
