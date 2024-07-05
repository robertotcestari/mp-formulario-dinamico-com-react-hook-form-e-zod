import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import { withMask } from 'use-mask-input';
// import { EyeOffIcon } from 'lucide-react';

export default function Form() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [address, setAddress] = useState({ city: '', street: '' });

  async function handleZipcodeBlur(e: React.FocusEvent<HTMLInputElement>) {
    const zipcode = e.target.value;
    console.log(zipcode);

    const res = await fetch(`https://brasilapi.com.br/api/cep/v2/${zipcode}`);

    if (res.ok) {
      const data = await res.json();
      setAddress({
        city: data.city,
        street: data.street,
      });
    }
  }

  return (
    <form>
      <div className="mb-4">
        <label htmlFor="name">Nome Completo</label>
        <input type="text" id="name" />
        {/* Sugestão de exibição de erro de validação */}
        <div className="min-h-4">
          <p className="mt-1 text-xs text-red-400">O nome é obrigatório.</p>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="email">E-mail</label>
        <input className="" type="email" id="email" />
      </div>
      <div className="mb-4">
        <label htmlFor="password">Senha</label>
        <div className="relative">
          <input type={isPasswordVisible ? 'text' : 'password'} id="password" />
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
          />
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
        <input type="text" id="phone" ref={withMask('(99) 99999-9999')} />
      </div>
      <div className="mb-4">
        <label htmlFor="cpf">CPF</label>
        <input type="text" id="cpf" ref={withMask('999.999.999-99')} />
      </div>
      <div className="mb-4">
        <label htmlFor="cep">CEP</label>
        <input
          type="text"
          id="cep"
          ref={withMask('99999-999')}
          onBlur={handleZipcodeBlur}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address">Endereço</label>
        <input
          className="disabled:bg-slate-200"
          type="text"
          id="address"
          disabled
          value={address.street}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="city">Cidade</label>
        <input
          className="disabled:bg-slate-200"
          type="text"
          id="city"
          disabled
          value={address.city}
        />
      </div>
      {/* terms and conditions input */}
      <div className="mb-4">
        <input type="checkbox" id="terms" className="mr-2 accent-slate-500" />
        <label
          className="inline mb-1 text-sm font-light text-slate-500"
          htmlFor="terms"
        >
          Aceito os{' '}
          <span className="underline cursor-pointer hover:text-slate-900">
            termos e condições
          </span>
        </label>
      </div>
      <button
        type="submit"
        className="w-full p-4 mt-10 font-semibold text-white transition-colors bg-slate-500 rounded-xl hover:bg-slate-600"
      >
        Cadastrar
      </button>
    </form>
  );
}
