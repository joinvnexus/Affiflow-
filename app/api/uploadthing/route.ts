import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

// Export routes for Next.js
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  // Apply any configuration options
  // config: { ... },
});