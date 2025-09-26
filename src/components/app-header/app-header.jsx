import React, { useState } from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';


export default function AppHeader(){
    const [activeSection, setActiveSection] = useState('burger-constructor');
    return (
    <div className="font-sans">
        {/* Фиксированная шапка */}
        <header className="sticky top-0 bg-zinc-900 text-white z-50">
            <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 h-16">
                <ul className="flex gap-6 list-none">
                    <li className="flex items-center gap-2">
                        <BurgerIcon type={activeSection === "burger-constructor" ? "primary" : "secondary"} />
                        <button onClick={() => setActiveSection("burger-constructor")}
                                className={`hover:text-gray-200 text text_type_main-default 
                                        ${activeSection !== "burger-constructor" ? "text_color_inactive" : ""}`} 
                        >
                            Конструктор
                        </button>
                    </li>
                    <li className="flex items-center gap-2">
                        <ListIcon type={activeSection === "order-feed" ? "primary" : "secondary"} />
                        <button onClick={() => setActiveSection("order-feed")}
                                className={`hover:text-gray-200 text text_type_main-default 
                                        ${activeSection !== "order-feed" ? "text_color_inactive" : ""}`}
                        >
                            Лента заказов
                        </button>
                        </li>
                    <li className="ml-10 mr-25"><Logo /></li>
                    <li className="flex items-center gap-2">
                        <ProfileIcon type={activeSection === "personal-account" ? "primary" : "secondary"} />
                        <button onClick={() => setActiveSection("personal-account")}
                                className={`hover:text-gray-200 text text_type_main-default 
                                        ${activeSection !== "personal-account" ? "text_color_inactive" : ""}`}
                        >
                            Личный кабинет
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    
        <main className="max-w-5xl mx-auto px-4">
            {activeSection === "burger-constructor" && (<section className="scroll-mt-16 py-8">
                <BurgerIngredients />
            </section>)}

            {activeSection === "order-feed" && (<section className="scroll-mt-16 py-8">
                <h2 className="text-2xl font-bold mb-4">2</h2>
            </section>)}

            {activeSection === "personal-account" && (<section className="scroll-mt-16 py-8">
                <h2 className="text-2xl font-bold mb-4">3</h2>
            </section>)}
        </main>
    </div>
  );
}
