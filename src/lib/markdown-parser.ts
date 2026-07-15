import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { remarkInfobox } from './remark-infobox';
import type { Components } from 'react-markdown';

interface MarkdownParserProps {
  content: string;
  customComponents?: any;
}

export function parseMarkdownWithComponents(
  content: string,
  components: any
) {
  return ReactMarkdown({
    children: content,
    remarkPlugins: [remarkGfm, remarkInfobox],
    components: {
      ...components
    }
  });
}