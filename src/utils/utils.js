const appendQueryParameter =(type, value)=> {
	const url = new URL(window.location);
	url.searchParams.set(type, value);
	window.history.pushState({}, '', url);
}

export { appendQueryParameter };