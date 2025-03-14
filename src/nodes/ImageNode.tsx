import { DecoratorNode } from "lexical";
import React from "react"

export class ImageNode extends DecoratorNode {
  __src;
  __alt;

  static getType() {
    return "image";
  }

  static clone(node) {
    return new ImageNode(node.__src, node.__alt, node.__key);
  }

  constructor(src, alt, key) {
    super(key);
    this.__src = src;
    this.__alt = alt;
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

  decorate() {
    return (
      <img src={this.__src} alt={this.__alt} style={{ maxWidth: "100%" }} />
    );
  }
}

export function $createImageNode(src, alt = "", key=null) {
  return new ImageNode(src, alt, key);
}
