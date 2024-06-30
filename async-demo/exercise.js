
// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

async function notifyCustomer(){
  const customer = await getCustomer(1);
  console.log('Customer: ', customer);
  if(customer.isGold){
    const movies = await getTopMovies();
    console.log('Top movies: ', movies);
    await sendEmail(customer.email, movies);
    console.log('Email sent...')
  }
}

notifyCustomer();

async function getCustomer(id) {
  return new Promise((resolve, reject) => {
    
     setTimeout(() => {
        resolve({ 
          id: 1, 
          name: 'Mosh Hamedani', 
          isGold: true, 
          email: 'email' 
        });
      }, 4000); 
  });
   
}

async function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 4000);
  })
}

async function sendEmail() {
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 4000);
  })
}


sendEmail();