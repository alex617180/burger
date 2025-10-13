import { Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { useRef, useState } from 'react';
import Modal from '../modal/modal';
import OrderDetails from '../order/order-details';


function BurgerConstructor ({ currentIngredients }){
    const [order, setOrder] = useState(null);
    const modalFocusRef = useRef(null);
    const orderData = {
        id: 1,
        number: "034536",
        total: 610
    };


    const openOrderModal = order => setOrder(order);
    const closeOrderModal = () => setOrder(null);
    return (
        <>
            <div className="h-[70vh] overflow-y-auto pr-2 mt-20">
                {currentIngredients.map((ingredient, index) => (
                    <div
                    key={index}
                    className="flex flex-col gap-2 mb-2"
                    >
                    <div className="flex items-center justify-center gap-2">
                        <DragIcon type="primary" />
                        <ConstructorElement
                        isLocked={true}
                        text={ingredient.name}
                        price={ingredient.price}
                        thumbnail={ingredient.image_mobile}
                        />
                    </div>
                    </div>
                ))}
            </div>            
            <div className="flex items-center justify-center gap-2 mt-5">
                <div className="flex items-center justify-center gap-2 mr-5">
                    610
                    <CurrencyIcon type="primary" className="w-6 h-6" />                    
                </div>
                <Button 
                    onClick={() => openOrderModal(orderData)}
                    htmlType="button"
                    type="primary"
                    size="medium"
                >
                    Оформить заказ
                </Button>
            </div>

            <Modal
                isOpen={!!order}
                onClose={closeOrderModal}
                title=""
                modalFocusRef={modalFocusRef}
            >
                <OrderDetails orderData={order} />
            </Modal>
            
        </>
    );
}

export default BurgerConstructor;
