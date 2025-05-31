import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TableComponent } from './components/TableComponent';
import { FormComponent } from './components/FormComponent';
import { CssBaseline, Container, Typography } from '@mui/material';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>Internship Task</Typography>
        <FormComponent />
        <TableComponent />
      </Container>
    </QueryClientProvider>
  );
}
