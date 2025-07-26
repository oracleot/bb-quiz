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

type AdminConfig = typeof DEFAULT_CONFIG;

async function getConfig(): Promise<AdminConfig> {
  try {
    const configData = await fs.readFile(CONFIG_FILE_PATH, 'utf8');
    return JSON.parse(configData);
  } catch {
    // If file doesn't exist, create it with default config
    await fs.writeFile(CONFIG_FILE_PATH, JSON.stringify(DEFAULT_CONFIG, null, 2));
    return DEFAULT_CONFIG;
  }
}

async function saveConfig(config: AdminConfig): Promise<void> {
  await fs.writeFile(CONFIG_FILE_PATH, JSON.stringify(config, null, 2));
}

function validateAdminToken(authHeader: string | null): boolean {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  
  const token = authHeader.substring(7);
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    return decoded.startsWith('admin:');
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!validateAdminToken(authHeader)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const config = await getConfig();
    return NextResponse.json(config);

  } catch (error) {
    console.error('Get config error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!validateAdminToken(authHeader)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { timerDurationMinutes } = await request.json();

    if (typeof timerDurationMinutes !== 'number' || timerDurationMinutes < 1 || timerDurationMinutes > 60) {
      return NextResponse.json(
        { error: 'Timer duration must be between 1 and 60 minutes' },
        { status: 400 }
      );
    }

    const config = await getConfig();
    const updatedConfig = {
      ...config,
      timerDurationMinutes,
      lastUpdated: new Date().toISOString(),
      updatedBy: 'admin'
    };

    await saveConfig(updatedConfig);

    return NextResponse.json({
      success: true,
      config: updatedConfig,
      message: 'Configuration updated successfully'
    });

  } catch (error) {
    console.error('Update config error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
