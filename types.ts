// FIX: Corrected the type definition for the icon property to resolve type-checking errors.
import React from 'react';

export type AspectRatioOptionValue = "9:16" | "3:4";

export interface AspectRatioOption {
  label: string;
  value: AspectRatioOptionValue;
  icon: React.ReactNode;
}
