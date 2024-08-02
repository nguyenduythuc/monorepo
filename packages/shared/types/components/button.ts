import type {ReactNode} from 'react';
import {IconKeys} from '../../components';
/**
 * This file contains the types and prop-types for Button and IconButton component.
 */
export type colors =
  | 'blueGray'
  | 'gray'
  | 'brown'
  | 'deepOrange'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'lightGreen'
  | 'green'
  | 'teal'
  | 'cyan'
  | 'lightBlue'
  | 'blue'
  | 'indigo'
  | 'deepPurple'
  | 'purple'
  | 'pink'
  | 'red';
// typescript types
export type variant = 'filled' | 'outlined' | 'text' | 'link';
export type size = 'sm' | 'md' | 'lg';
export type color = 'white' | 'black' | colors;
export type fullWidth = boolean;
export type ripple = boolean;
export type className = string;
export type children = ReactNode;
export type loading = boolean;

export interface BaseButtonProps extends React.ComponentProps<'button'> {
  prefixIcon?: IconKeys;
  disabled?: boolean;
  iconColor?: string;
  onPress?: (data: any | undefined) => void;
  variant?: variant;
  size?: size;
  color?: color;
  loading?: boolean;
  children?: children;
  styleTextLeft?: boolean;
}
