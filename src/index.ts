interface LoopyOptions {
  iterations?: number;
  currentIteration?: number;
  delay?: number;
  onLoop?: (i: number) => void;
  onLoopEnd?: () => void;
}

const DEFAULT_OPTIONS: LoopyOptions = {
  iterations: 10,
  currentIteration: 0,
  delay: 0,
  onLoop: () => null,
  onLoopEnd: () => null
};

export class Loopy {
  options: LoopyOptions[];
  paused: boolean;
  queue?: () => void;

  constructor(options: LoopyOptions | LoopyOptions[]) {
    this.options = Array.isArray(options)
      ? options.map(opt => ({
          ...DEFAULT_OPTIONS,
          ...opt
        }))
      : [{ ...DEFAULT_OPTIONS, ...options }];

    this.iteration = this.iteration.bind(this);
  }

  iteration(i: number, options: LoopyOptions[]) {
    const opts = options[i];

    const getNextAction = () => {
      if (opts.currentIteration < opts.iterations) {
        opts.onLoop && opts.onLoop(opts.currentIteration);
        opts.currentIteration++;
        if (options[i + 1]) {
          return () => this.iteration(i + 1, options);
        }
        return () => this.iteration(i, options);
      }

      opts.currentIteration = 0;
      opts.onLoopEnd && opts.onLoopEnd();
      return () => this.iteration(i - 1, options);
    };

    if (opts) {
      const next = getNextAction();
      if (this.paused === true) {
        this.queue = next;
        return;
      }
      setTimeout(next, opts.delay);
      return;
    }

    return;
  }

  start() {
    this.paused = false;
    this.iteration(0, this.options);
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
    if (this.queue) {
      this.queue();
    }
    this.queue = null;
  }
}
