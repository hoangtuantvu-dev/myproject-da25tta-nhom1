let currentProduct = null;

function normalizeText(value) {
    return String(value || '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ');
}

function escapeHtml(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function getProductGallery(product) {
    const gallery = [];

    if (Array.isArray(product?.images)) {
        gallery.push(...product.images);
    }

    if (Array.isArray(product?.gallery)) {
        gallery.push(...product.gallery);
    }

    if (product?.image) {
        gallery.push(product.image);
    }

    return [...new Set(gallery.filter(Boolean))];
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

function getRelatedProducts(product) {
    if (!Array.isArray(allProduct)) {
        return [];
    }

    return allProduct
        .filter((item) => item.name !== product.name && normalizeText(item.tag) === normalizeText(product.tag))
        .slice(0, 4);
}

function parsePriceValue(priceText) {
    const numericText = String(priceText || '').replace(/[^\d]/g, '');
    const value = Number.parseInt(numericText, 10);

    return Number.isNaN(value) ? null : value;
}

function getComparisonTarget(product) {
    const comparisonSelect = document.getElementById('comparisonTarget');

    if (!comparisonSelect || !comparisonSelect.value) {
        return null;
    }

    if (!Array.isArray(allProduct)) {
        return null;
    }

    const normalizedValue = normalizeText(comparisonSelect.value);

    return allProduct.find((item) => normalizeText(item.name) === normalizedValue && item.name !== product.name) || null;
}

function updateStatus(text) {
    const shareFeedback = document.getElementById('shareFeedback');

    if (shareFeedback) {
        shareFeedback.textContent = text;
    }
}

function renderThumbnails(product, mainImage) {
    const thumbnailImages = document.querySelector('.thumbnail-images');

    if (!thumbnailImages) {
        return;
    }

    const imageSources = getProductGallery(product);

    thumbnailImages.innerHTML = '';

    if (imageSources.length <= 1) {
        thumbnailImages.style.display = 'none';
    } else {
        thumbnailImages.style.display = 'flex';
    }

    imageSources.forEach((src, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = src;
        thumbnail.alt = `${product.name} - ảnh ${index + 1}`;

        if (index === 0) {
            thumbnail.classList.add('is-active');
        }

        thumbnail.addEventListener('click', () => {
            mainImage.src = src;
            thumbnailImages.querySelectorAll('img').forEach((item) => item.classList.remove('is-active'));
            thumbnail.classList.add('is-active');
        });

        thumbnailImages.appendChild(thumbnail);
    });
}

function renderQuickFacts(product) {
    const quickFacts = document.getElementById('quickFacts');

    if (!quickFacts) {
        return;
    }

    const engineText = product.details?.dongCo || String(product.description || '').match(/\b\d+\s*cc\b/i)?.[0]?.replace(/\s+/g, '') || 'Đang cập nhật';
    const transmissionText = product.details?.hopSo || 'Đang cập nhật';

    quickFacts.innerHTML = `
        <div class="fact-card">
            <span class="fact-label">Danh mục</span>
            <strong>${escapeHtml(product.tag || 'Chưa phân loại')}</strong>
        </div>
        <div class="fact-card">
            <span class="fact-label">Động cơ</span>
            <strong>${escapeHtml(engineText)}</strong>
        </div>
        <div class="fact-card">
            <span class="fact-label">Hộp số</span>
            <strong>${escapeHtml(transmissionText)}</strong>
        </div>
        <div class="fact-card">
            <span class="fact-label">Giá bán</span>
            <strong>${escapeHtml(formatPrice(product.price))}</strong>
        </div>
    `;
}

function renderSpecificationList(product) {
    const specs = [
        ['Động cơ', product.details?.dongCo],
        ['Hộp số', product.details?.hopSo],
        ['Nhiên liệu', product.details?.nhienLieu],
        ['Khởi động', product.details?.khoiDong],
        ['Phân khúc', product.details?.phanKhuc],
        ['Phù hợp', product.details?.phuHop]
    ];

    return `
        <div class="detail-group">
            <h3>Thông số kỹ thuật cơ bản</h3>
            <div class="spec-grid">
                ${specs.map(([label, value]) => `
                    <div class="spec-item">
                        <span>${escapeHtml(label)}</span>
                        <strong>${escapeHtml(value || 'Đang cập nhật')}</strong>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderHighlights(product) {
    const highlights = [];

    if (product.details?.phanKhuc) {
        highlights.push(product.details.phanKhuc);
    }

    if (product.details?.phuHop) {
        highlights.push(product.details.phuHop);
    }

    if (product.description) {
        highlights.push(product.description);
    }

    return `
        <div class="detail-group">
            <h3>Điểm nổi bật</h3>
            <ul class="highlight-list">
                ${highlights.slice(0, 3).map((item) => `<li>${escapeHtml(item)}</li>`).join('') || '<li>Đang cập nhật</li>'}
            </ul>
        </div>
    `;
}

function renderRelatedProducts(product) {
    const relatedProducts = document.getElementById('relatedProducts');

    if (!relatedProducts) {
        return;
    }

    const relatedItems = getRelatedProducts(product);

    if (!relatedItems.length) {
        relatedProducts.innerHTML = '<p class="empty-state">Chưa có sản phẩm cùng phân loại để hiển thị.</p>';
        return;
    }

    relatedProducts.innerHTML = relatedItems.map((item) => `
        <a class="related-card" href="${escapeHtml(item.linkProduct || '#')}">
            <img src="${escapeHtml(item.image || '../assets/image/rose.jfif')}" alt="${escapeHtml(item.name)}">
            <div class="related-card-body">
                <span class="related-tag">${escapeHtml(item.tag || '')}</span>
                <h3>${escapeHtml(item.name || '')}</h3>
                <p>${escapeHtml(item.price || 'Liên hệ')}</p>
            </div>
        </a>
    `).join('');
}

function renderComparisonPanel(product) {
    const comparisonPanel = document.getElementById('comparisonPanel');

    if (!comparisonPanel) {
        return;
    }

    const comparisonTarget = getComparisonTarget(product);

    if (!comparisonTarget) {
        comparisonPanel.innerHTML = '<p class="empty-state">Chọn một xe ở trên để xem đối chiếu.</p>';
        return;
    }

    const fields = [
        ['Tên xe', product.name, comparisonTarget.name],
        ['Phân loại', product.tag || 'Chưa phân loại', comparisonTarget.tag || 'Chưa phân loại'],
        ['Động cơ', product.details?.dongCo || 'Đang cập nhật', comparisonTarget.details?.dongCo || 'Đang cập nhật'],
        ['Hộp số', product.details?.hopSo || 'Đang cập nhật', comparisonTarget.details?.hopSo || 'Đang cập nhật'],
        ['Nhiên liệu', product.details?.nhienLieu || 'Đang cập nhật', comparisonTarget.details?.nhienLieu || 'Đang cập nhật'],
        ['Giá bán', formatPrice(product.price), formatPrice(comparisonTarget.price)],
        ['Phù hợp', product.details?.phuHop || 'Đang cập nhật', comparisonTarget.details?.phuHop || 'Đang cập nhật']
    ];

    const priceLeft = parsePriceValue(product.price);
    const priceRight = parsePriceValue(comparisonTarget.price);
    let priceSummary = 'Giá hiện tại đang được so sánh cùng phân khúc.';

    if (priceLeft !== null && priceRight !== null) {
        const gap = Math.abs(priceLeft - priceRight).toLocaleString('vi-VN');

        if (priceLeft === priceRight) {
            priceSummary = 'Hai mẫu có mức giá tương đương.';
        } else if (priceLeft > priceRight) {
            priceSummary = `${product.name} cao hơn ${comparisonTarget.name} khoảng ${gap}đ.`;
        } else {
            priceSummary = `${comparisonTarget.name} cao hơn ${product.name} khoảng ${gap}đ.`;
        }
    }

    comparisonPanel.innerHTML = `
        <div class="comparison-header">
            <div>
                <span class="comparison-kicker">So sánh nhanh</span>
                <h3>${escapeHtml(product.name)} vs ${escapeHtml(comparisonTarget.name)}</h3>
            </div>
            <p>${escapeHtml(priceSummary)}</p>
        </div>
        <div class="comparison-grid">
            <div class="comparison-col comparison-col-current">
                <span class="comparison-label">Sản phẩm hiện tại</span>
                <strong>${escapeHtml(product.name)}</strong>
            </div>
            <div class="comparison-col comparison-col-target">
                <span class="comparison-label">Sản phẩm đối chiếu</span>
                <strong>${escapeHtml(comparisonTarget.name)}</strong>
            </div>
        </div>
        <div class="comparison-table">
            ${fields.map(([label, leftValue, rightValue]) => `
                <div class="comparison-row">
                    <div class="comparison-field">${escapeHtml(label)}</div>
                    <div class="comparison-value current">${escapeHtml(leftValue)}</div>
                    <div class="comparison-value target">${escapeHtml(rightValue)}</div>
                </div>
            `).join('')}
        </div>
    `;
}

function populateComparisonOptions(product) {
    const comparisonSelect = document.getElementById('comparisonTarget');

    if (!comparisonSelect || !Array.isArray(allProduct)) {
        return;
    }

    comparisonSelect.innerHTML = '<option value="">-- Chọn xe --</option>';

    allProduct
        .filter((item) => item.name !== product.name)
        .forEach((item) => {
            const option = document.createElement('option');
            option.value = item.name;
            option.textContent = `${item.name} - ${item.tag || 'Chưa phân loại'}`;
            comparisonSelect.appendChild(option);
        });
}

function renderProductDetail(product) {
    currentProduct = product;

    const mainImage = document.getElementById('mainImage');
    const productName = document.getElementById('productName');
    const rating = document.getElementById('rating');
    const reviews = document.getElementById('reviews');
    const price = document.getElementById('price');
    const discount = document.getElementById('discount');
    const description = document.getElementById('description');
    const detailContent = document.getElementById('detailContent');
    const productTag = document.getElementById('productTag');
    const stockBadge = document.getElementById('stockBadge');
    const stockBadgeText = document.getElementById('stockBadgeText');
    const breadcrumb = document.getElementById('breadcrumb');

    if (!mainImage || !productName || !rating || !reviews || !price || !discount || !description || !detailContent || !productTag || !stockBadge || !stockBadgeText || !breadcrumb) {
        return;
    }

    const gallery = getProductGallery(product);
    const heroImage = gallery[0] || product.image || '../assets/image/rose.jfif';

    mainImage.src = heroImage;
    mainImage.alt = product.name;
    productName.textContent = product.name;
    rating.textContent = '4.8/5';
    reviews.textContent = '(128 đánh giá)';
    price.textContent = formatPrice(product.price);
    discount.textContent = 'Sản phẩm nổi bật';
    description.textContent = product.description;
    productTag.textContent = product.tag || 'Chưa phân loại';
    stockBadge.textContent = 'Còn hàng';
    stockBadgeText.textContent = 'Còn hàng';
    breadcrumb.textContent = `Danh sách sản phẩm / ${product.tag || 'Sản phẩm'} / ${product.name}`;

    renderThumbnails(product, mainImage);
    renderQuickFacts(product);
    renderRelatedProducts(product);
    populateComparisonOptions(product);
    renderComparisonPanel(product);

    detailContent.innerHTML = `
        <div class="detail-group">
            <h3>Thông tin tổng quan</h3>
            <div class="detail-item"><strong>Tên xe:</strong> ${escapeHtml(product.name)}</div>
            <div class="detail-item"><strong>Phân loại:</strong> ${escapeHtml(product.tag || 'Chưa phân loại')}</div>
            <div class="detail-item"><strong>Giá bán:</strong> ${escapeHtml(formatPrice(product.price))}</div>
            <div class="detail-item"><strong>Mô tả:</strong> ${escapeHtml(product.description || 'Đang cập nhật')}</div>
            <div class="detail-item"><strong>Tình trạng:</strong> Còn hàng</div>
        </div>
        ${renderSpecificationList(product)}
        ${renderHighlights(product)}
    `;

    updateStatus('Chọn ảnh thu nhỏ để xem từng góc nhìn của sản phẩm.');
}

function renderNotFound() {
    currentProduct = null;

    const mainImage = document.getElementById('mainImage');
    const productName = document.getElementById('productName');
    const rating = document.getElementById('rating');
    const reviews = document.getElementById('reviews');
    const price = document.getElementById('price');
    const discount = document.getElementById('discount');
    const description = document.getElementById('description');
    const detailContent = document.getElementById('detailContent');
    const productTag = document.getElementById('productTag');
    const stockBadge = document.getElementById('stockBadge');
    const stockBadgeText = document.getElementById('stockBadgeText');
    const breadcrumb = document.getElementById('breadcrumb');
    const quickFacts = document.getElementById('quickFacts');
    const relatedProducts = document.getElementById('relatedProducts');
    const comparisonPanel = document.getElementById('comparisonPanel');

    if (mainImage) {
        mainImage.src = '../assets/image/rose.jfif';
        mainImage.alt = 'Không tìm thấy sản phẩm';
    }

    if (productName) productName.textContent = 'Không tìm thấy sản phẩm';
    if (rating) rating.textContent = '0.0/5';
    if (reviews) reviews.textContent = '(0 đánh giá)';
    if (price) price.textContent = 'Liên hệ';
    if (discount) discount.textContent = '';
    if (description) description.textContent = 'Vui lòng quay lại danh sách và chọn một sản phẩm hợp lệ.';
    if (productTag) productTag.textContent = '';
    if (stockBadge) stockBadge.textContent = 'Không có dữ liệu';
    if (stockBadgeText) stockBadgeText.textContent = 'Không có dữ liệu';
    if (breadcrumb) breadcrumb.textContent = 'Danh sách sản phẩm / Không tìm thấy';
    if (quickFacts) quickFacts.innerHTML = '<p class="empty-state">Không có thông tin bổ sung để hiển thị.</p>';
    if (relatedProducts) relatedProducts.innerHTML = '<p class="empty-state">Chưa thể gợi ý sản phẩm liên quan.</p>';
    if (comparisonPanel) comparisonPanel.innerHTML = '<p class="empty-state">Chưa có sản phẩm để so sánh.</p>';
    if (detailContent) {
        detailContent.innerHTML = '<p class="empty-state">Không có dữ liệu để hiển thị.</p>';
    }

    updateStatus('Không tìm thấy sản phẩm phù hợp với đường dẫn hiện tại.');
}

function getCartItems() {
    try {
        return JSON.parse(localStorage.getItem('productCart') || '[]');
    } catch (error) {
        return [];
    }
}

function setCartItems(items) {
    localStorage.setItem('productCart', JSON.stringify(items));
}

function saveCurrentProductToCart(quantity) {
    if (!currentProduct) {
        return false;
    }

    const cartItems = getCartItems();
    const existingItem = cartItems.find((item) => item.name === currentProduct.name);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cartItems.push({
            name: currentProduct.name,
            price: currentProduct.price,
            image: currentProduct.image,
            tag: currentProduct.tag,
            linkProduct: currentProduct.linkProduct,
            quantity
        });
    }

    setCartItems(cartItems);
    return true;
}

function getQuantity() {
    const quantityInput = document.getElementById('quantity');
    const quantity = Number.parseInt(quantityInput?.value || '1', 10);

    if (Number.isNaN(quantity) || quantity < 1) {
        return 1;
    }

    return quantity;
}

function changeQuantity(delta) {
    const quantityInput = document.getElementById('quantity');

    if (!quantityInput) {
        return;
    }

    const nextValue = Math.max(1, getQuantity() + delta);
    quantityInput.value = String(nextValue);
}

function addToCart() {
    if (!currentProduct) {
        alert('Vui lòng mở một sản phẩm hợp lệ trước khi thêm vào giỏ.');
        return;
    }

    const quantity = getQuantity();
    saveCurrentProductToCart(quantity);
    updateStatus(`Đã thêm ${quantity} sản phẩm vào giỏ hàng cục bộ.`);
    alert(`Đã thêm ${currentProduct.name} vào giỏ hàng.`);
}

function buyNow() {
    if (!currentProduct) {
        alert('Vui lòng mở một sản phẩm hợp lệ trước khi mua ngay.');
        return;
    }

    const quantity = getQuantity();
    saveCurrentProductToCart(quantity);
    updateStatus('Sản phẩm đã được lưu vào giỏ. Bạn có thể tiếp tục xem các mẫu liên quan bên dưới.');
    alert(`Đã lưu ${currentProduct.name} cho bước mua ngay.`);
}

function goBack() {
    if (window.history.length > 1) {
        window.history.back();
        return;
    }

    window.location.href = '../html/sanphamv2.html';
}

function compareProduct() {
    if (!currentProduct) {
        alert('Vui lòng mở một sản phẩm hợp lệ trước khi so sánh.');
        return;
    }

    const comparisonTarget = getComparisonTarget(currentProduct);
    if (comparisonTarget) {
        renderComparisonPanel(currentProduct);
        updateStatus(`Đang so sánh với ${comparisonTarget.name}.`);
        return;
    }

    const comparisonPanel = document.getElementById('comparisonPanel');
    if (comparisonPanel) {
        comparisonPanel.innerHTML = '<p class="empty-state">Hãy chọn một xe để so sánh.</p>';
    }

    updateStatus('Hãy chọn một xe để so sánh.');
}

document.addEventListener('DOMContentLoaded', () => {
    const product = getProductFromUrl();

    if (product) {
        renderProductDetail(product);
        return;
    }

    renderNotFound();
});