export const SCROLL_OFFSET_FACTOR = 1.75;

export function sleep(milliseconds: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}
