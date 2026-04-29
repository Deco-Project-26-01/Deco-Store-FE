import type { IRegisterFormData } from '#types/auth';
import TextButton from '@components/Button/TextButton';
import BusinessForm from '@components/Form/BusinessForm';
import EmailVerificationForm from '@components/Form/EmailVerificationForm';
import NameForm from '@components/Form/NameForm';
import PasswordForm from '@components/Form/PasswordForm';
import PhoneForm from '@components/Form/PhoneForm';
import RadioForm from '@components/Form/RadioForm';
import CheckboxInput from '@components/Input/CheckboxInput';
import AlertModal from '@components/Modal/AlertModal';
import useRegister from '@hooks/useRegister';
import { useModalStore } from '@store/useModalStore';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import en from 'react-phone-number-input/locale/en';
import { Link, useNavigate } from 'react-router-dom';

type UserType = 'personal' | 'corporate';

const Register = () => {
	const methods = useForm<IRegisterFormData>({
		mode: 'onChange',
		defaultValues: {
			email: '',
			emailVerification: '',
			isEmailVerified: false,
			password: '',
			passwordConfirm: '',
			firstName: '',
			lastName: '',
			companyName: '',
			businessNumber: '',
			nation: '',
			callingCode: '',
			phone: '',
			terms: false,
		},
	});

	const [userType, setUserType] = useState<UserType>('personal');
	const { mutate: registerUser } = useRegister();
	const navigate = useNavigate();
	const openModal = useModalStore((state) => state.openModal);

	// TODO: 회원가입 제출 로직 구현
	const handleRegister = async (data: IRegisterFormData) => {
		// 이메일 인증 여부 체크
		if (!data.isEmailVerified) {
			methods.setFocus('emailVerification');
			return;
		}

		// userType에 따라 필요한 필드만 강제로 검증
		const fields =
			userType === 'personal'
				? (['firstName', 'lastName'] as const)
				: (['companyName', 'businessNumber'] as const);

		const ok = await methods.trigger(fields);
		if (!ok) return;

		const formData = {
			email: data.email,
			password: data.password,
			lastName: userType === 'personal' ? String(data.lastName) : null,
			firstName: userType === 'personal' ? String(data.firstName) : null,
			companyName: userType === 'corporate' ? String(data.companyName) : null,
			businessNumber:
				userType === 'corporate' ? String(data.businessNumber) : null,
			nation: en[data.nation as keyof typeof en],
			phone: `${data.callingCode}-${data.phone}`,
		};

		registerUser(formData, {
			onSuccess: () => {
				openModal(
					<AlertModal
						title="Welcome to Deco!"
						description="Your account has been successfully created."
						buttonText="Login"
						onConfirm={() => {
							navigate('/login');
							methods.reset();
							setUserType('personal');
						}}
					/>,
				);
			},
			onError: (error: Error) => {
				openModal(
					<AlertModal
						title="Registration Failed"
						description={error.message}
						buttonText="Retry"
						onConfirm={() => {
							methods.reset();
							setUserType('personal');
						}}
					/>,
				);
			},
		});
	};

	return (
		<>
			<title>Register</title>
			<section className="w-[60rem] py-4xl mx-auto">
				<h2 className="mb-2xl text-center text-title2Xlarge text-primaryDark">
					Register
				</h2>
				{/* 회원가입 폼 영역 */}
				<div className="p-md">
					<span className="block text-right text-bodyXsmall text-primaryDark font-bold">
						<b className="text-alert">*</b> Required fields
					</span>
					<FormProvider {...methods}>
						<form noValidate onSubmit={methods.handleSubmit(handleRegister)}>
							{/* 이메일 영역 */}
							<EmailVerificationForm />
							{/* 비밀번호 영역 */}
							<PasswordForm />
							{/* 회원 유형 선택 영역 */}
							<div className="mb-lg">
								<RadioForm<UserType>
									name="userType"
									legend="Select user type"
									isRequired
									list={[
										{ label: 'Personal', value: 'personal' },
										{ label: 'Corporate', value: 'corporate' },
									]}
									value={userType}
									setValue={setUserType}
								/>
							</div>
							{/* 이름 또는 사업자 정보 영역 */}
							{userType === 'personal' && <NameForm />}
							{userType === 'corporate' && <BusinessForm />}
							{/* 전화번호 영역 */}
							<PhoneForm />
							{/* 약관 동의 영역 */}
							<fieldset className="flex flex-col gap-sm mb-2xl">
								<legend className="sr-only">Terms and Conditions</legend>
								<CheckboxInput
									id="terms"
									{...methods.register('terms', {
										required: 'You must agree to the terms',
									})}
								>
									<span className="text-bodyCaption text-primaryDark">
										I agree to the {/* TODO: 서비스 이용 약관 추가 예정 */}
										<Link to="#" className="underline underline-offset-2">
											terms of service
										</Link>{' '}
										and {/* TODO: 개인정보 처리방침 추가 예정 */}
										<Link to="#" className="underline underline-offset-2">
											privacy policy
										</Link>
										.<span className="text-alert">*</span>
									</span>
								</CheckboxInput>
								{methods.formState.errors.terms && (
									<p role="alert" className="mt-xs text-bodyXsmall text-alert">
										{methods.formState.errors.terms.message}
									</p>
								)}
							</fieldset>
							{/* 회원가입 버튼 영역 */}
							<TextButton type="submit" variant="dark" size="fullMedium">
								Register
							</TextButton>
						</form>
					</FormProvider>
				</div>
			</section>
		</>
	);
};

export default Register;
