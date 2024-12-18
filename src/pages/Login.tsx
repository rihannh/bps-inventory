import {useToast} from '@/hooks/use-toast';
import {useNavigate} from 'react-router-dom';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '@/components/ui/button';
import {Link} from 'react-router-dom';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {loginUser} from '@/lib/network/authServices';
import {Toaster} from '@/components/ui/toaster';
import { convertToSlug } from '@/lib/utils';
// import {normalizeRole} from '@/lib/utils';

const loginFormSchema = z.object({
  email: z.string().email({message: 'Please enter a valid email address'}),
  password: z
    .string()
    .min(8, {message: 'Password must be at least 8 characters'}),
});

export default function Login() {
  const {toast} = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      const user = await loginUser(values.email, values.password);

      // localStorage.setItem('token', response.token);
      // localStorage.setItem('user', JSON.stringify(response));

      // const role = normalizeRole(response.role);
      // const role = response.role;
      console.log(user);
      // !Development only
      if (user == null) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'Invalid email or password',
        });
        return;
      }
      const role = convertToSlug(user.role);
      navigate(`/${role}/dashboard`);
    } catch (err) {
      console.error('Login failed:', err);
      form.setError('email', {message: 'Invalid email or password'});
    }
  };

  return (
    <div className='bg-white flex justify-center items-center h-screen w-full'>
      <Card className='max-w-sm mx-auto'>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='rihan1234@mail.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='space-y-2'>
                <FormField
                  control={form.control}
                  name='password'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='********'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Link
                  to='#'
                  className='ml-auto text-slate-600 inline-block text-sm underline -mt-4'
                >
                  Forget password?
                </Link>
              </div>

              <Button className='w-full' type='submit'>
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
