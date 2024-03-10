import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  res.status(200).json({
    $schema: '../node_modules/@lobehub/chat-plugin-sdk/schema.json',
    api: [
      {
        description: '提取网页内容',
        name: 'getWebsiteContent',
        parameters: {
          properties: {
            url: {
              description: '网页链接',
              type: 'string',
            },
          },
          required: ['url'],
          type: 'object',
        },
        url: `${baseUrl}/api/scrape`,
      },
    ],
    author: 'LeoQuote',
    createAt: '2024-03-09',
    gateway: `${baseUrl}/api/gateway`,
    homepage: 'https://github.com/LeoQuote/lobe-webcrawer-self-host',
    identifier: 'website-crawler-self-host',
    meta: {
      avatar: '🕸',
      description: 'Extract content from web links',
      tags: ['web', 'content-crawler'],
      title: 'Website Crawler',
    },
    version: '1',
  });
}
