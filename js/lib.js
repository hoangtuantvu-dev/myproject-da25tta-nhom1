document.addEventListener('DOMContentLoaded', () => {
	const modal = document.getElementById('product-modal');
	const modalImage = document.getElementById('product-modal-image');
	const modalTitle = document.getElementById('product-modal-title');
	const modalPrice = document.getElementById('product-modal-price');
	const modalDescription = document.getElementById('product-modal-description');
	const modalLink = document.getElementById('product-modal-link');

	if (!modal) {
		return;
	}

	const openModal = (item) => {
		modalImage.src = item.dataset.image || '';
		modalImage.alt = item.dataset.name || 'Hình sản phẩm';
		modalTitle.textContent = item.dataset.name || '';
		modalPrice.textContent = item.dataset.price || '';
		modalDescription.textContent = item.dataset.description || '';
		modalLink.href = item.dataset.link || '#';
		modal.classList.add('is-open');
		modal.setAttribute('aria-hidden', 'false');
	};

	const closeModal = () => {
		modal.classList.remove('is-open');
		modal.setAttribute('aria-hidden', 'true');
	};

	document.querySelectorAll('.container-item').forEach((item) => {
		item.addEventListener('click', (event) => {
			const clickedLink = event.target.closest('a');
			if (clickedLink) {
				event.preventDefault();
			}
			openModal(item);
		});
	});

	modal.addEventListener('click', (event) => {
		if (event.target.hasAttribute('data-close-modal')) {
			closeModal();
		}
	});

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && modal.classList.contains('is-open')) {
			closeModal();
		}
	});
});
