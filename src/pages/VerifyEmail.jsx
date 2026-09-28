import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Skull, MailCheck, AlertCircle, Compass, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, verifyEmail, sendVerificationEmail, logout } = useAuthStore();

  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');

  const [verifying, setVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);
  const [verifyError, setVerifyError] = useState(null);
  const [resending, setResending] = useState(false);

  // Auto-verify if userId and secret exist in the URL
  useEffect(() => {
    if (userId && secret) {
      setVerifying(true);
      setVerifyError(null);

      verifyEmail(userId, secret)
        .then(() => {
          setVerifiedSuccess(true);
          toast.success('Crew identity verified! Welcome to the Grand Line!');
        })
        .catch((err) => {
          setVerifyError(err.message || 'This verification link has expired or is invalid.');
        })
        .finally(() => {
          setVerifying(false);
        });
    } else if (user?.emailVerification) {
      setVerifiedSuccess(true);
    }
  }, [userId, secret, user?.emailVerification, verifyEmail]);

  const handleResend = async () => {
    try {
      setResending(true);
      await sendVerificationEmail();
      toast.success('A new verification scroll has been dispatched to your email!');
    } catch (err) {
      toast.error(err.message || 'Failed to dispatch verification email.');
    } finally {
      setResending(false);
    }
  };

  const handleReturnToLogin = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  const handleEnterGrandLine = () => {
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="max-w-md mx-auto p-4 md:p-8 my-16 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/60 backdrop-blur-md p-8 rounded-xl border-2 border-gold/40 shadow-2xl relative overflow-hidden"
      >
        <div className="relative z-10 text-center">
          {/* Top Icon */}
          <div className="flex justify-center mb-6">
            {verifiedSuccess ? (
              <MailCheck className="w-14 h-14 text-gold drop-shadow-md animate-bounce" />
            ) : verifyError ? (
              <AlertCircle className="w-14 h-14 text-pirateRed drop-shadow-md" />
            ) : verifying ? (
              <RefreshCw className="w-14 h-14 text-gold drop-shadow-md animate-spin" />
            ) : (
              <Skull className="w-14 h-14 text-pirateRed drop-shadow-md" />
            )}
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-pirate tracking-widest text-gold text-center mb-2">
            {verifiedSuccess
              ? 'Crew Verified!'
              : verifying
              ? 'Inspecting Scroll...'
              : verifyError
              ? 'Verification Failed'
              : 'Verify Your Scroll'}
          </h2>

          <p className="text-parchment/60 font-sans text-center text-sm uppercase tracking-widest mb-6">
            {verifiedSuccess
              ? 'Your pirate credentials are authenticated'
              : 'Grand Line Entry Requirement'}
          </p>

          {/* Body Content */}
          {verifying ? (
            <div className="py-6">
              <p className="text-parchment font-sans text-sm animate-pulse">
                Decrypting your pirate signature with Appwrite...
              </p>
            </div>
          ) : verifiedSuccess ? (
            <div className="space-y-6 py-2">
              <div className="bg-gold/10 border border-gold/30 text-gold p-4 rounded text-sm font-sans">
                Your email is confirmed, Captain! The seas are uncharted and your crew awaits.
              </div>

              <button
                type="button"
                onClick={handleEnterGrandLine}
                className="w-full py-4 bg-pirateRed text-white rounded font-display tracking-[0.2em] uppercase hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <Compass className="w-5 h-5" />
                <span>Enter the Grand Line</span>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {verifyError ? (
                <div className="bg-pirateRed/10 border border-pirateRed/30 text-pirateRed p-3 rounded text-sm font-sans text-center">
                  {verifyError}
                </div>
              ) : (
                <div className="bg-black/50 border border-gold/20 p-4 rounded text-left space-y-2">
                  <p className="text-parchment text-sm font-sans">
                    We have dispatched a verification email to:
                  </p>
                  <p className="text-gold font-bold font-sans text-sm break-all">
                    {user?.email || 'your registered email address'}
                  </p>
                  <p className="text-parchment/70 text-xs font-sans mt-2">
                    Please open the link in your inbox to authenticate your crew credentials before entering the Grand Line.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="w-full py-3 bg-gold/20 text-gold border border-gold/50 rounded font-display tracking-[0.15em] uppercase hover:bg-gold/30 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${resending ? 'animate-spin' : ''}`} />
                  <span>{resending ? 'Dispatching...' : 'Resend Verification Email'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleReturnToLogin}
                  className="w-full py-3 bg-black/40 text-parchment/80 border border-gold/20 rounded font-display tracking-[0.15em] uppercase hover:text-white hover:border-gold/40 transition-colors text-sm"
                >
                  Return to Login
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
