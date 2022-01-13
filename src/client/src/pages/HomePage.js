import React from 'react';
import {Link} from 'react-router-dom';
export const HomePage = () => {

    return (
        <div>
           <h1>
               Home Page
           </h1>
            <div className="progress">
                <div className="indeterminate"/>
            </div>
            <div className="collection">
                Report Monthly Earnings Report <Link to={'/monthlyEarningsReport'} className="btn waves-effect waves-light">Monthly Earnings Report</Link>
            </div>
            <div className="collection">
                Monthly Expense Report <Link to={'/monthlyExpenseReport'} className="btn waves-effect waves-light">Monthly Expense Report</Link>
            </div>
        </div>
    );
}








