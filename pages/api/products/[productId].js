import { products } from "@/lib/const/mock-data";

export default function handler(req, res) {
  const { productId } = req.query;

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
    return;
  }

  const product = products.find((p) => p.id === productId);

  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }

  res.status(200).json(product);
}
