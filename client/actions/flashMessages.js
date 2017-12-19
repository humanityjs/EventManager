import { ADD_FLASH_MESSAGE } from './types';

export function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message,
  };
}

export function deleteFlashMessage(id) {
  return {
    type: DEL_FLASH_MESSAGE,
    id,
  };
}
