import Immutable from 'seamless-immutable';

import { V2V_FETCH_API_INFO, V2V_FETCH_SETTINGS, V2V_PATCH_SETTINGS } from './SettingsConstants';
import { getFormValuesFromApiSettings } from './helpers';

export const initialState = Immutable({
  isFetchingApiInfo: false,
  fetchingApiInfoRejected: false,
  errorFetchingApiInfo: null,
  apiInfo: {},
  isFetchingSettings: false,
  fetchingSettingsRejected: false,
  errorFetchingSettings: null,
  savedSettings: {},
  isSavingSettings: false,
  savingSettingsRejected: false,
  errorSavingSettings: null
});

export default (state = initialState, action) => {
  switch (action.type) {
    case `${V2V_FETCH_API_INFO}_PENDING`:
      return state
        .set('isFetchingApiInfo', true)
        .set('fetchingApiInfoRejected', false)
        .set('errorFetchingApiInfo', null);
    case `${V2V_FETCH_API_INFO}_REJECTED`:
      return state
        .set('isFetchingApiInfo', false)
        .set('fetchingApiInfoRejected', true)
        .set('errorFetchingApiInfo', action.payload);
    case `${V2V_FETCH_API_INFO}_FULFILLED`:
      return state
        .set('isFetchingApiInfo', false)
        .set('fetchingApiInfoRejected', false)
        .set('errorFetchingApiInfo', null)
        .set('apiInfo', action.payload.data);

    case `${V2V_FETCH_SETTINGS}_PENDING`:
      return state
        .set('isFetchingSettings', true)
        .set('fetchingSettingsRejected', false)
        .set('errorFetchingSettings', null);
    case `${V2V_FETCH_SETTINGS}_REJECTED`:
      return state
        .set('isFetchingSettings', false)
        .set('fetchingSettingsRejected', true)
        .set('errorFetchingSettings', action.payload);
    case `${V2V_FETCH_SETTINGS}_FULFILLED`:
      return state
        .set('isFetchingSettings', false)
        .set('fetchingSettingsRejected', false)
        .set('errorFetchingSettings', null)
        .set('savedSettings', getFormValuesFromApiSettings(action.payload.data));

    case `${V2V_PATCH_SETTINGS}_PENDING`:
      return state
        .set('isSavingSettings', true)
        .set('savingSettingsRejected', false)
        .set('errorSavingSettings', null);
    case `${V2V_PATCH_SETTINGS}_REJECTED`:
      return state
        .set('isSavingSettings', false)
        .set('savingSettingsRejected', true)
        .set('errorSavingSettings', action.payload);
    case `${V2V_PATCH_SETTINGS}_FULFILLED`:
      return state
        .set('isSavingSettings', false)
        .set('savingSettingsRejected', false)
        .set('errorSavingSettings', null)
        .set('savedSettings', getFormValuesFromApiSettings(action.payload));

    default:
      return state;
  }
};
