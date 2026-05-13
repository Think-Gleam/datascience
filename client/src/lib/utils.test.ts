import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('merges multiple class strings', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('handles conditional classes correctly', () => {
    const condition = true;
    const conditionFalse = false;
    expect(cn('base', condition && 'active', conditionFalse && 'inactive')).toBe('base active');
  });

  it('handles arrays of classes', () => {
    expect(cn(['class1', 'class2'], 'class3')).toBe('class1 class2 class3');
  });

  it('handles object notation for classes', () => {
    expect(cn({ 'class1': true, 'class2': false, 'class3': true })).toBe('class1 class3');
  });

  it('merges tailwind classes and resolves conflicts', () => {
    expect(cn('px-2 py-1', 'p-4')).toBe('p-4');
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
    expect(cn('text-sm', 'text-lg')).toBe('text-lg');
  });

  it('handles various combinations of inputs', () => {
    expect(
      cn(
        'base-class',
        true && 'conditional-class',
        { 'object-class': true, 'false-class': false },
        ['array-class-1', 'array-class-2'],
        'p-2',
        'px-4'
      )
    ).toBe('base-class conditional-class object-class array-class-1 array-class-2 p-2 px-4');
  });

  it('ignores null, undefined, and false', () => {
    expect(cn('class1', null, undefined, false, 'class2')).toBe('class1 class2');
  });
});
