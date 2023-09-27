import { Button, ProductCartLine } from "tp-kit/components";
import { computeCartTotal, removeLine, updateLine, useCart } from "../hooks/use-cart";


export default function Cart(){
    const lines = useCart((state) => state.lines)
    return (
        <section className="w-full lg:w-1/3 space-y-8">
        {lines.map((line) => (
          <ProductCartLine key={line.product.id} product={line.product} qty={line.qty} onDelete={() => removeLine(line.product.id)} onQtyChange={(qty) => updateLine({...line, qty:qty})} />
        ))}
        <div className="flex justify-between">
        <h3 className="w-full">Total</h3>
        <div>{computeCartTotal(lines)}€</div>
        </div>
        <Button fullWidth type={"submit"}>Commander</Button>
				
		<Button variant={"outline"} fullWidth>Vider le panier</Button>
		</section>
    )
}