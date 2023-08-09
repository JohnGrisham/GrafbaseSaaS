// @ts-nocheck
import create from '@kodingdotninja/use-tailwind-breakpoint';
import tailwindConfig from '../../tailwind.config';

const config = tailwindConfig;

export const { useBreakpoint, useBreakpointEffect, useBreakpointValue } =
  create(config.theme?.screens);
