import type { IRegisterFormData } from '#types/auth';
import DefaultInput from '@components/Input/DefaultInput';
import InputLabel from '@components/Label/InputLabel';
import { useFormContext } from 'react-hook-form';

const NameForm = () => {
	const { register, resetField, watch } =
		useFormContext<Pick<IRegisterFormData, 'firstName' | 'lastName'>>();

	return (
		<>
			{/* 성 */}
			<div className="flex flex-col gap-sm mb-lg">
				<InputLabel htmlFor="lastName" isRequired>
					Last Name
				</InputLabel>
				<div>
					{/* 성별 선택 드롭다운 */}
					<DefaultInput
						id="lastName"
						type="text"
						placeholder="Enter your last name"
						{...register('lastName', {
							required: 'Last name is required',
						})}
						showClearIcon={!!watch('lastName')}
						onClearIconClick={() => resetField('lastName')}
					/>
				</div>
			</div>
			{/* 이름 */}
			<div className="flex flex-col gap-sm mb-lg">
				<InputLabel htmlFor="firstName" isRequired>
					First Name
				</InputLabel>
				<div>
					{/* 성별 선택 드롭다운 */}
					<DefaultInput
						id="firstName"
						type="text"
						placeholder="Enter your first name"
						{...register('firstName', {
							required: 'First name is required',
						})}
						showClearIcon={!!watch('firstName')}
						onClearIconClick={() => resetField('firstName')}
					/>
				</div>
			</div>
		</>
	);
};

export default NameForm;
