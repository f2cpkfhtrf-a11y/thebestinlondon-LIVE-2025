interface SessionLog {
  loggedFallbacks: Set<string>;
}

// Keep track of what we've logged this session (in-memory only)
let sessionLog: SessionLog = {
  loggedFallbacks: new Set()
};

/**
 * Logs image resolver fallback issues in development only
 * @param resolverType - The type of resolver that fell back
 * @param fallbackLevel - The fallback level (1=primary, 2=secondary, 3=default)
 * @param context - Additional context about the fallback
 */
export function logImageFallback(
  resolverType: string,
  fallbackLevel: number,
  context: {
    originalPath?: string;
    fallbackPath?: string;
    reason?: string;
  } = {}
): void {
  // Only log in development and if we haven't logged this specific fallback before
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  // Only log fallbacks beyond level 2 (meaning we fell back to defaults)
  if (fallbackLevel <= 2) {
    return;
  }

  const logKey = `${resolverType}-${context.originalPath || 'unknown'}`;
  
  if (sessionLog.loggedFallbacks.has(logKey)) {
    return; // Already logged this fallback this session
  }
  
  sessionLog.loggedFallbacks.add(logKey);
  
  console.warn(
    `🖼️ Image resolver fallback detected:\n` +
    `  Type: ${resolverType}\n` +
    `  Level: ${fallbackLevel} (using default)\n` +
    `  Original: ${context.originalPath || 'N/A'}\n` +
    `  Fallback: ${context.fallbackPath || 'N/A'}\n` +
    `  Reason: ${context.reason || 'File not found or invalid'}\n` +
    `\nThis may indicate missing image assets or incorrect paths.`
  );
}

/**
 * Reset the session log (useful for testing)
 */
export function resetImageFallbackLog(): void {
  sessionLog.loggedFallbacks.clear();
}
