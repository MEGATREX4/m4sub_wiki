import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import InfoBlock from './InfoBlock';
import StatBox from './StatBox';
import Card from './Card';
import Infobox from './Infobox'; // <--- Новий імпорт

interface MDXContentProps {
  content: string;
}

function parseComponents(content: string): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;

  // Підтримка тегів Card, StatBox, InfoBlock та Infobox
  const componentRegex = /<(Card|StatBox|InfoBlock|Infobox)\s+([^>]*)(?:>([\s\S]*?)<\/\1>|\/?>)/g;
  let match;

  while ((match = componentRegex.exec(content)) !== null) {
    const [fullMatch, componentName, attrs, innerContent] = match;
    const startIndex = match.index;

    if (startIndex > lastIndex) {
      const beforeContent = content.substring(lastIndex, startIndex);
      if (beforeContent.trim()) {
        elements.push(
          <div key={`markdown-${lastIndex}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={getMarkdownComponents()}>
              {beforeContent}
            </ReactMarkdown>
          </div>
        );
      }
    }

    const attrObj: Record<string, any> = {};
    const attrRegex = /(\w+)=["']([^"']*)["']|(\w+)=\{(.*?)\}/g;
    let attrMatch;

    while ((attrMatch = attrRegex.exec(attrs)) !== null) {
      const [, key1, val1, key2, val2] = attrMatch;
      const key = key1 || key2;

      if (key1) {
        attrObj[key] = val1;
      } else if (key2) {
        try {
          attrObj[key] = JSON.parse(val2);
        } catch {
          attrObj[key] = val2;
        }
      }
    }

    if (componentName === 'Card') {
      elements.push(
        <Card key={`Card-${startIndex}`} {...(attrObj as any)}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={getMarkdownComponents()}>
            {innerContent || ''}
          </ReactMarkdown>
        </Card>
      );
    } else if (componentName === 'StatBox') {
      elements.push(
        <StatBox key={`StatBox-${startIndex}`} {...(attrObj as any)} />
      );
    } else if (componentName === 'InfoBlock') {
      elements.push(
        <InfoBlock key={`InfoBlock-${startIndex}`} {...(attrObj as any)}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={getMarkdownComponents()}>
            {innerContent || ''}
          </ReactMarkdown>
        </InfoBlock>
      );
    } else if (componentName === 'Infobox') {
      elements.push(
        <Infobox key={`Infobox-${startIndex}`} {...(attrObj as any)}>
          {innerContent ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={getMarkdownComponents()}>
              {innerContent}
            </ReactMarkdown>
          ) : null}
        </Infobox>
      );
    }

    lastIndex = startIndex + fullMatch.length;
  }

  if (lastIndex < content.length) {
    const remaining = content.substring(lastIndex);
    if (remaining.trim()) {
      elements.push(
        <div key={`markdown-${lastIndex}`}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={getMarkdownComponents()}>
            {remaining}
          </ReactMarkdown>
        </div>
      );
    }
  }

  return elements.length > 0 ? elements : [
    <ReactMarkdown key="main" remarkPlugins={[remarkGfm]} components={getMarkdownComponents()}>
      {content}
    </ReactMarkdown>
  ];
}

function getMarkdownComponents(): Components {
  return {
    h1: ({ children }) => (
      <h1
        className="minecraftFont text-3xl font-bold mt-10 mb-4 pb-3 border-b"
        style={{ color: '#f0d4e6', borderColor: '#4a1f38' }}
      >
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2
        className="minecraftFont text-2xl font-bold mt-9 mb-4 pb-2 border-b"
        style={{ color: '#f390d0', borderColor: '#4a1f38' }}
      >
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="minecraftFont text-xl font-bold mt-7 mb-3" style={{ color: '#c5629a' }}>
        {children}
      </h3>
    ),

    h4: ({ children }) => (
      <h4 className="minecraftFont text-lg font-bold mt-6 mb-2" style={{ color: '#a0498a' }}>
        {children}
      </h4>
    ),

    p: ({ children }) => (
      <p className="mb-4 leading-relaxed" style={{ color: '#d1d5db' }}>
        {children}
      </p>
    ),

    strong: ({ children }) => (
      <strong className="font-bold" style={{ color: '#f390d0' }}>
        {children}
      </strong>
    ),

    em: ({ children }) => (
      <em className="italic" style={{ color: '#c5629a' }}>
        {children}
      </em>
    ),

    ul: ({ children }) => (
      <ul className="mb-4 space-y-1 pl-6" style={{ color: '#d1d5db', listStyleType: 'none' }}>
        {children}
      </ul>
    ),

    ol: ({ children }) => (
      <ol className="mb-4 space-y-1 pl-6" style={{ color: '#d1d5db', listStyleType: 'none' }}>
        {children}
      </ol>
    ),

    li: (props: any) => {
      const { children, node } = props;
      const parent = node?.parent;
      const isOrdered = parent?.type === 'list' && parent?.ordered;
      const listIndex = parent?.children?.indexOf(node) ?? 0;

      return (
        <li className="flex gap-2 items-start">
          <span style={{ color: '#c5629a', flexShrink: 0 }}>
            {isOrdered ? `${listIndex + 1}.` : '▸'}
          </span>
          <span>{children}</span>
        </li>
      );
    },

    blockquote: ({ children }) => (
      <blockquote
        className="my-4 pl-4 border-l-4 italic"
        style={{ borderColor: '#4a1f38', color: '#a0a0a0' }}
      >
        {children}
      </blockquote>
    ),

    code: (props: any) => {
      const { children, className, node } = props;
      const isInline = node?.parent?.type !== 'pre';

      if (isInline) {
        return (
          <code
            className="px-2 py-1  text-sm font-mono"
            style={{ backgroundColor: '#1f0d22', color: '#f390d0' }}
          >
            {children}
          </code>
        );
      }

      return (
        <pre
          className="my-4 p-4  overflow-x-auto"
          style={{ backgroundColor: '#0a0a12', border: '1px solid #4a1f38' }}
        >
          <code className="font-mono text-sm" style={{ color: '#d1d5db' }}>
            {children}
          </code>
        </pre>
      );
    },

    pre: ({ children }) => (
      <pre
        className="my-4 p-4  overflow-x-auto"
        style={{ backgroundColor: '#0a0a12', border: '1px solid #4a1f38' }}
      >
        {children}
      </pre>
    ),

    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table
          className="w-full text-sm border-collapse"
          style={{ border: '1px solid #4a1f38' }}
        >
          {children}
        </table>
      </div>
    ),

    thead: ({ children }) => (
      <thead style={{ background: '#1f0d22' }}>
        {children}
      </thead>
    ),

    tbody: ({ children }) => (
      <tbody>
        {children}
      </tbody>
    ),

    tr: ({ children }) => (
      <tr style={{ borderBottom: '1px solid #2d0f1e' }}>
        {children}
      </tr>
    ),

    th: ({ children }) => (
      <th
        className="px-4 py-3 text-left minecraftFont font-bold border"
        style={{ borderColor: '#4a1f38', color: '#c5629a' }}
      >
        {children}
      </th>
    ),

    td: ({ children }) => (
      <td
        className="px-4 py-2.5 border"
        style={{ borderColor: '#2d0f1e', color: '#d1d5db' }}
      >
        {children}
      </td>
    ),

    a: (props: any) => (
      <a
        href={props.href}
        className="underline hover:opacity-80 transition-opacity"
        style={{ color: '#f390d0' }}
      >
        {props.children}
      </a>
    ),

    img: (props: any) => (
      <figure className="my-6 flex flex-col items-center">
        <img
          src={props.src}
          alt={props.alt}
          title={props.title}
          className="max-w-full "
          style={{ border: '2px solid #4a1f38', imageRendering: 'pixelated' }}
        />
        {props.alt && (
          <figcaption className="mt-2 text-xs text-gray-400 italic">
            {props.alt}
          </figcaption>
        )}
      </figure>
    ),

    hr: () => (
      <hr
        className="my-8"
        style={{ borderColor: '#4a1f38' }}
      />
    ),
  };
}

export default function MDXContent({ content }: MDXContentProps) {
  return (
    <div className="mdx-content">
      {parseComponents(content)}
    </div>
  );
}