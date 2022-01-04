export const isDevelopment = process.env.NODE_ENV === 'development'

export const collectorValue2Label = {
  selfPickUp: 'Self Pick Up',
  byRepresentative: 'By Representative',
  bySecurityService: 'By Security Service'
}

export const BASE_API_URL = isDevelopment
  ? 'https://goldzip-backend.herokuapp.com'
  : 'https://goldzip-backend.herokuapp.com';

// only apply to LBMA gold
export const supplierLBMA = [
  'New supplier Application',
  'CGSE Prepare Member Information',
  'User KYC/AML Check',
  'Supplier on board approval and create/ enable account',
  'Supplier Complete Deposit ticket',
  'Validators sign off the deposit form',
  'Confirm gold received and conduct inspection in operator vault',
  'Validators sign off the withdraw form ',
  'Gold Bar Sample assay result',
  'Validators sign off the deposit & Transfer form',
  'GZ mint and send, Off boarding supplier',
];

export const redeemIndividualCorporate = [
  'New User Application',
  'Check if Kyc fee is paid',
  'Submit user info to KYC agent, KYC Agent provide risk level',
  'User on boarded',
  'User enter collection information',
  'User send back Goldzip + Redemption fee',
  'Check if Goldzip + Redemption fee is paid',
  'Gold Transfer from operator vault to issuer, withdraw form to issuer',
  'Gold is in stock out status, waiting for the pickup',
  'GZ burn and User off boarding',
];

export const ticketTypes = {
  ...supplierLBMA.reduce((acc, cur, i) => {
    acc[i] = cur;
    return acc;
  }, {}),

  ...redeemIndividualCorporate.reduce((acc, cur, i) => {
    acc[i + 100] = cur;
    return acc;
  }, {}),
}

export const ticketStatus = {
  0: "pending",
  1: "approve",
  2: "reject",
}

export const kycFeeForRedeem = {
  individual: 3.5,
  corporate: 3.5
}


export const MAX_GOLDZIP_SUPPLY_QUANTITY = 100 * 1000;  // 1000kg
