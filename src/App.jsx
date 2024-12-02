import { useState } from 'react';
import Guitar from './components/Guitar';
import Header from './components/Header';
import { db } from './data/db';

function App() {
	/* ----- state ----- */
	const [data, setData] = useState(db);
	const [cart, setCart] = useState([]);

	const addToCart = (item) => {
		const item_exists = cart.findIndex((cart_item) => {
			return cart_item.id === item.id;
		});

		if (item_exists >= 0) {
			const update_cart = [...cart]; // copy of state

			update_cart[item_exists].quantity++;

			setCart(update_cart);
		} else {
			item.quantity = 1;
			setCart([...cart, item]);
		}
	};

	const removeFromCart = (id) => {
		setCart(cart.filter((guitar) => guitar.id !== id));
	};

	return (
		<>
			<Header
				cart={cart}
				removeFromCart={removeFromCart}
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
