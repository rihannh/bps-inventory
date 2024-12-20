import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';

const adminSchema = z.object({
  nama: z
    .string()
    .min(1, {message: 'Nama tidak boleh kosong.'})
    .max(100, {message: 'Nama tidak boleh lebih dari 100 karakter.'}),
  email: z.string().email({message: 'Email tidak valid.'}),
  username: z
    .string()
    .min(5, {message: 'Username harus memiliki minimal 5 karakter.'})
    .max(20, {message: 'Username tidak boleh lebih dari 20 karakter.'})
    .regex(/^[a-zA-Z0-9._]+$/, {
      message:
        'Username hanya boleh mengandung huruf, angka, titik, atau underscore.',
    }),
  password: z
    .string()
    .min(8, {message: 'Password harus memiliki minimal 8 karakter.'})
    .max(50, {message: 'Password tidak boleh lebih dari 50 karakter.'}),
  // .regex(/[A-Z]/, { message: 'Password harus memiliki setidaknya satu huruf besar.' })
  // .regex(/[a-z]/, { message: 'Password harus memiliki setidaknya satu huruf kecil.' })
  // .regex(/[0-9]/, { message: 'Password harus memiliki setidaknya satu angka.' })
  // .regex(/[@$!%*?&#]/, { message: 'Password harus memiliki setidaknya satu karakter spesial.' }),
});

export default function AdminForm() {
  const form = useForm<z.infer<typeof adminSchema>>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      nama: '',
      email: '',
      username: '',
      password: '',
    },
  });
  function onSubmit(values: z.infer<typeof adminSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=' space-y-8'>
        <FormField
          control={form.control}
          name='nama'
          render={({field}) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input placeholder='Nama' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='username'
          render={({field}) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='Username' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({field}) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
