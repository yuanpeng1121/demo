import { NEW_CREATE, CLICK_MENU,GET_DEVICE } from "./constants.js";

export const createNew = (list) => {
  return {
    type: NEW_CREATE,
    list,
  };
};

export const clickMenu = (member) => ({
  type: CLICK_MENU,
  member,
});

export const getDevice = (device) => ({
  type: GET_DEVICE,
  device,
})

