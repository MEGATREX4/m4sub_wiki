import React from 'react';
import type { MDXComponents } from 'mdx/types';
import InfoBlock from './components/InfoBlock';
import StatBox from './components/StatBox';
import Card from './components/Card';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    
    // Custom Components
    InfoBlock: (props: any) => <InfoBlock {...props} />,
    StatBox: (props: any) => <StatBox {...props} />,
    Card: (props: any) => <Card {...props} />,
    
    // Styled HTML Elements
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

    li: ({ children }) => (
      <li className="flex gap-2 items-start">
        <span style={{ color: '#c5629a', flexShrink: 0 }}>▸</span>
        <span>{children}</span>
      </li>
    ),

    blockquote: ({ children }) => (
      <blockquote
        className="my-4 pl-4 border-l-4 italic"
        style={{ borderColor: '#4a1f38', color: '#a0a0a0' }}
      >
        {children}
      </blockquote>
    ),

    code: ({ children, className }: any) => {
      const isInline = !className;
      
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

    a: ({ children, href }: any) => (
      <a
        href={href}
        className="underline hover:opacity-80 transition-opacity"
        style={{ color: '#f390d0' }}
      >
        {children}
      </a>
    ),

    img: ({ src, alt, title }: any) => (
      <figure className="my-6 flex flex-col items-center">
        <img
          src={src}
          alt={alt}
          title={title}
          className="max-w-full "
          style={{ border: '2px solid #4a1f38', imageRendering: 'pixelated' }}
        />
        {alt && (
          <figcaption className="mt-2 text-xs text-gray-400 italic">
            {alt}
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