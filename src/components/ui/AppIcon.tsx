'use client';

import React from 'react';
import * as Outline from '@heroicons/react/24/outline';
import * as Solid from '@heroicons/react/24/solid';

type IconLib = Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>;

type Props = {
  name: string;
  size?: number;
  variant?: 'outline' | 'solid';
  className?: string;
};

export default function AppIcon({ name, size = 24, variant = 'outline', className }: Props) {
  const lib: IconLib = (variant === 'solid' ? Solid : Outline) as IconLib;
  const Raw = lib[name];
  const Cmp = typeof Raw === 'function' ? Raw : Outline.QuestionMarkCircleIcon;
  return <Cmp width={size} height={size} className={className} />;
}
