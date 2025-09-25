import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

// Import required services and components
import { UserService } from '../services/UserService';
import { LoginService } from '../services/LoginService';
import { GoogleAuthenticatorService } from '../services/GoogleAuthenticatorService';
import { MfaService } from '../services/MfaService';
import { AccessControlService } from '../services/AccessControlService';
import { JWTService } from '../services/JWTService';
import { EmailService } from '../services/EmailService';
import { VerificationService } from '../services/VerificationService';
import { AuditorService } from '../services/AuditorService';

// Import the schema for login data
import loginSchema from '../schema/loginSchema';

// Import the MFA schema
import mfaSchema from '../schema/mfaSchema';

// Import necessary CSS
import './login.css';

// Define the Login component
function Login() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        getValues,
        setError,
        clearErrors,
    } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            verificationToken: '',
        },
    });

    const { verifyUser, checkMfa } = MfaService();
    const { getUserRole } = AccessControlService();

    const handleMfaVerification = async (email, verificationToken) => {
        let isVerified = false;
        let role;

        try {
            isVerified = await verifyUser(email, verificationToken);
            role = await getUserRole(email);
        } catch (error) {
            setError('mfaError', {
                message: error.message,
            });
            toast.error('Error verifying MFA', {
                toastId: 'mfaError',
            });
        }

        clearErrors();

        return { isVerified, role };
    };

    const submitLogin = async (data) => {
        const email = data.email;
        const password = data.password;
        const verificationToken = data.verificationToken;
        let isVerified = false;
        let role = '';

        try {
            const user = await LoginService.loginUser(email, password);
            isVerified = true;
            role = user.role;
        } catch (error) {
            setError('passwordError', {
                message: error.message,
            });
            toast.error('Invalid email or password', {
                toastId: 'passwordError',
            });
            clearErrors();
            return;
        }

        clearErrors();

        if (isVerified) {
            const { isVerified: mfaChecked, role: mfaRole } = await handleMfaVerification(
                email,
                verificationToken,
            );

            if (mfaChecked) {
                navigate('/dashboard', {
                    state: {
                        role,
                        mfaRole,
                    },
                });
            } else {
                setError('mfaError', {
                    message: 'MFA verification failed',
                });
                toast.error('MFA verification failed', {
                    toastId: 'mfaError',
                });
            }
        }
    };

    return (
        <div className="container login">
            <form onSubmit={handleSubmit(submitLogin)}>
                <input
                    type="email"
                    placeholder="Email"
                    {...register('email')}
                    className="input-box"
                />
                <input
                    type="password"
                    placeholder="Password"
                    {...register('password')}
                    className="input-box"
                />
                <input
                    type="tel"
                    placeholder="Verification Token"
                    {...register('verificationToken')}
                    className="input-box"
                />
                {errors.mfaError && <p className="error-message">{errors.mfaError.message}</p>}
                {errors.passwordError && <p className="error-message">{errors.passwordError.message}</p>}
                <button className="submit" type="submit">
                    Login
                </button>

                <p className="signup-link">
                    Don't have an account?{' '}
                    <a
                        onClick={() => navigate('/register')}
                        className="link"
                    >
                        Sign up
                    </a>
                </p>
            </form>
        </div>
    );
}

export default Login;