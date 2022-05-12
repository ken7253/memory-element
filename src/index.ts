import defaultConfig, { Config } from "./util/defaultConfig";

interface MemoryItem {
  data: Element;
  extension?: {
    changed: Partial<Element>;
  };
}

/**
 * MemoryElement
 */
export default class MemoryElement {
  readonly env: Required<Config>;

  readonly observeTarget: Element;

  memory: MemoryItem[];

  constructor(element: Element, config: Partial<Config>) {
    this.observeTarget = element;
    this.env = {
      ...defaultConfig,
      ...config,
    };
    this.memory = [];
  }

  take() {
    const order = this.env.record.order;
    if (order === "ascending") {
      this.memory.push({ data: this.observeTarget });
    } else {
      this.memory.unshift({ data: this.observeTarget });
    }
    this.memory.length = this.env.record.maxLength;;
  }

  clear() {
    this.memory = [];
  }
}
