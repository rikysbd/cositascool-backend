const express = require('express');
const cors = require('cors');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

const products = [
  {
    id: 1,
    name: "Ventosa para móvil",
    price: 6.40,
    image: "https://cositascool.netlify.app/imgs/ventosa-movil.png"
  },
  {
    id: 2,
    name: "Muñeco Stitch Labubu pizza",
    price: 12.50,
    image: "https://cositascool.netlify.app/imgs/stitch-pizza.png"
  },
  {
    id: 3,
    name: "Tarjeta con GPS antirrobo o pérdida",
    price: 15.76,
    image: "https://cositascool.netlify.app/imgs/gps-tarjeta.png"
  },
  {
    id: 4,
    name: "Lámpara con forma de patito",
    price: 15.60,
    image: "https://cositascool.netlify.app/imgs/patito-luz.png"
  },
  {
    id: 5,
    name: "Ventosas móvil corazón",
    price: 5.30,
    image: "https://cositascool.netlify.app/imgs/corazon-ventosa.png"
  }
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/create-checkout-session', async (req, res) => {
  try {
    const product = products.find(p => p.id === req.body.productId);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: product.name,
            images: [product.image]
          },
          unit_amount: Math.round(product.price * 100)
        },
        quantity: 1
      }],
      mode: 'payment',
      success_url: 'https://cositascool.netlify.app/success.html',
      cancel_url: 'https://cositascool.netlify.app/cancel.html',
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor funcionando en puerto ${PORT}`));