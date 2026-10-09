# Y-School Demo Store — Functional Requirements

This document describes how the store **is expected to behave**. Treat it as the test oracle: if the application does something different from what is written here, that is a defect worth reporting.

All amounts are in Indian Rupees (₹) and are whole numbers. Displayed amounts use Indian digit grouping, e.g. `₹1,999`.

---

## 1. Product catalogue

The store sells exactly 12 products:

| Product ID            | Name                | Category         | Price  | Stock |
| --------------------- | ------------------- | ---------------- | ------ | ----- |
| `wireless-mouse`      | Wireless Mouse      | Electronics      | ₹899   | 25    |
| `mechanical-keyboard` | Mechanical Keyboard | Electronics      | ₹1,999 | 12    |
| `laptop-stand`        | Laptop Stand        | Electronics      | ₹1,299 | 18    |
| `headphones`          | Headphones          | Electronics      | ₹2,499 | 9     |
| `usb-c-hub`           | USB-C Hub           | Electronics      | ₹2,999 | 14    |
| `smartwatch`          | Smartwatch          | Electronics      | ₹4,999 | 0     |
| `backpack`            | Backpack            | Fashion          | ₹1,499 | 20    |
| `t-shirt`             | T-Shirt             | Fashion          | ₹599   | 40    |
| `coffee-mug`          | Coffee Mug          | Home & Lifestyle | ₹399   | 35    |
| `notebook`            | Notebook            | Home & Lifestyle | ₹199   | 60    |
| `water-bottle`        | Water Bottle        | Home & Lifestyle | ₹699   | 30    |
| `desk-lamp`           | Desk Lamp           | Home & Lifestyle | ₹1,799 | 7     |

- **CAT-1** Each product card shows the image, name, category, price, stock status and an **Add to Cart** button.
- **CAT-2** Stock status reads "In stock", "Only _N_ left" (fewer than 10 in stock) or "Out of stock" (0 in stock).
- **CAT-3** Clicking a product name opens its details page at `/products/<product-id>` with description, highlights, price, stock status and **Add to Cart**.
- **CAT-4** A product that is **out of stock cannot be added to the cart**. Its Add to Cart control must be disabled or otherwise prevent the action.

## 2. Search

- **SRCH-1** The search box filters products by **product name**, matching any part of the name ("board" finds "Mechanical Keyboard").
- **SRCH-2** Search is **case-insensitive**.
- **SRCH-3** **Leading and trailing whitespace is ignored**.
- **SRCH-4** Results update as you type. The text "Showing _X_ of 12 products" reflects the number of visible products.
- **SRCH-5** When no product matches, a clear "No products found" message is shown with a way to reset filters.

## 3. Category filter and sorting

- **FLT-1** The **Category** dropdown offers All categories, Electronics, Fashion and Home & Lifestyle.
- **FLT-2** Choosing a category shows **only** products whose category is exactly that category (see the table above).
- **FLT-3** Search and category filter can be combined.
- **SORT-1** **Price: Low to High** orders products by **numeric** price, cheapest first.
- **SORT-2** **Price: High to Low** orders products by numeric price, most expensive first.
- **SORT-3** **Name: A to Z** orders products alphabetically. **Featured** shows the default catalogue order.
- **FLT-4** **Reset filters** clears the search text, category and sort, showing all 12 products in Featured order.

## 4. Shopping cart

- **CART-1** Clicking **Add to Cart** adds one unit of the product to the cart and shows a confirmation message ("_Product_ added to cart.").
- **CART-2** The cart badge in the header shows the **total number of units** in the cart and **updates immediately** after every add, without navigating or refreshing.
- **CART-3** Adding a product that is already in the cart **does not create a new row**; it increases that row's quantity by one.
- **CART-4** Each row shows name, unit price, quantity controls (− / +), line total (unit price × quantity) and a **Remove** button.
- **CART-5** **+** increases the quantity by one, up to the available stock.
- **CART-6** **−** decreases the quantity by one. The **minimum quantity is 1**: a row can never show a quantity of 0 (either − is disabled at 1, or reaching 0 removes the row).
- **CART-7** **Remove** deletes **only that row**. All other products stay in the cart with their quantities.
- **CART-8** When the cart has no items, an empty-cart message with a "Continue shopping" link is shown.
- **CART-9** The cart is saved in `localStorage` and survives page reloads.

## 5. Pricing, coupons and shipping

The order summary (cart and checkout pages) shows four amounts, in this order: **Subtotal**, **Discount**, **Shipping**, **Total**.

- **PRC-1** **Subtotal** = sum over all rows of (unit price × quantity).
- **CPN-1** The only valid coupon is **`SAVE10`** (case-insensitive, surrounding spaces ignored). It gives a **10 % discount on the subtotal**, rounded to the nearest rupee.
- **CPN-2** Any other non-empty code is **rejected** with an error message. No discount is applied and the order summary does not change.
- **CPN-3** Submitting an empty coupon field shows "Please enter a coupon code."
- **CPN-4** An applied coupon can be removed, which sets the discount back to ₹0.
- **SHP-1** Let _discounted subtotal_ = Subtotal − Discount.
  - If the discounted subtotal is **below ₹3,000**, Shipping is **₹99**.
  - If the discounted subtotal is **₹3,000 or more**, Shipping is **FREE (₹0)**.
  - An empty cart has no shipping charge.
- **PRC-2** **Total** = Subtotal − Discount + Shipping.

## 6. Checkout

- **CHK-1** **Proceed to Checkout** on the cart page opens `/checkout`. With an empty cart, checkout shows the empty-cart message instead of the form.
- **CHK-2** **Full name** is required. Whitespace-only input is treated as empty.
- **CHK-3** **Email address** is required and must be a valid address of the form `name@domain.tld` — exactly one `@`, no spaces, and a domain containing a dot. Anything else must be rejected.
- **CHK-4** **Delivery address** is required and must contain at least 10 characters, ignoring leading and trailing spaces.
- **CHK-5** **Phone number** is optional; if provided it must be a valid 10-digit Indian mobile number.
- **CHK-6** **Payment method** is simulated (Cash on delivery or UPI). No real payment happens.
- **CHK-7** Clicking **Place Order** with any invalid field shows an error next to each invalid field and a summary message, and **no order is placed**.
- **CHK-8** Clicking **Place Order** with valid details places a simulated order, empties the cart and opens the **Order Confirmed** page.

## 7. Order confirmation

- **ORD-1** The confirmation page shows the heading "Order Confirmed", an **order ID** in the format `YS-<number>`, the purchased items, delivery details and the payment summary.
- **ORD-2** Order IDs are sequential starting from `YS-1001` after a reset.
- **ORD-3** Orders are saved in `localStorage` and the confirmation URL keeps working after a reload.

## 8. Demo data and reproducibility

- **DEMO-1** **Reset Demo Data** (header) removes the saved cart and orders and reloads the shop with all filters cleared.
- **DEMO-2** Product data, prices, coupon rules and order numbering are deterministic; nothing is random.

---

## Appendix A — Automation contract

Every page has a single `<h1>`: "Shop all products", product name, "Your Cart", "Checkout", "Order Confirmed".

Form fields have visible labels, so `get_by_label("Search products")`, `get_by_label("Category")`, `get_by_label("Sort by")`, `get_by_label("Coupon code")`, `get_by_label("Full name")`, `get_by_label("Email address")`, `get_by_label("Phone number")` and `get_by_label("Delivery address")` all work. Buttons have accessible names such as "Add Wireless Mouse to cart", "Increase quantity of Notebook", "Remove Notebook from cart", "Apply", "Place Order".

Stable `data-testid` values:

| Area | `data-testid` |
| ---- | ------------- |
| Header | `nav-shop`, `nav-cart`, `cart-count`, `reset-demo-button` |
| Toast message | `toast`, `toast-message` |
| Shop toolbar | `search-input`, `category-filter`, `sort-select`, `reset-filters-button`, `results-count`, `empty-results`, `product-grid` |
| Product card | `product-card-<id>`, `add-to-cart-<id>`; inside a card: `product-name`, `product-category`, `product-price`, `stock-status` |
| Product page | `product-detail-<id>`, `product-name`, `product-price`, `stock-status`, `add-to-cart-<id>`, `go-to-cart` |
| Cart rows | `cart-items`, `cart-item-<product-id>` (one per row); inside a row: `cart-item-name`, `cart-item-price`, `quantity-<product-id>`, `increase-quantity-<product-id>`, `decrease-quantity-<product-id>`, `remove-item-<product-id>`, `cart-item-total` |
| Cart page | `empty-cart`, `continue-shopping`, `checkout-button` |
| Coupon | `coupon-input`, `apply-coupon-button`, `coupon-message`, `applied-coupon`, `applied-coupon-code`, `remove-coupon-button` |
| Order summary | `order-summary`, `cart-subtotal`, `discount-amount`, `shipping-amount`, `order-total` |
| Checkout | `checkout-form`, `name-input`, `email-input`, `phone-input`, `address-input`, `name-error`, `email-error`, `phone-error`, `address-error`, `form-error-summary`, `payment-cod`, `payment-upi`, `place-order-button`, `checkout-items` |
| Confirmation | `order-confirmation`, `order-id`, `confirmation-name`, `confirmation-email`, `confirmation-address`, `confirmation-items` |

`localStorage` keys: `yschool-cart`, `yschool-orders`.
