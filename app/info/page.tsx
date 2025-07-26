'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useQuizStore } from '@/lib/store';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }).max(50, {
    message: 'Name must be less than 50 characters.',
  }),
  age: z.number().min(9, {
    message: 'You must be at least 9 years old.',
  }).max(13, {
    message: 'This quiz is designed for ages 9-13.',
  }),
});

export default function UserInfoPage() {
  const router = useRouter();
  const { setUserInfo } = useQuizStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: '' as any, // Empty initially to avoid showing default number
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      // Store user info in Zustand store
      setUserInfo({
        name: values.name.trim(),
        age: values.age,
      });

      // Redirect to quiz page
      router.push('/quiz');
    } catch (error) {
      console.error('Error submitting user info:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              👋 Let&apos;s Get to Know You!
            </h1>
            <p className="text-lg text-gray-600">
              Tell us a little about yourself before we start the quiz
            </p>
          </div>

          {/* Info Form Card */}
          <Card className="border-2 border-blue-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardTitle className="text-xl text-center text-blue-700">
                📝 Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-700">
                          What&apos;s your name? ✨
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your first name"
                            className="text-lg p-4 border-2 border-gray-300 focus:border-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Age Field */}
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-700">
                          How old are you? 🎂
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="9"
                            max="13"
                            placeholder="Enter your age"
                            className="text-lg p-4 border-2 border-gray-300 focus:border-blue-500"
                            {...field}
                            value={field.value === 0 ? '' : field.value || ''}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === '') {
                                field.onChange('');
                                return;
                              }
                              const numValue = parseInt(value);
                              if (!isNaN(numValue)) {
                                field.onChange(numValue);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Privacy Notice */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-2">🔒 Privacy & Safety</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• We only collect your name and age</li>
                      <li>• Your information helps us understand how to teach coding better</li>
                      <li>• We keep your information safe and private</li>
                      <li>• Ask a parent or guardian if you have questions!</li>
                    </ul>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center pt-4">
                    <Button 
                      type="submit" 
                      size="lg"
                      disabled={isSubmitting}
                      className="px-8 py-4 text-xl font-semibold bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Getting Ready...
                        </>
                      ) : (
                        <>
                          🎯 Start the Quiz!
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Encouragement */}
          <div className="mt-8 text-center">
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
              <p className="text-lg text-yellow-800 font-medium">
                🚀 Great! Once you fill this out, we&apos;ll start your coding adventure! 
                Remember to be honest and have fun! 🚀
              </p>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center mt-6">
            <Button 
              variant="outline" 
              onClick={() => router.push('/')}
              className="border-2 border-gray-300 hover:border-gray-400"
            >
              ← Back to Welcome Page
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
