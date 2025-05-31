import { useInfiniteQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { api } from '../api/client';
import { useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchItems = async ({ pageParam = 1 }): Promise<any[]> => {
  try {
    const { data } = await api.get(`/items?_page=${pageParam}&_limit=10`);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
};

export const TableComponent = () => {
  const tableRef = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['items'],
    queryFn: fetchItems,
    getNextPageParam: (lastPage, pages) => lastPage.length ? pages.length + 1 : undefined,
  });

  useEffect(() => {
    const table = tableRef.current;
    if (!table || !hasNextPage) return;

    const handleScroll = () => {
      if (table.scrollTop + table.clientHeight >= table.scrollHeight - 20 && !isFetching) {
        fetchNextPage();
      }
    };

    table.addEventListener('scroll', handleScroll);
    return () => table.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetching]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getUniqueKey = (item: any, pageIndex: number, itemIndex: number) => {
    return `${item.id}_${pageIndex}_${itemIndex}`;
  };

  return (
    <TableContainer component={Paper} ref={tableRef} sx={{ maxHeight: 500, overflow: 'auto' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.pages.map((page, pageIndex) =>
            page.map((item, itemIndex) => (
              <TableRow key={getUniqueKey(item, pageIndex, itemIndex)}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))
          )}
          {isFetching && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <CircularProgress size={20} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};