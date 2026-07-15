import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';

export function remarkInfobox() {
  return (tree: Root) => {
    visit(tree, 'html', (node: any) => {
      // Match opening <Infobox tag
      const openingMatch = node.value.match(/^<Infobox\s+([^>]*?)>/);
      
      if (openingMatch) {
        // Convert to JSX element node
        node.type = 'mdxJsxFlowExpression';
        node.data = {
          estree: {
            type: 'Program',
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'JSXElement',
                  openingElement: {
                    type: 'JSXOpeningElement',
                    name: { type: 'JSXIdentifier', name: 'Infobox' },
                    attributes: parseAttributes(openingMatch[1]),
                    selfClosing: false
                  },
                  children: [],
                  closingElement: null
                }
              }
            ],
            sourceType: 'module'
          }
        };
      }

      // Match self-closing <Infobox />
      const selfClosingMatch = node.value.match(/^<Infobox\s+([^>]*?)\s*\/>/);
      if (selfClosingMatch) {
        node.type = 'mdxJsxFlowExpression';
        node.data = {
          estree: {
            type: 'Program',
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'JSXElement',
                  openingElement: {
                    type: 'JSXOpeningElement',
                    name: { type: 'JSXIdentifier', name: 'Infobox' },
                    attributes: parseAttributes(selfClosingMatch[1]),
                    selfClosing: true
                  },
                  children: [],
                  closingElement: null
                }
              }
            ],
            sourceType: 'module'
          }
        };
      }
    });
  };
}

function parseAttributes(attrString: string) {
  const attributes: any[] = [];
  const attrRegex = /(\w+)=["']([^"']*)["']/g;
  let match;

  while ((match = attrRegex.exec(attrString)) !== null) {
    attributes.push({
      type: 'JSXAttribute',
      name: { type: 'JSXIdentifier', name: match[1] },
      value: {
        type: 'Literal',
        value: match[2]
      }
    });
  }

  return attributes;
}