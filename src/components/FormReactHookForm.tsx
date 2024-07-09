import { EyeIcon, EyeOffIcon, Loader } from 'lucide-react';
import { useState } from 'react';
import { useHookFormMask } from 'use-mask-input';
import { FieldValues, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

export default function Form() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    setError,
    formState: { isSubmitting, errors },
  } = useForm();

  const registerWithMask = useHookFormMask(register);

  async function handleZipcodeBlur(e: React.FocusEvent<HTMLInputElement>) {
    const zipcode = e.target.value;

    const res = await fetch(`https://brasilapi.com.br/api/cep/v2/${zipcode}`);

    if (res.ok) {
      const data = await res.json();
      setValue('address', data.street);
      setValue('city', data.city);
    }
  }

  async function onSubmit(data: FieldValues) {
    console.log('Form submitted');
    console.log(data);

    const res = await fetch(
      'https://apis.codante.io/api/register-user/register',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    );
    const resData = await res.json();

    if (!res.ok) {
      console.log(resData);
      for (const field in resData.errors) {
        setError(field, { type: 'manual', message: resData.errors[field] });
      }

      // setError('cpf', {type: 'manual', message: 'CPF não válido'})
    } else {
      console.log(resData);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="name">Nome Completo</label>
        <input
          type="text"
          id="name"
          {...register('name', {
            required: 'O campo nome precisa ser preenchido',
            maxLength: {
              value: 255,
              message: 'O nome deve ter no máximo 255 caracteres',
            },
          })}
        />
        <p className="mt-1 text-xs text-red-400">
          <ErrorMessage errors={errors} name="name" />
        </p>
      </div>
      <div className="mb-4">
        <label htmlFor="email">E-mail</label>
        <input
          className=""
          type="email"
          id="email"
          {...register('email', {
            required: 'O campo email precisa ser preenchido',
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: 'E-mail inválido',
            },
          })}
        />
        <p className="mt-1 text-xs text-red-400">
          <ErrorMessage errors={errors} name="email" />
        </p>
      </div>
      <div className="mb-4">
        <label htmlFor="password">Senha</label>
        <div className="relative">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            id="password"
            {...register('password', {
              required: 'O campo senha precisa ser preenchido',
              minLength: {
                value: 8,
                message: 'A senha deve ter no mínimo 6 caracteres',
              },
            })}
          />
          <p className="mt-1 text-xs text-red-400">
            <ErrorMessage errors={errors} name="password" />
          </p>
          <span className="absolute right-3 top-3">
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? (
                <EyeIcon size={20} className="cursor-pointer text-slate-600" />
              ) : (
                <EyeOffIcon
                  size={20}
                  className="cursor-pointer text-slate-600"
                />
              )}
            </button>
          </span>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="confirm-password">Confirmar Senha</label>
        <div className="relative">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            id="confirm-password"
            {...register('password_confirmation', {
              required: 'A confirmação de senha precisa ser preenchida',
              minLength: {
                value: 8,
                message: 'A senha deve ter no mínimo 6 caracteres',
              },
              validate(value, formValues) {
                if (value === formValues.password) return true;
                return 'As senhas devem coincidir';
              },
            })}
          />
          <p className="mt-1 text-xs text-red-400">
            <ErrorMessage errors={errors} name="password_confirmation" />
          </p>
          <span className="absolute right-3 top-3">
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? (
                <EyeIcon size={20} className="cursor-pointer text-slate-600" />
              ) : (
                <EyeOffIcon
                  size={20}
                  className="cursor-pointer text-slate-600"
                />
              )}
            </button>
          </span>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="phone">Telefone Celular</label>
        <input
          type="text"
          id="phone"
          {...registerWithMask('phone', '(99) 99999-9999', {
            required: 'O campo telefone precisa ser preenchido',
            pattern: {
              value: /^\(\d{2}\) \d{5}-\d{4}$/,
              message: 'Telefone inválido',
            },
          })}
        />
        <p className="mt-1 text-xs text-red-400">
          <ErrorMessage errors={errors} name="phone" />
        </p>
      </div>
      <div className="mb-4">
        <label htmlFor="cpf">CPF</label>
        <input
          type="text"
          id="cpf"
          {...registerWithMask('cpf', '999.999.999-99', {
            required: 'O campo CPF precisa ser preenchido',
            pattern: {
              value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
              message: 'CPF inválido',
            },
          })}
        />
        <p className="mt-1 text-xs text-red-400">
          <ErrorMessage errors={errors} name="cpf" />
        </p>
      </div>
      <div className="mb-4">
        <label htmlFor="cep">CEP</label>
        <input
          type="text"
          id="cep"
          {...registerWithMask('zipcode', '99999-999', {
            required: 'O campo CEP precisa ser preenchido',
            pattern: {
              value: /^\d{5}-\d{3}$/,
              message: 'CEP inválido',
            },
            onBlur: handleZipcodeBlur,
          })}
        />
        <p className="mt-1 text-xs text-red-400">
          <ErrorMessage errors={errors} name="zipcode" />
        </p>
      </div>
      <div className="mb-4">
        <label htmlFor="address">Endereço</label>
        <input
          className="disabled:bg-slate-200"
          type="text"
          id="address"
          disabled
          {...register('address', {
            required: 'O campo endereço precisa ser preenchido',
          })}
        />

        <p className="mt-1 text-xs text-red-400">
          <ErrorMessage errors={errors} name="address" />
        </p>
      </div>
      <div className="mb-4">
        <label htmlFor="city">Cidade</label>
        <input
          className="disabled:bg-slate-200"
          type="text"
          id="city"
          disabled
          {...register('city', {
            required: 'O campo cidade precisa ser preenchido',
          })}
        />
        <p className="mt-1 text-xs text-red-400">
          <ErrorMessage errors={errors} name="city" />
        </p>
      </div>
      {/* terms and conditions input */}
      <div className="mb-4">
        <input
          type="checkbox"
          id="terms"
          className="mr-2 accent-slate-500"
          {...register('terms', {
            required: 'Os termos e condições devem ser aceitos',
          })}
        />
        <label
          className="inline mb-1 text-sm font-light text-slate-500"
          htmlFor="terms"
        >
          Aceito os{' '}
          <span className="underline cursor-pointer hover:text-slate-900">
            termos e condições
          </span>
        </label>
        <p className="mt-1 text-xs text-red-400">
          <ErrorMessage errors={errors} name="terms" />
        </p>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center w-full p-4 mt-10 font-semibold text-white transition-colors bg-slate-500 rounded-xl hover:bg-slate-600 disabled:bg-slate-300"
      >
        {isSubmitting ? <Loader className="animate-spin" /> : 'Cadastrar'}
      </button>
    </form>
  );
}
