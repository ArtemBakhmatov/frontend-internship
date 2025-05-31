import { useForm } from 'react-hook-form';
import { Button, TextField, Stack, Alert } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/client';

export const FormComponent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const queryClient = useQueryClient();

  //@ts-expect-error isPending
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (newItem) => api.post('/items', newItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    }
  });

  return (
    <form onSubmit={handleSubmit((data) => {
      console.log('Submitting:', data); 
      //@ts-expect-error data
      mutate(data);
    })}>
      <Stack spacing={2} sx={{ maxWidth: 400, margin: '0 auto' }}>
        <TextField
          label="Name"
          {...register('name', { required: true })}
          error={!!errors.name}
        />
        <TextField
          label="Email"
          type="email"
          {...register('email', { required: true })}
          error={!!errors.email}
        />
        <TextField
          label="Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          {...register('date', { required: true })}
          error={!!errors.date}
        />
        <TextField
          label="Status"
          select
          SelectProps={{ native: true }}
          {...register('status', { required: true })}
          error={!!errors.status}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </TextField>
        <TextField
          label="Custom Field"
          {...register('field5', { required: true })}
          error={!!errors.field5}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={isPending}
        >
          {isPending ? 'Sending...' : 'Add Item'}
        </Button>
        {isError && <Alert severity="error">Error!</Alert>}
        {isSuccess && <Alert severity="success">Success!</Alert>}
      </Stack>
    </form>
  );
};