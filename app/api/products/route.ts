import { NextResponse } from "next/server";

const products = [
  {
    id: "p1",
    name: "لپ تاپ مدل X",
    price: 25000000,
    imageUrl:
      "https://cdn.snappshop.ir/products/41/b4/9cfa0551-eeaf-4086-8217-b65b3f7b41b4.jpg?q=75&w=384",
    description: "توضیحات کامل در مورد لپ تاپ مدل X",
  },
  {
    id: "p2",
    name: "گوشی موبایل مدل Y",
    price: 13000000,
    imageUrl:
      "https://cdn.snappshop.ir/products/41/b4/9cfa0551-eeaf-4086-8217-b65b3f7b41b4.jpg?q=75&w=384",
    description: "توضیحات کامل در مورد گوشی موبایل مدل Y",
  },
  {
    id: "p3",
    name: "تلویزیون هوشمند مدل Z",
    price: 18000000,
    imageUrl:
      "https://cdn.snappshop.ir/products/41/b4/9cfa0551-eeaf-4086-8217-b65b3f7b41b4.jpg?q=75&w=384",
    description: "توضیحات کامل در مورد تلویزیون هوشمند مدل Z",
  },
  {
    id: "p4",
    name: "هدفون بی‌سیم مدل A",
    price: 2500000,
    imageUrl:
      "https://cdn.snappshop.ir/products/41/b4/9cfa0551-eeaf-4086-8217-b65b3f7b41b4.jpg?q=75&w=384",
    description: "توضیحات کامل در مورد هدفون بی‌سیم مدل A",
  },
  {
    id: "p5",
    name: "ساعت هوشمند مدل B",
    price: 5700000,
    imageUrl:
      "https://cdn.snappshop.ir/products/41/b4/9cfa0551-eeaf-4086-8217-b65b3f7b41b4.jpg?q=75&w=384",
    description: "توضیحات کامل در مورد ساعت هوشمند مدل B",
  },
  {
    id: "p6",
    name: "دوربین عکاسی مدل C",
    price: 22000000,
    imageUrl:
      "https://cdn.snappshop.ir/products/41/b4/9cfa0551-eeaf-4086-8217-b65b3f7b41b4.jpg?q=75&w=384",
    description: "توضیحات کامل در مورد دوربین عکاسی مدل C",
  },
];

export async function GET() {
  return NextResponse.json(products);
}
