'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { ApiError } from '@/lib/api';
import { useAuthStore } from '@/lib/store';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .regex(/@stud\.noroff\.no$/, 'Must be a valid stud.noroff.no email'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, isAuthenticated } = useAuthStore();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  async function onSubmit(data: LoginForm) {
    try {
      setIsLoading(true);

      const { authApi } = await import('@/lib/api');
      const result = await authApi.login(data.email, data.password);

      if (result.data.accessToken) {
        localStorage.setItem('accessToken', result.data.accessToken);
      }

      setUser(result.data);
      toast.success('Login successful!');
      router.push('/');
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error('Failed to login. Please try again.');
      }
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-md w-full bg-white p-8 rounded-xl shadow-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-3xl font-playfair mb-3">Welcome Back</h1>
          <p className="text-gray-500 font-montserrat">Enter your credentials to access your account</p>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your.name@stud.noroff.no"
                        type="email"
                        className="h-12 border-2 focus:border-black transition-colors"
                        autoComplete="email"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                      <Link href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="********"
                        type="password"
                        className="h-12 border-2 focus:border-black transition-colors"
                        autoComplete="current-password"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                className="w-full h-12 bg-black hover:bg-gray-800 text-white flex items-center justify-center gap-2 group"
                disabled={isLoading}
                aria-label="Sign in"
              >
                <span>{isLoading ? 'Signing in...' : 'Sign in'}</span>
                <LogIn size={18} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </form>
        </Form>

        <motion.div variants={itemVariants} className="mt-8 text-center text-gray-600 font-montserrat">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-black font-semibold hover:underline">
            Create an account
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
