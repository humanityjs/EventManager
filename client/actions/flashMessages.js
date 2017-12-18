import { ADD_FLASH_MESSAGE } from './types.js';

export function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message,
  };
}
