import React from 'react'
import { Route, useLocation, Redirect } from 'react-router-dom';
import { PaymentNav, DefaultNav } from 'Navigation/Paths';
import PaymentStatus from './PaymentStatus';
import PaymentSelection from './PaymentSelection'
import AnimatedSwitcher from 'Hoc/AnimatedSwitcher';
import BankPage from './BankDetails';
const PaymentStack = () => {
  const { state } = useLocation();

  return (
    <AnimatedSwitcher state={state}>
     <Route exact path={PaymentNav.PAYMENT_STATUS.link} component={PaymentStatus} />

     <Route exact path={DefaultNav.PAYMENT.link} component={PaymentSelection} />
     <Route exact path={PaymentNav.BANK_TRANSFER.link} component={BankPage} />


     <Route render={() => <Redirect to={DefaultNav.PAYMENT.link} />} />

      </AnimatedSwitcher>

  )
}

export default PaymentStack