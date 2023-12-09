// pages/api/authenticate.js
export default function handler(req, res) {
    if (req.method === 'POST') {
        const { password } = req.body;
        const correctPassword = process.env.password || 'password';

        if (password === correctPassword) {
            const cookieOptions = process.env.NODE_ENV === 'development'
                ? 'Path=/; SameSite=Lax'
                : 'Path=/; Secure; SameSite=Strict';
            // Set a cookie for authentication
            res.setHeader('Set-Cookie', `authenticated=true; ${cookieOptions}; Max-Age=864000`); // Expires in 10 day
            return res.status(200).json({ authenticated: true });
        } else {
            return res.status(401).json({ authenticated: false, message: 'Incorrect password' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
