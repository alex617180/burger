import React, { useCallback, useEffect, useState } from 'react';
import ErrorBoundary from '../error-boundary/error-boundary.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import AppHeader from '../app-header/app-header.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import { pushNotification } from '../../services/notification-service';

const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';
const INGREDIENTS_ERROR_NOTIFICATION_ID = 'ingredients-load-error';
const DEFAULT_SECTION = 'burger-constructor';

function App(){
    const [activeSection, setActiveSection] = useState(DEFAULT_SECTION);
    const [ingredients, setIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleSectionChange = useCallback((section) => {
        setActiveSection(section);
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        const fetchIngredients = async () => {
            setIsLoading(true);
            setHasError(false);

            try {
                const response = await fetch(INGREDIENTS_URL, { signal: controller.signal });

                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }

                const data = await response.json();
                if (!controller.signal.aborted) {
                    setIngredients(Array.isArray(data?.data) ? data.data : []);
                }
            } catch (error) {
                if (controller.signal.aborted) {
                    return;
                }

                setHasError(true);
                pushNotification({
                    id: INGREDIENTS_ERROR_NOTIFICATION_ID,
                    message: 'Не удалось загрузить ингредиенты. Попробуйте ещё раз.',
                    type: 'error'
                });
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        };

        fetchIngredients();

        return () => controller.abort();
    }, []);

    return (
        <div className="App">
        <ErrorBoundary>
            <div className="font-sans">
                {/* Фиксированная шапка */}
                <AppHeader
                    activeSection={activeSection}
                    onSectionChange={handleSectionChange}
                />
            
                <main className="max-w-5xl mx-auto px-4">
                    {activeSection === "burger-constructor" && (<section className="scroll-mt-16 py-8">
                        {isLoading && 'Загрузка...'}
                        {hasError && 'Произошла ошибка, обновите страницу. Если после 3 попыток проблема не исчезнет, то закройте вкладку и не возвращайтесь.'}
                        {!isLoading &&
                            !hasError &&
                            ingredients.length &&                                
                            (<div className="flex h-screen">
                                {/* Левая половина */}
                                <div className="w-1/2 flex flex-col">
                                    <BurgerIngredients ingredients={ingredients} />
                                </div>
                                {/* Правая половина */}
                                <div className="w-1/2 p-5">
                                    <BurgerConstructor ingredients={ingredients} />
                                </div>
                            </div>)
                        }
                    </section>)}
        
                    {activeSection === "order-feed" && (<section className="scroll-mt-16 py-8">
                        <h2 className="text-2xl font-bold mb-4">2</h2>
                    </section>)}
        
                    {activeSection === "personal-account" && (<section className="scroll-mt-16 py-8">
                        <h2 className="text-2xl font-bold mb-4">3</h2>
                    </section>)}
                </main>
            </div>            
        </ErrorBoundary>
        </div>
    )
}

export default App;
