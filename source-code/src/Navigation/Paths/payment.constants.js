import DefaultNav from './defaultNav.constants';

class PaymentNav {
 
  PAYMENT_STATUS = {
    link: `${DefaultNav.PAYMENT.link}/status`,
    // backLink: this.ACCOUNT,
    hideFooter: true,
    name: 'PAYMENT STATUS',
  };
  BANK_TRANSFER = {
    link: `${DefaultNav.PAYMENT.link}/bank`,
    // backLink: this.ACCOUNT,
    hideFooter: true,
    name: 'PAYMENT TRANSFER',
  };

}

export default new PaymentNav();
