import { createGatewayOnEdgeRuntime } from '@lobehub/chat-plugins-gateway';

const handler = createGatewayOnEdgeRuntime();

export default async (req: Request) => {
  const res = await handler(req);

  return res;
};
