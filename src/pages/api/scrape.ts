import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  content: string;
};

async function fetchContent(data: { url: string }) {
  return await fetch(data.url).then((res) => res.text());
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'POST') {
    res.status(405).end();
  }

  const data = req.body ? JSON.parse(req.body) : {};
  console.log(data);
  console.log(req.body);
  if (!data.url) {
    res.status(400).end();
  }

  const result = await fetchContent(data);
  console.log(result);

  res.status(200).json({ content: result });
}
