import type { IPayloadActionFunction } from "../store";
export const ACTION_SETTINGS_SAVE: string = "action/ACTION_SETTINGS_SAVE";

export interface SettingsPayload {
  distanceOfExamination: number | null;
}

export const saveSettings: IPayloadActionFunction<SettingsPayload> = (
  payload: SettingsPayload
) => ({ type: ACTION_SETTINGS_SAVE, payload });
