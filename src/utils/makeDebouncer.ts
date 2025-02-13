const rAF = window.requestAnimationFrame;

/**
 * Creates a container that calls a pending function no more than once per `timeout` milliseconds.
 * New functions can be `queue`d, replacing the pending function if there is one. Execution can also
 * be `cancel`led if you no longer wish the last queued function to run.
 *
 * @param timeout - Number of milliseconds to wait before calling the queued function.
 * @param immediate - If true, run queued function right away if timeout has elapsed and nothing is pending.
 */
export function makeDebouncer(timeout: number, immediate = false) {
  let _deadline: number | null = null;
  let _fn: ((...args: any) => any) | null = null;

  function tick() {
    if (_deadline && _fn) {
      if (_deadline <= Date.now()) {
        _fn();
        _deadline = null;
        _fn = null;
      } else {
        rAF(tick);
      }
    }
  }

  return {
    /**
     * Queue a new function to be called after the timeout, replacing any existing pending function.
     *
     * @param fn - New pending function.
     */
    queue(fn: (...args: any) => any) {
      const now = Date.now();

      if (immediate && !_fn && (!_deadline || _deadline <= now)) {
        fn();
        _deadline = now + timeout;
      } else {
        _deadline = now + timeout;
        _fn = fn;
        rAF(tick);
      }
    },

    /**
     * Cancels the pending function.
     */
    cancel() {
      _deadline = null;
      _fn = null;
    },
  };
}
