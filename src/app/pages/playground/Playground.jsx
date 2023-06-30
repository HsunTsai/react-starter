import React, { useState } from 'react';
import { Button } from 'antd';

import './playground.scss';

const Playground = () => {
	const [count, setCount] = useState(0);
	return (
		<div className="playground">
			<h1>想玩什麼自己玩</h1>
			<div className="playground__count">{`數字 ${count}`}</div>
			<div className="playground__action">
				<Button className="playground__action__btn" type="primary" onClick={() => setCount(count + 1)}>
					+1
				</Button>
				<Button className="playground__action__btn" type="danger" onClick={() => setCount(count - 1)}>
					-1
				</Button>
			</div>
		</div>
	);
};

Playground.propTypes = {};

export default Playground;
