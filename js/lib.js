function createItemV2(obj)
{
    const list = document.getElementById("product-list");

	if (!list || !obj) {
		return;
	}

	const imageSrc = obj.image || "../assets/image/rose.jfif";
	const productName = obj.name || "Sản phẩm";
	const productPrice = obj.price || "Liên hệ";
	const productDescription = obj.description || "";
	const productTag = obj.tag || "";
	const productLink = obj.linkProduct || "#";

	list.insertAdjacentHTML("beforeend", `
        <div class="col-md-4 mb-3 d-flex">

            <div class="card product-item h-100">

                <div class="product-image">
                    <img class="card-img-top"
						 src="${imageSrc}"
						 alt="${productName}"
						 loading="lazy">
                </div>

                <div class="card-body product-info d-flex flex-column">

                    <div class="product-tag">
						${productTag}
                    </div>

                    <h4 class="card-title">
						${productName}
                    </h4>

                    <h5 class="card-text">
						${productPrice}
                    </h5>

                    <p class="card-text flex-grow-1">
						${productDescription}
                    </p>

					<a href="${productLink}"
                       class="card-link">
                        Xem chi tiết
                    </a>

                </div>

            </div>

        </div>
	`);
}
