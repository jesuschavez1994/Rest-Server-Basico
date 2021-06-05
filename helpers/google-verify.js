const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client( process.env.GOOGLE_SIGN_IN );

const googleVerify = async( idToken = '' ) => {

  const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_SIGN_IN,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });

  console.log(idToken, 'Token en googleVerify');

  const { name: nombre, 
          picture: img, 
          email: correo
        } = ticket.getPayload();
  
  return { nombre, img, correo };

}


module.exports = {
    googleVerify
}