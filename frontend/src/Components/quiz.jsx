import React from 'react';

import Footer from './footer';
import Header from './header';

import './quiz.css';

export default function Quiz() {
    return (
        <div className="quizpage">
            <Header />
                <div className='quiz'>
                    <div className='question'>

                    </div>

                    <div className='answers'>

                    </div>
                </div>

            <Footer />
        </div>
    );
}
  