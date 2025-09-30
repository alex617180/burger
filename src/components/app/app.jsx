import React, { useEffect, useState } from 'react';
import ErrorBoundary from '../error-boundary/error-boundary.jsx'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import AppHeader from '../app-header/app-header.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';

function App(){
    const apiUrlIngredients = 'https://norma.nomoreparties.space/api/ingredients';
    const [state, setState] = useState({
        activeSection: 'burger-constructor',
        isLoading: false,
        hasError: false,
        ingredientsData: []
    });
    
    function setActiveSection(section){
        setState({...state, activeSection: section})
    }

    function getIngredients(){
        setState({...state, isLoading:true})
        fetch(apiUrlIngredients)
            .then(res => res.json())
            .then(data => setState({...state, ingredientsData: data.data, isLoading: false}))
            .catch(error => setState({...state, hasError: true, isLoading:false}));
    }

    useEffect(()=>{
        getIngredients();        
    }, [])

    return (
        <div className="App">
        <ErrorBoundary>
            <div className="font-sans">
                {/* Фиксированная шапка */}
                <AppHeader setActiveSection={setActiveSection} activeSection={state.activeSection}/>
            
                <main className="max-w-5xl mx-auto px-4">
                    {state.activeSection === "burger-constructor" && (<section className="scroll-mt-16 py-8">
                        {state.isLoading && 'Загрузка...'}
                        {state.hasError && 'Произошла ошибка, обновите страницу. Если после 3 попыток проблема не исчезнет, то закройте вкладку и не возвращайтесь.'}
                        {!state.isLoading &&
                            !state.hasError &&
                            state.ingredientsData.length &&                                
                            (<div className="flex h-screen">
                                {/* Левая половина */}
                                <div className="w-1/2 flex flex-col">
                                    <BurgerIngredients ingredients={state.ingredientsData} />
                                </div>
                                {/* Правая половина */}
                                <div className="w-1/2 p-5">
                                    <BurgerConstructor ingredients={state.ingredientsData} />
                                </div>
                            </div>)
                        }
                    </section>)}
        
                    {state.activeSection === "order-feed" && (<section className="scroll-mt-16 py-8">
                        <h2 className="text-2xl font-bold mb-4">2</h2>
                    </section>)}
        
                    {state.activeSection === "personal-account" && (<section className="scroll-mt-16 py-8">
                        <h2 className="text-2xl font-bold mb-4">3</h2>
                    </section>)}
                </main>
            </div>            
        </ErrorBoundary>
        </div>
    )
}

export default App;