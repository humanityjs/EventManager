import { VIEW_CENTER_SELECTED } from './types';

export function viewCenterSelected(center) {
  return {
    type: VIEW_CENTER_SELECTED,
    center,
  };
}