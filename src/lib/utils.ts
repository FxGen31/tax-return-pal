import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge mutiple classNames
 * @param {ClassValue[]} inputs - list of classNames
 * @returns
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function hypenToTitleCase(str: string): string {
    return str
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
