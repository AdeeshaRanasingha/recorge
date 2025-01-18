let currentProduct = {};

        function showModal(title, image, code, price, stock, description) {
            currentProduct = { title, image, code, price, stock };
            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalImage').src = image;
            document.getElementById('modalCode').textContent = `Item Code: ${code}`;
            document.getElementById('priceValue').textContent = price;
            document.getElementById('modalStock').textContent = stock;
            document.getElementById('modalDescription').textContent = description;
            document.getElementById('productModal').style.display = 'flex';
        }

        function closeModal() {
            document.getElementById('productModal').style.display = 'none';
        }

        function updatePrice() {
            const quantity = parseInt(document.getElementById('quantity').value, 10) || 1;
            const totalPrice = currentProduct.price * quantity;
            document.getElementById('priceValue').textContent = totalPrice.toFixed(2);
        }

        function addToCart() {
            const quantity = parseInt(document.getElementById('quantity').value, 10);
            if (quantity < 1) {
                alert('Please select a valid quantity.');
                return;
            }

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            const existingItem = cart.find(item => item.code === currentProduct.code);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ ...currentProduct, quantity });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${currentProduct.title} has been added to the cart.`);
            closeModal();
        }