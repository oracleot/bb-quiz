import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              🌟 Kids Coding Quiz 🌟
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-2">
              Church Coding Training Program
            </p>
            <p className="text-lg text-gray-500">
              Discover your potential for learning technology!
            </p>
          </div>

          {/* Main Welcome Card */}
          <Card className="mb-8 border-2 border-blue-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardTitle className="text-2xl text-center text-blue-700">
                Welcome, Future Coders! 👨‍💻👩‍💻
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Are you curious about technology? Do you love solving puzzles and learning new things? 
                    This fun quiz will help us understand how ready you are to start your coding journey!
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl mb-2">📖</div>
                    <h3 className="font-semibold text-blue-700">Reading & Writing</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Questions about following instructions and understanding text
                    </p>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl mb-2">💻</div>
                    <h3 className="font-semibold text-purple-700">Computer Basics</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Questions about using computers and solving technology problems
                    </p>
                  </div>
                  
                  <div className="text-center p-4 bg-pink-50 rounded-lg">
                    <div className="text-3xl mb-2">🤔</div>
                    <h3 className="font-semibold text-pink-700">Curiosity & Learning</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Questions about your interest in technology and learning
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Details */}
          <Card className="mb-8 border-2 border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-xl text-center text-green-700">
                📋 Quiz Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">⏰</span>
                    <div>
                      <h4 className="font-semibold">15 Minutes</h4>
                      <p className="text-sm text-gray-600">Take your time!</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">❓</span>
                    <div>
                      <h4 className="font-semibold">10 Questions</h4>
                      <p className="text-sm text-gray-600">Multiple choice format</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">👶</span>
                    <div>
                      <h4 className="font-semibold">Ages 9-13</h4>
                      <p className="text-sm text-gray-600">Perfect for your age group!</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <h4 className="font-semibold">No Wrong Answers</h4>
                      <p className="text-sm text-gray-600">Just be yourself!</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Start Button */}
          <div className="text-center">
            <Link href="/info">
              <Button 
                size="lg" 
                className="px-8 py-4 text-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                🚀 Start Your Adventure!
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              Click the button above to begin your coding quiz journey!
            </p>
          </div>

          {/* Encouragement */}
          <div className="mt-12 text-center">
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
              <p className="text-lg text-yellow-800 font-medium">
                🌈 Remember: This quiz is all about discovering what makes you special! 
                There are no wrong answers - just answer honestly and have fun! 🌈
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
