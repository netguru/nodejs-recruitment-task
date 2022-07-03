import { MiddlewareConsumer } from "@nestjs/common";

import { UserExtractionMiddleware } from "@app/api/middleware/UserExtractionMiddleware";

export function configureMiddlewares(consumer: MiddlewareConsumer): void {
  consumer.apply(UserExtractionMiddleware).forRoutes("me", "movies");
}
