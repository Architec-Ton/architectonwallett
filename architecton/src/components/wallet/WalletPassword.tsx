import { useState } from 'react';
import Input from '../inputs/Input';

type Props = {
  mnemonics: string[];
  checkIndex: number[];
  setApprove: (approve: boolean) => void;
};

function WalletPassword({ checkIndex, mnemonics, setApprove }: Props) {
  const [inputState, setInputState] = useState<number[]>([0, 0, 0]);

  const updateInput = (idx: number, value: string) => {
    console.log(idx, value, mnemonics[idx]);
    const key = checkIndex.indexOf(idx);
    if (key >= 0) {
      if (value.toLowerCase() == mnemonics[idx]) {
        inputState[key] = 1;
      } else {
        inputState[key] = 0;
      }
      setInputState(inputState);
    }
    if (setApprove) setApprove(inputState.every((v) => Boolean(v)));
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        rowGap: '1rem',
        alignItems: 'center',
        padding: '1rem',
      }}>
      <p
        className="text-secondary"
        style={{
          padding: '0rem 4.5rem',
          fontSize: '0.65rem',
          textAlign: 'center',
          lineHeight: '0.8rem',
        }}>
        To make sure that you have written down the words, fill in the fields by
        entering the words{' '}
        <span className="color-bg-primary">
          {checkIndex.map((v) => v + 1).join(', ')}
        </span>{' '}
        in them
      </p>
      {checkIndex.map((index) => (
        <Input
          key={index}
          placeholder="- - - - -"
          prefix={`${index + 1}.`}
          // @ts-expect-error tagrget canbe any
          onChange={(evt) => updateInput(index, evt.target.value)}
        />
      ))}
    </div>
  );
}

export default WalletPassword;
