import { createGatewayOnEdgeRuntime } from '@lobehub/chat-plugins-gateway';

export const config = {
  runtime: 'edge',
};

const handler = createGatewayOnEdgeRuntime();

export default handler;
