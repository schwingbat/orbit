/**
 * Creates a container that calls a pending function no more than once per `timeout` milliseconds.
 * New functions can be `queue`d, replacing the pending function if there is one. Execution can also
 * be `cancel`led if you no longer wish the last queued function to run.
 *
 * @param timeout - Number of milliseconds to wait before calling the queued function.
 * @param immediate - If true, run queued function right away if timeout has elapsed and nothing is pending.
 */
export function makeDebouncer(timeout: number, immediate = false) {
  let pending: number | undefined;

  return {
    /**
     * Queue a new function to be called after the timeout, replacing any existing pending function.
     *
     * @param fn - New pending function.
     */
    queue(fn: (...args: any) => any) {
      const callNow = immediate && !pending;

      window.clearTimeout(pending);

      pending = window.setTimeout(() => {
        if (!callNow) fn();
        pending = undefined;
      }, timeout);

      if (callNow) fn();
    },

    /**
     * Cancels the pending function.
     */
    cancel() {
      window.clearTimeout(pending);
      pending = undefined;
    },
  };
}
