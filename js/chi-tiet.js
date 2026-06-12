function normalizeText(value) {
    return String(value || '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ');
}

function getProductFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const productName = params.get('name');

    if (!productName || typeof allProduct === 'undefined' || !Array.isArray(allProduct)) {
        return null;
    }

    const normalizedName = normalizeText(productName);

    return allProduct.find((product) => normalizeText(product.name) === normalizedName) || null;
}

function formatPrice(priceText) {
    if (!priceText) {
        return 'Liên hệ';
    }

    return priceText;
}

function renderThumbnails(product, mainImage) {
    const thumbnailImages = document.querySelector('.thumbnail-images');

    if (!thumbnailImages) {
        return;
    }

    const imageSources = [product.image].filter(Boolean);

    thumbnailImages.innerHTML = '';

    imageSources.forEach((src) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = src;
        thumbnail.alt = product.name;
        thumbnail.addEventListener('click', () => {
            mainImage.src = src;
        });
        thumbnailImages.appendChild(thumbnail);
    });
}

function renderProductDetail(product) {
    const mainImage = document.getElementById('mainImage');
    const productName = document.getElementById('productName');
    const rating = document.getElementById('rating');
    const reviews = document.getElementById('reviews');
    const price = document.getElementById('price');
    const discount = document.getElementById('discount');
    const description = document.getElementById('description');
    const detailContent = document.getElementById('detailContent');

    if (!mainImage || !productName || !rating || !reviews || !price || !discount || !description || !detailContent) {
        return;
    }

    mainImage.src = product.image;
    mainImage.alt = product.name;
    productName.textContent = product.name;
    rating.textContent = '⭐ Sản phẩm được đánh giá cao';
    price.textContent = formatPrice(product.price);
    discount.textContent = product.tag;
    description.textContent = product.description;

    renderThumbnails(product, mainImage);

    detailContent.innerHTML = `
        <div class="detail-item"><strong>Tên xe:</strong> ${product.name}</div>
        <div class="detail-item"><strong>Phân loại:</strong> ${product.tag}</div>
        <div class="detail-item"><strong>Giá bán:</strong> ${formatPrice(product.price)}</div>
        <div class="detail-item"><strong>Mô tả:</strong> ${product.description}</div>
        <div class="detail-item"><strong>Tình trạng:</strong> Còn hàng</div>
    `;
}

function renderNotFound() {
    const mainImage = document.getElementById('mainImage');
    const productName = document.getElementById('productName');
    const rating = document.getElementById('rating');
    const reviews = document.getElementById('reviews');
    const price = document.getElementById('price');
    const discount = document.getElementById('discount');
    const description = document.getElementById('description');
    const detailContent = document.getElementById('detailContent');

    if (mainImage) {
        mainImage.src = '../assets/image/rose.jfif';
        mainImage.alt = 'Không tìm thấy sản phẩm';
    }

    if (productName) productName.textContent = 'Không tìm thấy sản phẩm';
    if (rating) rating.textContent = '⭐ 0.0';
    if (reviews) reviews.textContent = '(0 đánh giá)';
    if (price) price.textContent = 'Liên hệ';
    if (discount) discount.textContent = '';
    if (description) description.textContent = 'Vui lòng quay lại danh sách và chọn một sản phẩm hợp lệ.';
    if (detailContent) {
        detailContent.innerHTML = '<p>Không có dữ liệu để hiển thị.</p>';
    }
}

function addToCart() {
    alert('Chức năng thêm vào giỏ đang được phát triển.');
}

function buyNow() {
    alert('Chức năng mua ngay đang được phát triển.');
}

document.addEventListener('DOMContentLoaded', () => {
    const product = getProductFromUrl();

    if (product) {
        renderProductDetail(product);
        return;
    }

    renderNotFound();
});