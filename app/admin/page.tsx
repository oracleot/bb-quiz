'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AdminConfig {
  timerDurationMinutes: number;
  lastUpdated: string;
  updatedBy: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [config, setConfig] = useState<AdminConfig | null>(null);
  const [timerDuration, setTimerDuration] = useState<number | string>(10);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    // Check if user is already authenticated (simple session check)
    const token = localStorage.getItem('adminToken');
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
      fetchConfig(token);
    }
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    setAuthError('');
    
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        setAuthToken(data.token);
        localStorage.setItem('adminToken', data.token);
        fetchConfig(data.token);
      } else {
        setAuthError(data.error || 'Authentication failed');
      }
    } catch (error) {
      setAuthError('Network error. Please try again.');
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchConfig = async (token: string) => {
    try {
      const response = await fetch('/api/admin/config', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const configData = await response.json();
        setConfig(configData);
        setTimerDuration(configData.timerDurationMinutes);
      }
    } catch (error) {
      console.error('Failed to fetch config:', error);
    }
  };

  const handleUpdateConfig = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ timerDurationMinutes: typeof timerDuration === 'number' ? timerDuration : parseInt(timerDuration as string) }),
      });

      const data = await response.json();

      if (response.ok) {
        setConfig(data.config);
        setMessage('Configuration updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
      console.error('Update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthToken('');
    setConfig(null);
    setPassword('');
    localStorage.removeItem('adminToken');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-2 border-blue-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-gray-50 border-b">
            <CardTitle className="text-center text-2xl text-blue-700">
              🔐 Admin Access
            </CardTitle>
            <p className="text-center text-gray-600 text-sm">
              Enter the admin password to continue
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="Enter admin password"
                  className="mt-1"
                />
              </div>
              
              {authError && (
                <div className="text-red-600 text-sm text-center">
                  {authError}
                </div>
              )}

              <Button 
                onClick={handleLogin}
                disabled={isLoading || !password.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? 'Authenticating...' : 'Login'}
              </Button>

              <div className="text-center pt-4 border-t">
                <p className="text-xs text-gray-500">
                  Need access? Ask for password from Brother Emmanuel
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-100 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              ⚙️ Quiz Admin Panel
            </h1>
            <p className="text-gray-600">
              Manage quiz settings and configurations
            </p>
          </div>

          {/* Current Config Display */}
          {config && (
            <Card className="border-2 border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">📊 Current Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-semibold">Timer Duration:</span>
                    <p className="text-green-700">{config.timerDurationMinutes} minutes</p>
                  </div>
                  <div>
                    <span className="font-semibold">Last Updated:</span>
                    <p className="text-green-700">
                      {new Date(config.lastUpdated).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold">Updated By:</span>
                    <p className="text-green-700">{config.updatedBy}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Timer Configuration */}
          <Card className="border-2 border-blue-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-blue-700">⏰ Timer Settings</CardTitle>
              <p className="text-gray-600 text-sm">
                Configure the quiz timer duration for all participants
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="timerDuration">Timer Duration (minutes)</Label>
                <Input
                  id="timerDuration"
                  type="number"
                  min="1"
                  max="60"
                  value={timerDuration === 0 ? '' : timerDuration || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '') {
                      setTimerDuration(''); // Allow empty state
                      return;
                    }
                    const numValue = parseInt(value);
                    if (!isNaN(numValue)) {
                      setTimerDuration(numValue);
                    }
                  }}
                  className="mt-1 w-32"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Range: 1-60 minutes
                </p>
              </div>

              {message && (
                <div className={`text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                  {message}
                </div>
              )}

              <Button
                onClick={handleUpdateConfig}
                disabled={isLoading || !timerDuration || typeof timerDuration === 'string' || timerDuration < 1 || timerDuration > 60}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? 'Updating...' : 'Update Timer Setting'}
              </Button>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="border-2 border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-yellow-800">💡 Important Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-yellow-700">
                <li>• Timer changes will affect new quiz sessions immediately</li>
                <li>• Ongoing quiz sessions will continue with their original timer</li>
                <li>• All changes are logged with timestamps</li>
                <li>• Recommended timer duration: 10-15 minutes for optimal experience</li>
              </ul>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => window.location.href = '/'}
              className="border-gray-300"
            >
              🏠 Back to Quiz
            </Button>
            
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              🚪 Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
