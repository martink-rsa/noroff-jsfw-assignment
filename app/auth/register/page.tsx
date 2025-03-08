'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';
import { ChevronLeft, UserPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'Username is required')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .regex(/@stud\.noroff\.no$/, 'Must be a valid stud.noroff.no email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  bio: z.string().max(160, 'Bio must be less than 160 characters').optional(),
  avatarUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  avatarAlt: z.string().max(120, 'Alt text must be less than 120 characters').optional(),
  bannerUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  bannerAlt: z.string().max(120, 'Alt text must be less than 120 characters').optional(),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      bio: '',
      avatarUrl: '',
      avatarAlt: '',
      bannerUrl: '',
      bannerAlt: '',
    },
  });

  async function onSubmit(data: RegisterForm) {
    try {
      setIsLoading(true);

      // Prepare user data
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        bio: data.bio || undefined,
        avatar: data.avatarUrl
          ? {
              url: data.avatarUrl,
              alt: data.avatarAlt || '',
            }
          : undefined,
        banner: data.bannerUrl
          ? {
              url: data.bannerUrl,
              alt: data.bannerAlt || '',
            }
          : undefined,
      };

      // Import authApi dynamically to avoid issues with server components
      const { authApi } = await import('@/lib/api');
      await authApi.register(userData);

      toast.success('Registration successful!');
      router.push('/auth/login');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  }

  // Variants for animations
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
        className="max-w-lg w-full bg-white p-8 rounded-xl shadow-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-3xl font-playfair mb-3">Create Account</h1>
          <p className="text-gray-500 font-montserrat">Join our exclusive community and discover luxury</p>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="username"
                        className="h-12 border-2 focus:border-black transition-colors"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your.name@stud.noroff.no"
                        type="email"
                        className="h-12 border-2 focus:border-black transition-colors"
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
                    <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Minimum 8 characters"
                        type="password"
                        className="h-12 border-2 focus:border-black transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-sm flex items-center text-gray-600 hover:text-black transition-colors"
              >
                <span className="mr-1">{showAdvanced ? 'Hide' : 'Show'} advanced options</span>
                <ChevronLeft className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-90' : '-rotate-90'}`} />
              </button>
            </motion.div>

            {showAdvanced && (
              <>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pt-2 pb-4 border-t border-gray-100"
                >
                  <h3 className="font-medium text-gray-800 mb-4">Profile Details (Optional)</h3>

                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about yourself"
                              className="resize-none border-2 focus:border-black transition-colors"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="avatarUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Avatar URL</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://example.com/avatar.jpg"
                                className="border-2 focus:border-black transition-colors"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="avatarAlt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Avatar Alt Text</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Profile picture description"
                                className="border-2 focus:border-black transition-colors"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="bannerUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Banner URL</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://example.com/banner.jpg"
                                className="border-2 focus:border-black transition-colors"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="bannerAlt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Banner Alt Text</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Banner image description"
                                className="border-2 focus:border-black transition-colors"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </motion.div>
              </>
            )}

            <motion.div variants={itemVariants} className="pt-4">
              <Button
                type="submit"
                className="w-full h-12 bg-black hover:bg-gray-800 text-white flex items-center justify-center gap-2 group"
                disabled={isLoading}
              >
                <span>{isLoading ? 'Creating account...' : 'Create account'}</span>
                <UserPlus size={18} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </form>
        </Form>

        <motion.div variants={itemVariants} className="mt-8 text-center text-gray-600 font-montserrat">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-black font-semibold hover:underline">
            Sign in
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
