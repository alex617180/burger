import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'


export default function AppHeader(props){
    return (
        <header className="sticky top-0 bg-zinc-900 text-white z-50">
            <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 h-16">
                <ul className="flex gap-6 list-none">
                    <li className="flex items-center gap-2">
                        <BurgerIcon type={props.activeSection === "burger-constructor" ? "primary" : "secondary"} />
                        <button onClick={() => props.setActiveSection("burger-constructor")}
                                className={`hover:text-gray-200 text text_type_main-default 
                                        ${props.activeSection !== "burger-constructor" ? "text_color_inactive" : ""}`} 
                        >
                            Конструктор
                        </button>
                    </li>
                    <li className="flex items-center gap-2">
                        <ListIcon type={props.activeSection === "order-feed" ? "primary" : "secondary"} />
                        <button onClick={() => props.setActiveSection("order-feed")}
                                className={`hover:text-gray-200 text text_type_main-default 
                                        ${props.activeSection !== "order-feed" ? "text_color_inactive" : ""}`}
                        >
                            Лента заказов
                        </button>
                        </li>
                    <li className="ml-10 mr-25"><Logo /></li>
                    <li className="flex items-center gap-2">
                        <ProfileIcon type={props.activeSection === "personal-account" ? "primary" : "secondary"} />
                        <button onClick={() => props.setActiveSection("personal-account")}
                                className={`hover:text-gray-200 text text_type_main-default 
                                        ${props.activeSection !== "personal-account" ? "text_color_inactive" : ""}`}
                        >
                            Личный кабинет
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
  );
}
