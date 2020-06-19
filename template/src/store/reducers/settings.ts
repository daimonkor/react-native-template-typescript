import type { IPayloadAction } from "../store";
import { ACTION_SETTINGS_SAVE, SettingsPayload } from "../actions";

export const defaultSettingsState = {
  distanceOfExamination: 35,
};

export const SettingsReducer = (
  store: Object = defaultSettingsState,
  action: IPayloadAction<SettingsPayload>
): Object => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_SETTINGS_SAVE:
      return { ...store, ...payload };
    default:
      return store;
  }
};
