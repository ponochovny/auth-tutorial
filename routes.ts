/**
 * An array of routes that accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ['/', '/new-verification']

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
	'/login',
	'/register',
	'/auth-error',
	'/reset-password',
	'/new-password',
]

/**
 * The prefix for authentication routes
 * Routes that start with this prefix are used for API authentication purpose
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth'

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings'
