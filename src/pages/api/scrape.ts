import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NodeHtmlMarkdown } from 'node-html-markdown';

type ResponseData = {
  content: string;
};

export const htmlToMarkdown = (html: string, url: string) => {
  const doc = new JSDOM(html, { url });

  const article = new Readability(doc.window.document).parse();
  const content = NodeHtmlMarkdown.translate(article?.content || '', {});

  return { ...article, content };
};

async function fetchContent(data: { url: string }) {
  try {
    const response = await fetch(data.url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Fetch failed: ${error}`);
    throw error;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'POST') {
    res.status(405).end();
  }

  const data = req.body ? JSON.parse(req.body) : {};
  if (!data.url) {
    res.status(400).end();
  }
  const url = data.url;

  const result = await fetchContent(data);
  const article = htmlToMarkdown(result, url);

  const response = {
    content: article.content,
    title: article?.title,
    url,
    website: article?.siteName,
  };
  res.status(200).json(response);
}
