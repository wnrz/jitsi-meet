// @flow

import { toState } from '../base/redux';
import { getAppProp } from '../base/app';


// import { sendEvent } from './../mobile/external-api/functions';
import { NativeModules } from 'react-native';
// import '../mobile/external-api';
// import { sendEvent } from '../mobile/external-api';

/**
 * Returns true if the filmstrip on mobile is visible, false otherwise.
 *
 * NOTE: Filmstrip on mobile behaves differently to web, and is only visible
 * when there are at least 2 participants.
 *
 * @param {Object | Function} stateful - The Object or Function that can be
 * resolved to a Redux state object with the toState function.
 * @returns {boolean}
 */
var num = 0;
export function isFilmstripVisible(stateful: Object | Function) {
    const state = toState(stateful);
    const { length: participantCount } = state['features/base/participants'];
    if (num != participantCount){
        num = participantCount;
        //获取房间人数
        console.info(`participantCount${participantCount}!!!!!!!!!!!!!!!!!!!!!!!!!!`);
        const externalAPIScope = getAppProp(stateful ,"externalAPIScope");
        
        externalAPIScope
        && NativeModules.ExternalAPI.sendEvent("PARTICIPANT_COUNT", {"participantCount":num}, externalAPIScope);

    }
        return participantCount > 1;
    }
