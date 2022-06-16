(function () {
	const attr = {
		link: 'data-tab-link',
		content: 'data-tab-content',
		cover: 'data-tab-cover',
		plate: 'data-tab-plate'
	}

	const activeClass = 'tab-active';

	function tabInit(container = document.body) {
		const covers = container.querySelectorAll('[' + attr.cover + ']');


		for (let i in covers) {
			if (!covers.hasOwnProperty(i)) continue;

			const cover = covers[i];
			const contents = [...cover.querySelectorAll('[' + attr.content + ']')]
				.filter((item) => item.closest('[' + attr.cover + ']') == cover)
			const links = [...cover.querySelectorAll('[' + attr.link + ']')]
				.filter((item) => item.closest('[' + attr.cover + ']') == cover)

			const activeElement =
				contents.find((item) => item.classList.contains(activeClass)) ||
				links.find((item) => item.classList.contains(activeClass)) ||
				contents[0] ||
				links[0];


			const id = activeElement.getAttribute(attr.link) || activeElement.getAttribute(attr.content);

			links.map((elem) => {
				elem.getAttribute(attr.link) != id ?
					elem.classList.remove(activeClass) :
					elem.classList.add(activeClass);
			})

			contents.map((elem) => {
				elem.getAttribute(attr.content) != id ?
					elem.classList.remove(activeClass) :
					elem.classList.add(activeClass);
			})


			const plate = cover.querySelector('[' + attr.plate + ']');
			if (!plate || plate.closest('[' + attr.cover + ']') != cover) continue;
			const firstActiveLink = cover.querySelector('[' + attr.link + '="' + id + '"]');
			plate.style.left = firstActiveLink.offsetLeft + 'px';
			plate.style.width = firstActiveLink.getBoundingClientRect().width + 'px';
		}



	}


	function tabOnClick(link) {

		const id = link.getAttribute(attr.link);
		const cover = link.closest('[' + attr.cover + ']');

		const activeLink = [...cover.querySelectorAll('[' + attr.link + '="' + id + '"]')];
		const activecontent = [...cover.querySelectorAll('[' + attr.content + '="' + id + '"]')];

		const oldLink = [...cover.querySelectorAll('[' + attr.link + '].' + activeClass)];
		const oldContent = [...cover.querySelectorAll('[' + attr.content + '].' + activeClass)];


		oldLink ? oldLink
			.filter((item) => item.closest('[' + attr.cover + ']') == cover)
			.map((item) => item.classList.remove(activeClass)) : null;
		oldContent ? oldContent
			.filter((item) => item.closest('[' + attr.cover + ']') == cover)
			.map((item) => item.classList.remove(activeClass)) : null;


		activeLink ? activeLink
			.filter((item) => item.closest('[' + attr.cover + ']') == cover)
			.map((item) => item.classList.add(activeClass)) : null;
		activecontent ? activecontent
			.filter((item) => item.closest('[' + attr.cover + ']') == cover)
			.map((item) => item.classList.add(activeClass)) : null;



		const customEvent = new CustomEvent('tabchange', {
			bubbles: true,
			cancelable: true,
			detail: {
				target: cover,
				cover: cover,
				content: activecontent
			}
		});


		cover.dispatchEvent(customEvent);


		const plate = cover.querySelector('[' + attr.plate + ']');
		if (!plate || plate.closest('[' + attr.cover + ']') != cover) return;
		const firstActiveLink = activeLink[0];
		plate.style.left = firstActiveLink.offsetLeft + 'px';
		plate.style.width = firstActiveLink.getBoundingClientRect().width + 'px';
	}

	if (!!document.body) {
		tabInit();
	} else {
		window.addEventListener('DOMContentLoaded', () => tabInit())
	}

	document.addEventListener('click', function (event) {
		const link = event.target.closest('[' + attr.link + ']');
		if (link) tabOnClick(link);
	})




	function onResize() {
		const covers = document.querySelectorAll('[' + attr.cover + ']');

		for (let i in covers) {
			if (!covers.hasOwnProperty(i)) continue;

			const cover = covers[i];
			const activeElement =
				cover.querySelector('[' + attr.link + '].' + activeClass) ||
				cover.querySelector('[' + attr.content + '].' + activeClass) ||
				cover.querySelector('[' + attr.link + ']');

			const id = activeElement.getAttribute(attr.link) || activeElement.getAttribute(attr.content);

			const plate = cover.querySelector('[' + attr.plate + ']');
			if (!plate || plate.closest('[' + attr.cover + ']') != cover) continue;
			const firstActiveLink = cover.querySelector('[' + attr.link + '="' + id + '"]');
			plate.style.left = firstActiveLink.offsetLeft + 'px';
			plate.style.width = firstActiveLink.getBoundingClientRect().width + 'px';
		}
	}
	window.addEventListener('resize', () => setTimeout(onResize, 250));


	window.Tab = {
		init: tabInit
	};
})();