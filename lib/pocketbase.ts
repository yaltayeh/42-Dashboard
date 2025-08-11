import PocketBase from "pocketbase"

// Environment variables access
declare const process: {
  env: {
    NEXT_PUBLIC_POCKETBASE_URL?: string;
    NEXT_PUBLIC_APP_URL?: string;
    NODE_ENV?: string;
    HOSTNAME?: string;
    DOCKER?: string;
    PWD?: string;
  }
}

// PocketBase configuration for both development and production
const getPocketBaseUrl = () => {
  // For client-side (browser)
  if (typeof window !== 'undefined') {
    // Check if we have a custom URL set and it's not the internal docker service name
    const envUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL
    if (envUrl && !envUrl.includes('pocketbase:')) {
      return envUrl
    }
    
    // For development: use the current origin with port 8090
    if (process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost') {
      return `${window.location.protocol}//${window.location.hostname}:8090`
    }
    
    // For production: use the current domain (PocketBase will add /api)
    return `${window.location.protocol}//${window.location.host}`
  }
  
  // For server-side (SSR)
  // Check if we're running inside Docker (common indicators)
  const isDockerEnvironment = process.env.HOSTNAME === '0.0.0.0' ||
                              process.env.HOSTNAME?.startsWith('nextjs') || 
                              process.env.DOCKER === 'true' ||
                              process.env.NEXT_PUBLIC_APP_URL?.includes('docker') ||
                              process.env.PWD?.includes('/app') ||
                              process.env.NODE_ENV === 'production' ||
                              process.env.NEXT_PUBLIC_POCKETBASE_URL?.includes('pocketbase:')
  
  if (isDockerEnvironment) {
    // Inside Docker, use the service name for container-to-container communication
    console.log('SSR: Detected Docker environment, using pocketbase service')
    return "http://pocketbase:8090"
  }
  
  // For explicit SSR URL set (non-Docker environments)
  const envUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL
  if (envUrl) {
    console.log('SSR: Using NEXT_PUBLIC_POCKETBASE_URL:', envUrl)
    return envUrl
  }
  
  // Local development fallback (outside Docker)
  // console.log('SSR: Using local development URL')
  return "http://127.0.0.1:8090"
}


// Regular PocketBase instance for general use
const pb = new PocketBase(getPocketBaseUrl()).autoCancellation(false);

export { pb }

export default pb;
