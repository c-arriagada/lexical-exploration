import { DecoratorNode } from "lexical";
import type { NodeKey, SerializedLexicalNode, Spread } from "lexical";
import React from "react";

export type SerializedImageNode = Spread<
  {
    altText: string;
    key?: NodeKey;
    src: string;
    type: "image";
    version: 1;
  },
  SerializedLexicalNode
>;

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src;
  __altText;

  static getType() {
    return "image";
  }

  static clone(node: ImageNode) {
    return new ImageNode(node.__src, node.__altText, node.__key);
  }

  constructor(src: string, altText: string, key?: NodeKey) {
    super(key);
    this.__src = src;
    this.__altText = altText;
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { altText, src } = serializedNode;
    const node = $createImageNode(src, altText);
    return node;
  }

  exportJSON(): SerializedImageNode {
    return {
      altText: this.getAltText(),
      src: this.getSrc(),
      type: "image",
      version: 1,
    };
  }

  createDOM() {
    const span = document.createElement("span"); // return a wrapper not an <img>
    // span.src = this.__src;
    // span.alt = this.__alt;
    // span.style.maxWidth = "100%";
    return span;
  }

  updateDOM() {
    return false;
  }

  getAltText(): string {
    return this.__altText;
  }

  getSrc(): string {
    return this.__src;
  }

  decorate() {
    return (
      <img
        src={this.__src}
        alt={this.__altText}
        style={{
          maxWidth: "100%",
          maxHeight: "400px",
          height: "auto",
          objectFit: "contain", // maintains aspect ratio
        }}
      />
    );
  }
}

export function $createImageNode(
  src: string,
  altText: string = "",
  key?: NodeKey
) {
  return new ImageNode(src, altText, key);
}
