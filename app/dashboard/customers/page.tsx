import { Metadata } from 'next';
import { fetchFilteredCustomers } from '@/app/lib/data';
import CustomersTable from '@/app/ui/customers/table';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page() {
  const customers = await fetchFilteredCustomers('');

  return <CustomersTable customers={customers} />;
}
