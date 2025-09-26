import { Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredients } from '../../utils/data';


function BurgerConstructor (){
    return (
        <>
            <div className="h-[70vh] overflow-y-auto pr-2 mt-20">
                {ingredients.map((ingredient, index) => (
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
                <Button htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
        </>
    );
}

export default BurgerConstructor;
