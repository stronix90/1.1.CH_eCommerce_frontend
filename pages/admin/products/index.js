import CreateProduct from "../../../src/components/admin/products/CreateProduct";
import H1 from "../../../src/components/atoms/H1";
import { LayoutWithoutAside } from "../../../src/components/layout";

export default function CreateProductPage() {

    return (
        <LayoutWithoutAside>
            <CreateProduct />
        </LayoutWithoutAside>
    )
}