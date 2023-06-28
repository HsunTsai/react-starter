import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { countDown, countUp } from './reduxSampleAction';

import './reduxSample.scss';

const Home = () => {
	const dispatch = useDispatch();
	const { count } = useSelector(state => state?.reduxSample);

	return (
		<div className="reduxSample">
			<h2>這是一個透過redux操作的範例</h2>
			<h3>{`Now Count ==> ${count}`}</h3>
			<div>
				<Button style={{ marginRight: 8 }} onClick={() => dispatch(countUp(count))}>
					Count Up
				</Button>
				<Button onClick={() => dispatch(countDown(count))}>Count Down</Button>
			</div>
		</div>
	);
};

export default Home;
