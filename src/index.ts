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

  take(): void {
    if (this.env.record.order === 'ascending') {
      const size = this.memory.push({
        data: this.observeTarget,
      });
      if (size > this.env.record.maxLength) {
        this.memory.shift();
      }
    } else {
      // this.env.record.order === 'descending'
      const size = this.memory.unshift({
        data: this.observeTarget,
      });
      if (size > this.env.record.maxLength) {
        this.memory.pop();
      }
    }
  }
}
