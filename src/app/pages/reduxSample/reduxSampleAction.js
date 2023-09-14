import { getIntl } from '../../IntlGlobalProvider';
import { openNotificationWithIcon } from '../../utils/notification';

export const COUNT_CHANGE = 'COUNT_CHANGE';

export const countUp = count => dispatch => {
	if (count < 5) {
		dispatch({
			type: COUNT_CHANGE,
			payload: { count: count + 1 },
		});
	} else {
		openNotificationWithIcon('error', 'Stop', getIntl().formatMessage({ id: 'bigger.than.five.hint' }));
	}
};

export const countDown = count => dispatch => {
	if (count > 0) {
		dispatch({
			type: COUNT_CHANGE,
			payload: { count: count - 1 },
		});
	} else {
		openNotificationWithIcon('error', 'Stop', getIntl().formatMessage({ id: 'smaller.than.zero.hint' }));
	}
};
