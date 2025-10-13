import React, { useEffect, useState } from 'react';
import ErrorBoundary from '../error-boundary/error-boundary.jsx'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import AppHeader from '../app-header/app-header.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';

function App(){
    const apiUrlIngredients = 'https://norma.nomoreparties.space/api/ingredients';
    const [activeSection, setActiveSection] = useState('burger-constructor');
    const [ingredientsData, setIngredientsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    
    useEffect(()=>{
        const getIngredients= async() => {
            setIsLoading(true);
            setHasError(false);
            try {
                const result = await fetch(apiUrlIngredients);
                if (!result.ok) throw new Error(`Ошибка http: ${result.status}`);
                    
                const data = await result.json();
                setIngredientsData(data.data ?? []);
            } catch (error) {
                console.error(error);
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        }
        getIngredients();        
    }, [apiUrlIngredients])

    return (
        <div className="App">
        <ErrorBoundary>
            <div className="font-sans">
                {/* Фиксированная шапка */}
                <AppHeader setActiveSection={setActiveSection} activeSection={activeSection}/>
            
                <main className="max-w-5xl mx-auto px-4">
                    {activeSection === "burger-constructor" && (<section className="scroll-mt-16 py-8">
                        {isLoading && 'Загрузка...'}
                        {hasError && 'Произошла ошибка, обновите страницу. Если после 3 попыток проблема не исчезнет, то закройте вкладку и не возвращайтесь.'}
                        {!isLoading && !hasError && ingredientsData.length > 0 &&
                            (<div className="flex h-screen">
                                {/* Левая половина */}
                                <div className="w-1/2 flex flex-col">
                                    <BurgerIngredients ingredients={ingredientsData} />
                                </div>
                                {/* Правая половина */}
                                <div className="w-1/2 p-5">
                                    <BurgerConstructor currentIngredients={ingredientsData} />
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
