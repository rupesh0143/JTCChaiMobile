const IS_DEBUG = __DEV__;

export const logger = {
  log: (message: string, data?: any) => {
    if (IS_DEBUG) {
      console.log(`[LOG][${new Date().toISOString()}] ${message}`, data ? JSON.stringify(data, null, 2) : '');
    }
  },
  error: (errorMessage: string, error?: any) => {
    if (IS_DEBUG) {
      console.error(`[ERROR][${new Date().toISOString()}] ${errorMessage}`, error || '');
    }
    // Pro-Tip: Here is where you eventually plug in crashService.ts (e.g., Sentry / Crashlytics) for production.
  }
};