import React from 'react';
import { type AspectRatioOption } from './types';
import { MobileIcon } from './components/icons';

export const ASPECT_RATIO_OPTIONS: AspectRatioOption[] = [
  // FIX: Using JSX syntax (<MobileIcon />) in a .ts file causes a TypeScript parsing error.
  // Replaced with React.createElement to correctly create the element.
  { label: '9:16', value: '9:16', icon: React.createElement(MobileIcon) },
  // FIX: Using JSX syntax (<MobileIcon />) in a .ts file causes a TypeScript parsing error.
  // Replaced with React.createElement to correctly create the element.
  { label: '3:4', value: '3:4', icon: React.createElement(MobileIcon) },
];
