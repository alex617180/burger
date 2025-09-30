import React, { useState } from 'react';
import ErrorBoundary from '../error-boundary/error-boundary.jsx'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import AppHeader from '../app-header/app-header.jsx';

function App(){
    const [state, setState] = useState();
    const [activeSection, setActiveSection] = useState('burger-constructor');
    
    const apiUrlIngredients = 'https://norma.nomoreparties.space/api/ingredients';

    return (
        <div className="App">
        <ErrorBoundary>
                <div className="font-sans">
                    {/* Фиксированная шапка */}
                    <AppHeader setActiveSection={setActiveSection} activeSection={activeSection}/>
                
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
        </ErrorBoundary>
        </div>
    )
}

export default App;