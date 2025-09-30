import { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const TABS = [
  { value: 'bun', label: 'Булки' },
  { value: 'sauce', label: 'Соусы' },
  { value: 'main', label: 'Начинки' }
];

const DEFAULT_TAB = TABS[0].value;

export default function BurgerIngredients({ ingredients }) {
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB);

  const handleTabSelect = useCallback((value) => {
    setActiveTab(value);
  }, []);

  const visibleIngredients = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === activeTab),
    [ingredients, activeTab]
  );

  return (
    <>
      <div className="m-5 text text_type_main-large">Соберите бургер</div>

      <div className="min-w-0 overflow-x-auto whitespace-nowrap px-5">
        <div className="inline-flex gap-1">
          {TABS.map(({ value, label }) => (
            <Tab key={value} value={value} active={activeTab === value} onClick={handleTabSelect}>
              {label}
            </Tab>
          ))}
        </div>
      </div>

      <div className="mt-6 flex-1 overflow-y-auto px-5">
        <div className="grid grid-cols-2 gap-6">
          {visibleIngredients.map((ingredient) => {
            const ingredientId = ingredient._id ?? ingredient.name;

            return (
              <article
                key={ingredientId}
                className="relative flex flex-col items-center rounded-xl bg-zinc-800/70 p-3 transition hover:bg-zinc-800"
              >
                <Counter count={1} size="default" extraClass="absolute top-1 right-1" />

                <img
                  src={ingredient.image_large}
                  alt={ingredient.name}
                  className="mb-3 h-50 w-50 object-contain"
                />

                <div className="mb-1 flex items-center justify-center gap-2">
                  <CurrencyIcon type="primary" className="h-6 w-6" />
                  <span className="text text_type_digits-default">{ingredient.price}</span>
                </div>

                <div className="text text_type_main-default text-center text-sm">{ingredient.name}</div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      price: PropTypes.number,
      image_large: PropTypes.string,
      image_mobile: PropTypes.string
    })
  )
};

BurgerIngredients.defaultProps = {
  ingredients: []
};
