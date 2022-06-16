(function () {
	const attr = {
		link: 'data-toggle-link',
		cover: 'data-toggle-cover',
		content: 'data-toggle-content',
		coverHeight: 'data-toggle-height',
		coverStatic: 'data-toggle-static'
	}


	const activeClass = 'toggle-active';




	function toggleInit(container = document.body) {
		const covers = container.querySelectorAll('[data-toggle-height]');

		for (const i in covers) {
			if (!covers.hasOwnProperty(i)) continue;

			const toggleCover = covers[i];
			toggleCover.classList.add('no-transition');
			setToggle(false, false, toggleCover);
			toggleCover.classList.remove('no-transition');

		}
	}

	function toggle(toggleId, toggleLink) {
		const id = toggleLink ? (toggleLink.getAttribute(attr.link) ? toggleLink.getAttribute(attr.link) : toggleId) : toggleId;

		const toggleCover = document.getElementById(id) ||
			(toggleLink ? toggleLink.closest('[' + attr.cover + ']').querySelector('[' + attr.content + ']') : null) ||
			(toggleLink ? toggleLink.closest('[' + attr.cover + ']') : null);



		if (!toggleCover) {
			console.error('toggleCover not found!');
			return;
		}

		toggleCover.classList.toggle(activeClass);

		setToggle(toggleLink, id, toggleCover);
	}

	function setToggle(toggleLink, toggleId, toggleCover) {

		const isActive = () => toggleCover.classList.contains(activeClass);

		document.removeEventListener('click', hideOnClick);
		!(toggleCover.getAttribute(attr.coverStatic) !== null) && isActive() ? document.addEventListener('click', hideOnClick) : null;

		// window.removeEventListener('scroll', hideOnScroll);
		// !toggleCover.dataset.toggleStatic && isActive() ? window.addEventListener('scroll', hideOnScroll) : null;


		if (toggleLink)
			isActive() ?
				toggleLink.classList.add(activeClass) :
				toggleLink.classList.remove(activeClass);


		if (toggleCover.closest('[' + attr.cover + ']'))
			isActive() ?
				toggleCover.closest('[' + attr.cover + ']').classList.add(activeClass) :
				toggleCover.closest('[' + attr.cover + ']').classList.remove(activeClass);


		const openHeight = () => {
			const height = toggleCover.getAttribute(attr.coverHeight);
			if (toggleCover.classList.contains('no-transition')) {
				toggleCover.style.height = ''
				toggleCover.style.overflow = 'visible'
				return
			}
			console.dir(toggleCover);
			toggleCover.style.height = isNaN(parseInt(height)) ? '0px' : parseInt(height) + 'px';
			toggleCover.style.transition = toggleCover.scrollHeight / 2 + 'ms ease';
			setTimeout(() => toggleCover.style.height = toggleCover.scrollHeight + 'px', 10);
			setTimeout(() => isActive() ? toggleCover.style.height = '' : null, 10 + toggleCover.scrollHeight);
			setTimeout(() => isActive() ? toggleCover.style.overflow = 'visible' : null, 10 + toggleCover.scrollHeight / 2);
		}
		const closeHeight = () => {
			const height = toggleCover.getAttribute(attr.coverHeight);
			if (toggleCover.classList.contains('no-transition')) {
				toggleCover.style.height = isNaN(parseInt(height)) ? '0px' : parseInt(height) + 'px'
				toggleCover.style.overflow = 'hidden';
				return
			}
			toggleCover.style.height = toggleCover.scrollHeight + 'px';
			toggleCover.style.overflow = 'hidden';
			setTimeout(() => toggleCover.style.height = isNaN(parseInt(height)) ? '0px' : parseInt(height) + 'px', 10);
		}

		if (toggleCover.getAttribute(attr.coverHeight) !== null && isActive()) openHeight()
		if (toggleCover.getAttribute(attr.coverHeight) !== null && !isActive()) closeHeight();





		if (!isActive()) {
			const links = document.querySelectorAll('[' + attr.link + '=' + toggleId + '].' + activeClass);
			for (const i in links) {
				if (!links.hasOwnProperty(i)) continue;
				links[i].classList.remove(activeClass);
			}
		}




		const isChild = (child, parent) => child === parent || parent.contains(child);

		function hideOnClick(event) {
			const onCover = isChild(event.target, toggleCover);
			const onLink = toggleLink ? isChild(event.target, toggleLink) : false;

			if (onCover) return;
			if (onLink) return;

			isActive() ? toggle(toggleId, toggleLink) : null;
			document.removeEventListener('click', hideOnClick);

		}

		let observer = new MutationObserver(() => {
			if (!isActive()) {
				document.removeEventListener('click', hideOnClick);
				observer.disconnect();
			}
		});
		observer.observe(toggleCover, {
			attributes: true
		});

		var eventType = isActive() ? 'toggleopen' : 'toggleclose';
		var customEvent = new CustomEvent(eventType, {
			bubbles: true,
			cancelable: true,
			detail: {
				target: toggleCover,
				link: toggleLink
			}
		});


		toggleCover.dispatchEvent(customEvent);
		if (toggleLink) toggleLink.dispatchEvent(customEvent);
	}

	function onClick(event) {
		const link = event.target.closest('[' + attr.link + ']');
		if (link) toggle(null, link);
	}

	if (!!document.body) {
		toggleInit();
	} else {
		window.addEventListener('load', () => toggleInit())
	}
	document.addEventListener('click', onClick);


	window.Toggle = {
		init: toggleInit,
		toggle
	};

})()