import createMiddleware from 'next-intl/middleware';

import { routing } from './shared/config/navigation';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
