"use client";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { Button, ProductCardLayout, SectionContainer } from "tp-kit/components";
import { ProductCartLine } from "../../../tp-kit/components/products/product-cart-line";
import { addLine, useCart } from "../../hooks/use-cart";
const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);


export default function DevCartPage() {
  const lines = useCart((state) => state.lines)
  console.log(lines)
  return (
    <SectionContainer
      className="py-36"
      wrapperClassName="flex flex-col lg:flex-row gap-24"
    >
      {/* Produits */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
      <pre>{JSON.stringify(lines, null, 2)}</pre>
        {products.map((product) => (
          <ProductCardLayout
            key={product.id}
            product={product}
            button={<Button variant={"ghost"} fullWidth onClick={() => addLine(product)}>Ajouter au panier</Button>}
          />
        ))}
      </section>
      {/* /Produits */}

      {/* Panier */}
      <section className="w-full lg:w-1/3 space-y-8">
        {lines.map((line) => (
          <ProductCartLine key={line.product.id} product={line.product} qty={1} onQtyChange={console.log} />
        ))}
        <div className="flex justify-between">
        <h3 className="w-full">Total</h3>
        <div>10€</div>
        </div>
        <Button fullWidth type={"submit"}>Commander</Button>
				
				<Button variant={"outline"} fullWidth>Vider le panier</Button>
			</section>
      {/* /Panier */}
    </SectionContainer>
  );
}