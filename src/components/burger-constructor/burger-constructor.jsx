import { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { openModal } from '../../services/modal-service';
import { pushNotification } from '../../services/notification-service';

function BurgerConstructor({ ingredients }) {
  const totalPrice = useMemo(
    () => ingredients.reduce((acc, ingredient) => acc + (ingredient.price ?? 0), 0),
    [ingredients]
  );

  const hasIngredients = ingredients.length > 0;

  const handleOrderClick = useCallback(() => {
    if (!hasIngredients) {
      pushNotification({
        message: 'Добавьте ингредиенты прежде чем оформлять заказ',
        type: 'warning'
      });
      return;
    }

    openModal(
      ({ close }) => (
        <div className="flex flex-col gap-4">
          <p className="text-base leading-6 text-gray-700">
            Мы начали собирать ваш заказ. Как только он будет готов, курьер свяжется с вами.
          </p>
          <div className="flex items-center justify-between rounded-md bg-gray-100 p-3 text-sm text-gray-900">
            <span>Сумма заказа</span>
            <span className="flex items-center gap-2 font-semibold">
              {totalPrice}
              <CurrencyIcon type="primary" />
            </span>
          </div>
          <div className="flex justify-end">
            <Button htmlType="button" type="primary" size="medium" onClick={close}>
              Отлично
            </Button>
          </div>
        </div>
      ),
      { title: 'Оформление заказа' }
    );

    pushNotification({
      message: 'Заказ отправлен на кухню',
      type: 'success'
    });
  }, [hasIngredients, totalPrice]);

  return (
    <>
      <div className="mt-20 h-[70vh] overflow-y-auto pr-2">
        {ingredients.map((ingredient, index) => {
          const key = ingredient._id ?? `${ingredient.name}-${index}`;

          return (
            <div key={key} className="mb-2 flex flex-col gap-2">
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
          );
        })}
      </div>
      <div className="mt-5 flex items-center justify-center gap-2">
        <div className="mr-5 flex items-center justify-center gap-2">
          {totalPrice}
          <CurrencyIcon type="primary" className="w-6 h-6" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={handleOrderClick}
          disabled={!hasIngredients}
        >
          Оформить заказ
        </Button>
      </div>
    </>
  );
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string.isRequired,
      price: PropTypes.number,
      image_mobile: PropTypes.string
    })
  )
};

BurgerConstructor.defaultProps = {
  ingredients: []
};
