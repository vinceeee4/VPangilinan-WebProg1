import {Link, useLocation, useNavigate} from 'react-router-dom';
import Button from '../../components/Button';
import { getRoleBasedRedirect, setAuthSession } from '../../utils/auth';
import { loginUser } from '../../services/UserService';
import { useState } from 'react';

const inputClasses = 'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignInPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            setLoading(true);
            const { data } = await loginUser(formData);
            setAuthSession({ token: data.token, user: data.user });
            const redirectPath = location.state?.from?.pathname || getRoleBasedRedirect(data.user?.type);
            navigate(redirectPath, { replace: true });
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    return(
        <>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Log In</h1>
             <p className="mt-3 text-sm leading-6 text-zinc-600">
                Access your account with the same monochrome wireframe language used across the site.
            </p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                        {error}
                    </div>
                )}
                <div>
                    <label htmlFor="signin-email" className="text-sm font-medium text-zinc-700">
                        Email address
                    </label>
                    <input
                        id="signin-email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={inputClasses}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="signin-password" className="text-sm font-medium text-zinc-700">
                        Password
                    </label>
                    <input
                        id="signin-password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={inputClasses}
                        required
                    />

                    <p className="mt-2 text-xs leading-5 text-zinc-500">
                        It must be a combination of minimum 8 letters, numbers, and symbols.
                    </p>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm">
                    <label className="flex items-center gap-2 text-zinc-600">
                        <input type="checkbox" className="h-4 w-4 rounded border-zinc-300 accent-zinc-900" />
                        <span> Remember me</span>
                    </label>
                    <button type="button" className="font-medium text-zinc-700 transition hover:text-zinc-900">
                        Forgot Password?
                    </button>
                </div>
                <Button type="submit" variant="primary" className={actionButtonClassName} disabled={loading}>
                    {loading ? 'Logging in...' : 'Log in'}
                </Button>
                
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-zinc-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-4 text-zinc-500">Or continue with</span>
                    </div>
                </div>
                
                <Button type="button" variant="secondary" className={actionButtonClassName}>
                    <svg className="mr-2 inline h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.898-1.454 2.327-1.283 3.69 1.351.104 2.715-.688 3.57-1.678z"/>
                    </svg>
                    Log in with Google
                </Button>
                <Button type="button" variant="secondary" className={actionButtonClassName}>
                    Log in with Apple
                </Button>
                
                <p className="text-center text-sm text-zinc-600">
                    No account yet?{' '}
                    <Link to="/auth/signup" className="font-semibold text-zinc-900 transition hover:text-zinc-600">
                        Sign up
                    </Link>
                </p>
            </form>
        </>
    )
}

export default SignInPage;
