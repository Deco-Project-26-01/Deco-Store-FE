import type { IRegisterFormData } from '#types/auth';
import TextButton from '@components/Button/TextButton';
import DefaultInput from '@components/Input/DefaultInput';
import TimerInput from '@components/Input/TimerInput';
import InputLabel from '@components/Label/InputLabel';
import useEmailVerification from '@hooks/useEmailVerification';
import useEmailVerify from '@hooks/useEmailVerify';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const VERIFICATION_TTL_SEC = 300;

function formatMMSS(sec: number) {
	const m = String(Math.floor(sec / 60));
	const s = String(sec % 60).padStart(2, '0');
	return `${m}:${s}`;
}

const EmailVerificationForm = () => {
	const {
		register,
		getValues,
		setValue,
		resetField,
		watch,
		formState: { errors },
	} = useFormContext<
		Pick<IRegisterFormData, 'email' | 'emailVerification' | 'isEmailVerified'>
	>();

	const [second, setSecond] = useState(0);
	const [isSent, setIsSent] = useState(false);
	const [isExpired, setIsExpired] = useState(false);
	const [isSending, setIsSending] = useState(false);
	const [isVerifying, setIsVerifying] = useState(false);

	const { mutate: emailVerification, reset: resetEmailVerification } =
		useEmailVerification();
	const { mutate: emailVerify } = useEmailVerify();

	// 타이머 로직
	useEffect(() => {
		if (!isSent || second <= 0) return;

		const timerId = setInterval(() => {
			setSecond((s) => s - 1);
		}, 1000);

		return () => clearInterval(timerId);
	}, [isSent, second]);

	useEffect(() => {
		if (second <= 0 && isSent) {
			setIsExpired(true);
			setIsSent(false);
		}
	}, [second, isSent]);

	const email = watch('email');
	const code = watch('emailVerification');
	const isEmailInvalid = !email || !!errors.email;
	const isCodeInvalid = !code || !!errors.emailVerification;

	useEffect(() => {
		// 이메일이 변경되면 인증 관련 상태 리셋
		setIsSent(false);
		setIsExpired(false);
		setValue('isEmailVerified', false);
		setSecond(0);
		resetField('emailVerification');
		resetEmailVerification();
	}, [[email, resetEmailVerification, setValue, resetField]]);

	// 버튼 disabled 상태
	const isButtonDisabled =
		watch('isEmailVerified') ||
		isSending ||
		isVerifying ||
		isEmailInvalid ||
		(isSent && (second <= 0 || isCodeInvalid));

	const buttonLabel = watch('isEmailVerified')
		? 'Verified'
		: isSending
			? 'Sending...'
			: isVerifying
				? 'Verifying...'
				: isSent
					? 'Verify'
					: isExpired
						? 'Retry'
						: 'Send';

	// TODO: 이메일 인증 요청 및 검증 로직 구현
	const handleVerification = async () => {
		if (watch('isEmailVerified')) return;

		const currentEmail = getValues('email');
		if (!currentEmail || errors.email) return;

		// Send & Retry 클릭 시
		if (!isSent) {
			if (isSending) return;
			setIsSending(true);

			emailVerification(currentEmail, {
				onSuccess: () => {
					setIsSent(true);
					setIsExpired(false);
					setSecond(VERIFICATION_TTL_SEC);
					resetField('emailVerification');
				},
				onError: (error: Error) => {
					setIsSent(false);
					setIsExpired(false);
					setSecond(0);

					// TODO: 모달 구현
					console.error(error.message);
				},
				onSettled: () => {
					setIsSending(false);
				},
			});

			return;
		}

		// Verify 클릭 시
		if (second <= 0) return;
		const currentCode = getValues('emailVerification');
		if (!currentCode || errors.emailVerification) return;

		if (isVerifying) return;
		setIsVerifying(true);

		emailVerify(
			{ email: currentEmail, code: currentCode },
			{
				onSuccess: () => {
					setValue('isEmailVerified', true);
					setIsSent(false);
					setIsExpired(false);
					setSecond(0);
				},
				onError: (error: Error) => {
					setValue('isEmailVerified', false);
					setIsSent(false);
					setIsExpired(true);
					setSecond(0);

					// TODO: 모달 구현
					console.error(error.message);
				},
				onSettled: () => {
					setIsVerifying(false);
				},
			},
		);
	};

	return (
		<>
			{/* 이메일 */}
			<div className="flex flex-col gap-sm mb-lg">
				<InputLabel htmlFor="email" isRequired>
					E-mail
				</InputLabel>
				<div className="flex items-center gap-sm text-bodyBase">
					<DefaultInput
						id="email"
						type="email"
						placeholder="Enter your email"
						{...register('email', {
							required: 'E-mail is required',
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: 'Please enter a valid email address',
							},
						})}
						showClearIcon={!watch('isEmailVerified') && !!watch('email')}
						onClearIconClick={() =>
							!watch('isEmailVerified') && resetField('email')
						}
						error={errors.email?.message}
						readOnly={watch('isEmailVerified')}
					/>
				</div>
			</div>
			{/* 이메일 인증 요청 */}
			<div className="flex flex-col gap-sm mb-lg">
				<InputLabel htmlFor="emailVerification" isRequired>
					E-mail Verification
				</InputLabel>
				<div className="flex items-start gap-lg">
					<TimerInput
						id="emailVerification"
						timer={isSent ? formatMMSS(second) : undefined}
						placeholder="Enter 6-digit code"
						{...register('emailVerification', {
							required: 'E-mail verification is required',
							pattern: {
								value: /^\d{6}$/,
								message: 'Please enter a valid 6-digit code',
							},
						})}
						showClearIcon={
							!watch('isEmailVerified') && !!watch('emailVerification')
						}
						onClearIconClick={() =>
							!watch('isEmailVerified') && resetField('emailVerification')
						}
						error={errors.emailVerification?.message}
						readOnly={watch('isEmailVerified')}
					/>
					<TextButton
						variant="dark"
						size="small"
						onClick={handleVerification}
						disabled={isButtonDisabled}
					>
						{buttonLabel}
					</TextButton>
				</div>
			</div>
		</>
	);
};

export default EmailVerificationForm;
