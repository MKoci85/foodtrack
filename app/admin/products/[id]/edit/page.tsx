import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";

async function getProductById(id: number) {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    });
    return product;
}

interface Params {
    id: string;
}

interface EditProductsPageProps {
    params: Params;
}

export default async function EditProductsPage({ params }: EditProductsPageProps) {
    const { id } = params;
    const product = await getProductById(Number(id));
    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex flex-col items-center ">
                    <Heading>
                        Editar Producto
                    </Heading>
                    <GoBackButton />
                </div>
                
                <EditProductForm>
                    <ProductForm 
                        product={product}
                    />
                </EditProductForm>
                
            </div>
        </div>
    );
}
