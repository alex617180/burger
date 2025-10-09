import { useRef, useState } from 'react';
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from './ingredient-details';
import Modal from '../modal/modal';

export default function BurgerIngredients (props){
    const [current, setCurrent] = useState('rolls');
    const [selectedIngredient, setSelectedIngredient] = useState(null);

    const modalFocusRef = useRef(null);

    const typeByTab = {
        rolls: 'bun',
        souces: 'sauce',
        fillings: 'main',
    };

    const openIngredientModal = ingredient => setSelectedIngredient(ingredient);
    const closeIngredientModal = () => setSelectedIngredient(null);

    const visibleIngredients = props.ingredients.filter((item) => item.type === typeByTab[current]);

    return (
        <>
            <div className="m-5 text text_type_main-large">Соберите бургер</div>

            {/* Табы */}
            <div className="px-5 overflow-x-auto whitespace-nowrap no-scrollbar min-w-0">
                <div className="inline-flex gap-1">
                    <Tab value="rolls" active={current === 'rolls'} onClick={setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="souces" active={current === 'souces'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value="fillings" active={current === 'fillings'} onClick={setCurrent}>
                        Начинки
                    </Tab>
                </div>
            </div>

            {/* Список ингредиентов с прокруткой */}
            <div className="mt-6 flex-1 overflow-y-auto px-5">
                <div className="grid grid-cols-2 gap-6">
                    {visibleIngredients.map((ingredient) => (
                        <article
                            key={ingredient._id}
                            className="relative flex flex-col items-center p-3 rounded-xl bg-zinc-800/70 hover:bg-zinc-800 transition"
                            onClick={() => openIngredientModal(ingredient)}
                        >
                        {/* Счётчик в углу */}
                        <Counter
                            count={1}
                            size="default"
                            extraClass="absolute top-1 right-1"
                        />

                        <img
                            src={ingredient.image_large}
                            alt={ingredient.name}
                            className="w-50 h-50 object-contain mb-3"
                        />

                        <div className="flex items-center justify-center gap-2 mb-1">
                            <CurrencyIcon type="primary" className="w-6 h-6" />
                            <span className="text text_type_digits-default">{ingredient.price}</span>
                        </div>

                        <div className="text text_type_main-default text-center text-sm">
                            {ingredient.name}
                        </div>
                        </article>                
                    ))}
                </div>
            </div>

            <Modal
                isOpen={!!selectedIngredient}
                onClose={closeIngredientModal}
                title="Детали ингредиента"
                modalFocusRef={modalFocusRef}
            >
                <IngredientDetails ingredient={selectedIngredient} />
            </Modal>
        </>
    );
}
