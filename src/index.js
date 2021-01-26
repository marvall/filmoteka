import './scss/main.scss';
import { renderHeader } from './js/utils/renderHeader';

// This eventListener observes the evet "changeHistoryEvent". this event is custom, and don't use anythere.
window.addEventListener('changeHistoryEvent', renderHeader);
