import { useAppSelector } from '../app/hooks';
import ProductList from '../components/ProductList';
import Basket from '../components/Basket';
import OfferMarquee from '../components/OfferMarquee';

interface ShopPageProps {
    onAdminClick: () => void;
}

const ShopPage = ({
    onAdminClick,
}: ShopPageProps) => {
    const products = useAppSelector(
        (state) => state.products
    );

    return (
        <div className="shop-page">
            <OfferMarquee />

            <header className="shop-header">
                <div>
                    {/* <span className="eyebrow">
                        ONLINE STORE
                    </span> */}

                    <h1>Fresh Basket</h1>

                    <p>
                        Choose your products and enjoy our
                        special offers.
                    </p>
                </div>

                <button
                    className="admin-button"
                    onClick={onAdminClick}
                >
                    Admin Panel
                </button>
            </header>

            <main className="shop-container">
                <ProductList products={products} />

                <Basket />
            </main>
        </div>
    );
};

export default ShopPage;