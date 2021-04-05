var stripe = require('stripe')('sk_test_51HBDHNJRW1JL8d9KIaHQ2rSR9HQuUwCNvYaK9idu6Cd0rjL0eo8UJDqoMVHq9CMGI6GWxzeE6kqBeXCfHPK2QTCo00EcHgGMWU');


async function active(xx,plato){
  const customerss = await stripe.customers.create(
  );
    console.log('Customers:',customerss.id);
        
  const paymentMethod = await stripe.paymentMethods.create(
    {
      type: 'card',
        card: {
          number: '4242424242424242',
          exp_month: 7,
          exp_year: 2021,
          cvc: '314',
        },
    },
  );
    console.log('paymentMethod', paymentMethod.id);

  const pma = await stripe.paymentMethods.attach(
    paymentMethod.id,
    {customer: customerss.id},
  );
  console.log('pma: ', pma.id);

  const paymentIntent = await stripe.paymentIntents.create(
    {
    amount: xx,
    currency: 'usd',
    payment_method_types: ['card'],
    customer: customerss.id,
    payment_method: paymentMethod.id,
    description: plato
    }
  );
  console.log('PaymentIntent: ',paymentIntent.id);
    
  return (paymentIntent.id);
};

async function accept(xx){

  (async()=>{
    const paymentIntentConfirmed = await stripe.paymentIntents.confirm(
        xx,
        {payment_method: 'pm_card_visa'},
  );
  console.log('paymentIntentConfirmed: ', paymentIntentConfirmed);
})();
}

module.exports =  {
  "active": active,
  "accept": accept
}