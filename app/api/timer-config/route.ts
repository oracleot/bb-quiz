import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const CONFIG_FILE_PATH = path.join(process.cwd(), 'admin-config.json');

// Default configuration
const DEFAULT_CONFIG = {
  timerDurationMinutes: 10,
  lastUpdated: new Date().toISOString(),
  updatedBy: 'system'
};

export async function GET() {
  try {
    let config;
    try {
      const configData = await fs.readFile(CONFIG_FILE_PATH, 'utf8');
      config = JSON.parse(configData);
    } catch {
      // If file doesn't exist, return default config
      config = DEFAULT_CONFIG;
    }

    return NextResponse.json({
      timerDurationMinutes: config.timerDurationMinutes || 10
    });

  } catch (error) {
    console.error('Get timer config error:', error);
    return NextResponse.json(
      { timerDurationMinutes: 10 }, // Fallback to default
      { status: 200 }
    );
  }
}
