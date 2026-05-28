import { useState } from 'react';
import { authStyles as s } from '../styles/auth';

interface PasswordInputProps {
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  minLength?: number;
}

export const PasswordInput = ({
  name,
  placeholder = '••••••••',
  value,
  onChange,
  required,
  minLength,
}: PasswordInputProps) => {
  const [mostrar, setMostrar] = useState(false);

  return (
    <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
      <input
        name={name}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
        autoComplete="off"
        style={{
          ...s.input,
          marginBottom: 0,
          paddingRight: '2.75rem',
          fontFamily: mostrar ? 'inherit' : 'text-security-disc',
          WebkitTextSecurity: mostrar ? 'none' : 'disc',
        } as React.CSSProperties}
      />
      <button
        type="button"
        onClick={() => setMostrar(!mostrar)}
        style={{
          position: 'absolute',
          right: '0.75rem',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1rem',
          color: '#888',
          padding: 0,
        }}
      >
        {mostrar ? '🙈' : '👁️'}
      </button>
    </div>
  );
};