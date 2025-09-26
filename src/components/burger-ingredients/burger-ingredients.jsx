import React from 'react';
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredients } from '../../utils/data';
import BurgerConstructor from '../burger-constructor/burger-constructor';

export default function BurgerIngredients (){
    const [current, setCurrent] = React.useState('rolls');

    const typeByTab = {
        rolls: 'bun',
        souces: 'sauce',
        fillings: 'main',
    };

    const visibleIngredients = ingredients.filter((item) => item.type === typeByTab[current]);

    return (
        <div className="flex h-screen">
            {/* Левая половина */}
            <div className="w-1/2 flex flex-col">
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
            </div>
            {/* Правая половина */}
            <div className="w-1/2 p-5">
                <BurgerConstructor />
            </div>
        </div>
    );
}
