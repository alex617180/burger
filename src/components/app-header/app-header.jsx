import PropTypes from 'prop-types';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const NAV_ITEMS = [
  { id: 'burger-constructor', label: 'Конструктор', Icon: BurgerIcon },
  { id: 'order-feed', label: 'Лента заказов', Icon: ListIcon }
];

const PROFILE_NAV_ITEM = { id: 'personal-account', label: 'Личный кабинет', Icon: ProfileIcon };

export default function AppHeader({ activeSection, onSectionChange }) {
  const renderNavButton = ({ id, label, Icon }) => {
    const isActive = activeSection === id;

    return (
      <button
        key={id}
        type="button"
        onClick={() => onSectionChange(id)}
        className={`flex items-center gap-2 text text_type_main-default transition hover:text-gray-200 ${
          isActive ? '' : 'text_color_inactive'
        }`}
        aria-pressed={isActive}
      >
        <Icon type={isActive ? 'primary' : 'secondary'} />
        <span>{label}</span>
      </button>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-zinc-900 text-white">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          {NAV_ITEMS.map(renderNavButton)}
        </div>
        <Logo />
        <div className="flex items-center gap-2">
          {renderNavButton(PROFILE_NAV_ITEM)}
        </div>
      </nav>
    </header>
  );
}

AppHeader.propTypes = {
  activeSection: PropTypes.string.isRequired,
  onSectionChange: PropTypes.func.isRequired
};
