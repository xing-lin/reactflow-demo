import { $createTextNode, $isElementNode, type LexicalNode } from 'lexical';
import { $isBeautifulMentionNode } from 'lexical-beautiful-mentions';
import { MentionNode } from './mention';

export enum MENTION_TRIGGER {
  SLASH = '/',
}

export function getMentionsTextContent(node: LexicalNode): string {
  let result = '';

  if ($isElementNode(node)) {
    const children = node.getChildren();
    for (const child of children) {
      result += getMentionsTextContent(child);
    }
  } else if ($isBeautifulMentionNode(node)) {
    result += wrapWithBraces(node.getTextContent());
  } else {
    result += node.getTextContent();
  }

  return result;
}

function wrapWithBraces(input: string) {
  if (!input) {
    return input;
  }
  const name = input.startsWith(MENTION_TRIGGER.SLASH) ? input.slice(1) : input;
  return `{{${name}}}`;
}

export function normalizedBraces(value: string) {
  return value.replace(/\{\{(.+?)\}\}/g, (_, p1) => `/${p1}`);
}

function splitTemplates(str: string): string[] {
  return str.split(/(\{\{[^}]*\}\})/g).filter(Boolean);
}

export function convertToMentionNodes(text: string) {
  const parts = splitTemplates(text);

  return parts.map((part) => {
    if (part.startsWith('{{') && part.endsWith('}}')) {
      const value = part.slice(2, -2);
      const trigger = '/';
      const data = {};

      return new MentionNode(trigger, value, data);
    } else {
      // 普通文本
      return $createTextNode(part);
    }
  });
}
