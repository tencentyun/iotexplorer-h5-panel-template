type RetryOptions = {
  /**
   * 重试次数
   */
  times?: number
  /**
   * 间隔多久重试
   */
  delay?: number
}

export function retry(fn, options: RetryOptions) {
  let { times = 3 } = options;
  const { delay = 1000 } = options;
  return new Promise((resolve, reject) => {
    const tryOnce = () => {
      fn()
        .then(resolve)
        .catch((err) => {
          times -= 1;
          if (times > 0) {
            setTimeout(() => {
              tryOnce();
            }, delay);
            return;
          }
          reject(err);
        });
    };
    return tryOnce();
  });
}