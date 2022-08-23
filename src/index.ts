import defaultConfig, { Config } from './util/defaultConfig';

interface MemoryItem {
  data: Element;
}

/**
 * MemoryElement
 */
export default class MemoryElement {
  readonly env: Required<Config>;

  readonly observeTarget: Element;

  protected memory: MemoryItem[];

  constructor(element: Element, config: Partial<Config>) {
    this.observeTarget = element;
    this.env = {
      ...defaultConfig,
      ...config,
    };
    this.memory = [];
  }
}
