import {
  BeautifulMentionNode,
  type SerializedBeautifulMentionNode,
  type BeautifulMentionComponentProps,
} from 'lexical-beautiful-mentions';
import { type ElementType, type JSX } from 'react';
import { MentionContainer } from './container';

export class MentionNode extends BeautifulMentionNode {
  static override getType(): string {
    return 'custom-beautifulMention';
  }
  static override clone(node: MentionNode): MentionNode {
    return new MentionNode(
      node.getTrigger(),
      node.getValue(),
      node.getData(),
      node.__key
    );
  }
  static override importJSON(
    serialized: SerializedBeautifulMentionNode
  ): MentionNode {
    return new MentionNode(
      serialized.trigger,
      serialized.value,
      serialized.data
    );
  }
  override exportJSON(): SerializedBeautifulMentionNode {
    return {
      ...super.exportJSON(),
      type: MentionNode.getType(),
    };
  }
  override component(): ElementType<BeautifulMentionComponentProps> | null {
    return null;
  }
  override decorate(): JSX.Element {
    return (
      <MentionContainer
        nodeKey={this.getKey()}
        trigger={this.getTrigger()}
        value={this.getValue()}
        data={this.getData()}
      />
    );
  }
}
