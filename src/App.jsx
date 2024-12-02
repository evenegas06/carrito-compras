import { useState } from 'react';
import Guitar from './components/Guitar';
import Header from './components/Header';
import { db } from './data/db';

function App() {
	/* ----- state ----- */
	const [data, setData] = useState(db);
	const [cart, setCart] = useState([]);

	const MAX_QUANTITY = 5;
	const MIN_QUANTITY = 1;

	/**
	 *
	 * @param {object} item
	 */
	const addToCart = (item) => {
		const item_exists = cart.findIndex((cart_item) => {
			return cart_item.id === item.id;
		});

		if (item_exists >= 0) {
			if (cart[item_exists].quantity >= MAX_QUANTITY) return;
			
			const update_cart = [...cart]; // copy of state

			update_cart[item_exists].quantity++;

			setCart(update_cart);
		} else {
			item.quantity = 1;
			setCart([...cart, item]);
		}
	};

	/**
	 * Remove item from cart state.
	 *
	 * @param {int} id
	 */
	const removeFromCart = (id) => {
		setCart(cart.filter((guitar) => guitar.id !== id));
	};

	/**
	 * Increase item quantity.
	 *
	 * @param {int} id
	 */
	const increaseQuantity = (id) => {
		const update_cart = cart.map((item) => {
			if (item.id === id && item.quantity < MAX_QUANTITY) {
				return {
					...item,
					quantity: item.quantity + 1,
				};
			}

			return item;
		});

		setCart(update_cart);
	};

	/**
	 * Decrease item quantity.
	 *
	 * @param {int} id
	 */
	const decreaseQuantity = (id) => {
		const update_cart = cart.map((item) => {
			if (item.id === id && item.quantity > MIN_QUANTITY) {
				return {
					...item,
					quantity: item.quantity - 1,
				};
			}

			return item;
		});

		setCart(update_cart);
	};

	return (
		<>
			<Header
				cart={cart}
				removeFromCart={removeFromCart}
				increaseQuantity={increaseQuantity}
				decreaseQuantity={decreaseQuantity}
			/>

			<main className="container-xl mt-5">
				<h2 className="text-center">Nuestra Colección</h2>

				<div className="row mt-5">
					{data.map((item) => (
						<Guitar
							key={item.id}
							guitar={item}
							addToCart={addToCart}
						/>
					))}
				</div>
			</main>

			<footer className="bg-dark mt-5 py-5">
				<div className="container-xl">
					<p className="text-white text-center fs-4 mt-4 m-md-0">
						GuitarLA - Todos los derechos Reservados
					</p>
				</div>
			</footer>
		</>
	);
}

export default App;
