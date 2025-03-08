'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(3, 'Message must be at least 3 characters'),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Log form data to console as per requirements
      console.log('Form submitted:', data);

      toast({
        title: 'Message Sent',
        description: 'Thank you for your message. We will get back to you soon.',
      });

      reset();
    } catch {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <motion.div initial="hidden" animate="visible" variants={containerVariant} className="max-w-6xl mx-auto">
          <motion.div variants={itemVariant} className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-playfair mb-4">Get in Touch</h1>
            <p className="text-gray-600 max-w-3xl mx-auto font-montserrat leading-relaxed">
              We&apos;d love to hear from you! Whether you have a question about our products, need assistance with an
              order, or want to collaborate with us, our team is here to help.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <motion.div variants={itemVariant} className="lg:col-span-2 space-y-8 lg:pr-8 order-2 lg:order-1">
              <div>
                <h3 className="text-xl font-playfair mb-6 border-b pb-2">Contact Information</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="mt-1 bg-black text-white p-2.5 rounded-full">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h4 className="font-montserrat font-medium mb-1">Our Store</h4>
                      <p className="text-gray-600 font-montserrat">
                        123 Luxury Avenue
                        <br />
                        New York, NY 10001
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 bg-black text-white p-2.5 rounded-full">
                      <Mail size={18} />
                    </div>
                    <div>
                      <h4 className="font-montserrat font-medium mb-1">Email Us</h4>
                      <p className="text-gray-600 font-montserrat">
                        contact@luxurystore.com
                        <br />
                        support@luxurystore.com
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 bg-black text-white p-2.5 rounded-full">
                      <Phone size={18} />
                    </div>
                    <div>
                      <h4 className="font-montserrat font-medium mb-1">Call Us</h4>
                      <p className="text-gray-600 font-montserrat">
                        +1 (212) 555-1234
                        <br />
                        Mon-Fri: 9AM - 6PM
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <h3 className="text-xl font-playfair mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a href="#" className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a href="#" className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariant}
              className="bg-white p-8 rounded-lg shadow-sm lg:col-span-3 order-1 lg:order-2 border border-gray-100"
            >
              <h2 className="text-2xl font-playfair mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName" className="text-gray-700 font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      {...register('fullName')}
                      className={`mt-1 h-12 border-2 focus:border-black transition-colors ${errors.fullName ? 'border-red-400' : ''}`}
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      {...register('email')}
                      className={`mt-1 h-12 border-2 focus:border-black transition-colors ${errors.email ? 'border-red-400' : ''}`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-gray-700 font-medium">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="How can we help you?"
                    {...register('subject')}
                    className={`mt-1 h-12 border-2 focus:border-black transition-colors ${errors.subject ? 'border-red-400' : ''}`}
                  />
                  {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-700 font-medium">
                    Message
                  </Label>
                  <textarea
                    id="message"
                    placeholder="Write your message here..."
                    {...register('message')}
                    className={`w-full min-h-[180px] rounded-md border-2 p-4 text-sm focus:outline-none focus:border-black transition-colors ${
                      errors.message ? 'border-red-400' : ''
                    }`}
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 rounded-md h-12 transition-colors duration-300 flex items-center justify-center gap-2 group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={16} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full h-[400px] mt-24 bg-gray-200"
      >
        <div className="w-full h-full bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-l+000(-73.9857,40.7484)/-73.9857,40.7484,14,0/1200x400@2x?access_token=pk.placeholder')] bg-no-repeat bg-center bg-cover">
          {/* Map placeholder - in a real app, replace with actual map */}
        </div>
      </motion.div>
    </div>
  );
}
