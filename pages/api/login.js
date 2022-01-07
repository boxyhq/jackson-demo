import fetch from 'node-fetch';
import { withIronSessionApiRoute } from 'iron-session/next';

async function loginRoute(req, res) {
  const { access_token } = req.query;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_JACKSON_SERVICE}/oauth/userinfo?access_token=` +
        access_token
    );
    const data = await response.json();

    req.session.user = data.email;
    await req.session.save();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default withIronSessionApiRoute(loginRoute, {
  cookieName: 'myapp_cookiename',
  password: 'complex_password_at_least_32_characters_long',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
});
