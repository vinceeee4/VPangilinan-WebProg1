import {Link, useNavigate} from 'react-router-dom';
import Button from '../../components/Button';
import { useState } from 'react';
import { registerUser } from '../../services/UserService';
import { setAuthSession } from '../../utils/auth';
import { validations } from '../../utils/validations';

const inputClasses =
'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const initialForm = {
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    username: '',
    password: '',
    address: '',
    type: 'user',
    isActive: true
};

const SignUpPage = () => {
    const [formData, setFormData] = useState(initialForm);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const validateForm = () => {
        const checks = [
            validations.validateFirstName(formData.firstName),
            validations.validateLastName(formData.lastName),
            validations.validateAge(formData.age),
            validations.validateContactNumber(formData.contactNumber),
            validations.validateEmail(formData.email),
            validations.validateUsername(formData.username),
            validations.validatePassword(formData.password)
        ];

        if (!formData.gender) checks.push('Gender is required');
        if (!formData.address.trim()) checks.push('Address is required');

        return checks.find(Boolean) || '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setLoading(true);
            const { data } = await registerUser(formData);
            setAuthSession({ token: data.token, user: data.user });
            navigate('/dashboard', { replace: true });
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Sign Up</h1>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
                Create your account with the same monochrome layout and shared button treatment.
            </p>
            
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                        {error}
                    </div>
                )}
                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label htmlFor="first-name" className="text-sm font-medium text-zinc-700">
                            First Name
                        </label>
                        <input
                        id="first-name"
                        name="firstName"
                        type="text"
                        placeholder="Placeholder"
                        autoComplete="given-name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={inputClasses}
                        />
                    </div>
                    <div>
                        <label htmlFor="last-name" className="text-sm font-medium text-zinc-700">
                            Last Name
                        </label>
                        <input
                        id="last-name"
                        name="lastName"
                        type="text"
                        placeholder="Placeholder"
                        autoComplete="family-name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={inputClasses}
                        />
                    </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label htmlFor="age" className="text-sm font-medium text-zinc-700">
                            Age
                        </label>
                        <input
                        id="age"
                        name="age"
                        type="number"
                        placeholder="25"
                        value={formData.age}
                        onChange={handleInputChange}
                        className={inputClasses}
                        />
                    </div>
                    <div>
                        <label htmlFor="gender" className="text-sm font-medium text-zinc-700">
                            Gender
                        </label>
                        <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className={inputClasses}
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="text-sm font-medium text-zinc-700">
                        Email
                    </label>
                    <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Placeholder"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={inputClasses}
                    />
                </div>
                <div>
                    <label htmlFor="username" className="text-sm font-medium text-zinc-700">
                        Username
                    </label>
                    <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="No spaces"
                    autoComplete="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={inputClasses}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="text-sm font-medium text-zinc-700">
                        Password
                    </label>
                    <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Placeholder"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={inputClasses}
                    />

                    <p className="mt-2 text-xs leading-5 text-zinc-500">
                        Use a secure password with letters, numbers, and symbols.
                    </p>
                </div>
                <div>
                    <label htmlFor="contactNumber" className="text-sm font-medium text-zinc-700">
                        Contact Number
                    </label>
                    <input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    placeholder="09171234567"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className={inputClasses}
                    />
                </div>
                <div>
                    <label htmlFor="address" className="text-sm font-medium text-zinc-700">
                        Address
                    </label>
                    <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Street, city, province"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={inputClasses}
                    />
                </div>
                <Button type="submit"  variant="primary" className={actionButtonClassName} disabled={loading}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                </Button>

                <div className="grid gap-3 pt-2 sm:grid-cols-2">
                    <Button type="button" variant="secondary" className={actionButtonClassName}>
                        Sign Up With Google
                    </Button>
                <Button type="button" variant="secondary" className={actionButtonClassName}>
                    Sign Up With Apple
                </Button>
                </div>
            </form>
            <div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
                Already have an account?{' '}
                <Link to="/auth/signin" className="font-semibold text-zinc-900 transition hover:text-zinc-600">
                    Log in
                </Link>
            </div>
        </>
    )
};

export default SignUpPage;
