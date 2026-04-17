import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 📝 学习要点：
 * cn() 是一个工具函数，用于条件性地合并 className
 *
 * 为什么需要这个函数？
 * 1. clsx: 用于条件性地组合 className 字符串
 * 2. tailwind-merge: 用于解决 Tailwind CSS 类名的冲突
 *
 * 例如：cn('px-2', 'px-4') 会返回 'px-4'（后面的覆盖前面的）
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
