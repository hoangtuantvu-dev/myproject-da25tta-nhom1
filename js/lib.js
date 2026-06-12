<<<<<<< HEAD
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
=======
function createItemV2(obj)
{
    const list = document.getElementById("product-list");

    list.innerHTML += `
        <div class="col-md-4 mb-3 d-flex">

            <div class="card product-item h-100">

                <div class="product-image">
                    <img class="card-img-top"
                         src="${obj.image}"
                         alt="${obj.name}">
                </div>

                <div class="card-body product-info d-flex flex-column">

                    <div class="product-tag">
                        ${obj.tag || ""}
                    </div>

                    <h4 class="card-title">
                        ${obj.name}
                    </h4>

                    <h5 class="card-text">
                        ${obj.price}
                    </h5>

                    <p class="card-text flex-grow-1">
                        ${obj.description}
                    </p>

                    <a href="${obj.linkProduct}"
                       class="card-link">
                        Xem chi tiết
                    </a>

                </div>

            </div>

        </div>
    `;
}
>>>>>>> 0478ffe (First commit)
