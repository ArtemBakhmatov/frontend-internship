import { render, screen } from '@testing-library/react';
import { TableComponent } from '../components/TableComponent';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { expect, test } from 'vitest';

test('renders table', () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <TableComponent />
    </QueryClientProvider>
  );
  expect(screen.getByRole('table')).toBeInTheDocument();
});