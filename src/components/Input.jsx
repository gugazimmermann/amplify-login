import { useState } from 'react';

const Input = ({ type, placeholder, value, handler }) => {
	const [inputType, setInputType] = useState(type);

	function handleChangeInputType() {
		if (inputType === 'password') setInputType('text');
		else if (inputType === 'text') setInputType('password');
	}

	return (
		<div className="relative">
			<input
				type={inputType}
				value={value}
				onChange={(e) => handler(e.target.value)}
				className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-indigo-500 focus:outline-none"
				placeholder={placeholder}
			/>
			{type === 'password' && (
				<button type="button" onClick={() => handleChangeInputType()} className="absolute top-1.5 right-1">
					<i className={`bx bx-${inputType === 'password' ? 'show' : 'hide'} text-slate-400 text-2xl`} />
				</button>
			)}
		</div>
	);
}

export default Input;
