let cart = JSON.parse(localStorage.getItem('cart')) || [];

        function renderCart() {
            const cartItemsContainer = document.getElementById('cartItemsContainer');
            const cartItemTemplate = document.getElementById('cartItemTemplate');
            cartItemsContainer.innerHTML = '';

            let totalItems = 0;
            let totalPrice = 0;

            cart.forEach(item => {
                const cartItem = cartItemTemplate.cloneNode(true);
                cartItem.style.display = 'flex';

                cartItem.querySelector('.cart-item-image').src = item.image;
                cartItem.querySelector('.cart-item-title').textContent = item.title;
                cartItem.querySelector('.cart-item-code').textContent = `Item Code: ${item.code}`;
                cartItem.querySelector('.cart-item-quantity').textContent = `Quantity: ${item.quantity}`;

                const itemPrice = (parseFloat(item.price) * parseInt(item.quantity)).toFixed(2);
                cartItem.querySelector('.cart-item-price').textContent = `Price: $${itemPrice}`;

                cartItemsContainer.appendChild(cartItem);

                totalItems += parseInt(item.quantity);
                totalPrice += parseFloat(item.price) * parseInt(item.quantity);
            });

            document.getElementById('totalItems').textContent = totalItems;
            document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
        }

        function removeItem(button) {
            const cartItemElement = button.closest('.cart-item');
            const itemTitle = cartItemElement.querySelector('.cart-item-title').textContent;

            cart = cart.filter(item => item.title !== itemTitle);
            localStorage.setItem('cart', JSON.stringify(cart));

            renderCart();
        }

        function openCheckoutModal() {
            document.getElementById('checkoutModal').style.display = 'flex';
        }

        function closeCheckoutModal() {
            document.getElementById('checkoutModal').style.display = 'none';
        }

        function proceedToCheckout() {
            const name = document.getElementById('customerName').value;
            const address = document.getElementById('customerAddress').value;
            const phone = document.getElementById('customerPhone').value;
            const couponCode = document.getElementById('couponCode').value;

            if (!name || !address || !phone) {
                alert('Please fill in all fields.');
                return;
            }

            const whatsappMessage = cart.map(item => {
                const itemPrice = (parseFloat(item.price) * parseInt(item.quantity)).toFixed(2);
                return `Item: ${item.title}\nCode: ${item.code}\nQuantity: ${item.quantity}\nPrice: $${itemPrice}`;
            }).join('\n\n');

            const totalPrice = document.getElementById('totalPrice').textContent;

            let message = `Customer Details:\nName: ${name}\nAddress: ${address}\nPhone: ${phone}\n\nOrder Details:\n\n${whatsappMessage}\n\nTotal Price: $${totalPrice}`;

            if (couponCode) {
                message += `\nCoupon Code: ${couponCode}`;
            }

            const whatsappUrl = `https://wa.me/+94762901765?text=${encodeURIComponent(message)}`;

            window.open(whatsappUrl, '_blank').focus();
            closeCheckoutModal();
        }

        renderCart();