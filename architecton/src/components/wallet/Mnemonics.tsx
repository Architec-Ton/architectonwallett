import React from 'react';

type Props = {
  mnemonics: string[];
};

function Mnemonics({ mnemonics }: Props) {
  return (
    <div
      className="column text-secondary"
      style={{
        display: 'grid',
        gridTemplateColumns: '65% 35%',
        margin: '2rem 0',
        padding: '2rem',
        rowGap: '0.5rem',
        fontSize: '0.75rem',
        borderRadius: '1rem',
        backgroundColor: 'var(--color-bg-selected)',
        textTransform: 'capitalize',
        columnCount: 2,
      }}>
      {Array.apply(0, Array(12)).map((_, index) => (
        <React.Fragment key={index}>
          <p
            style={{
              margin: '0',
              padding: '0',
            }}>
            {index + 1}. {mnemonics[index]}
          </p>
          <p
            style={{
              margin: '0',
              padding: '0',
            }}>
            {index + 12 + 1}. {mnemonics[index + 12]}
          </p>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Mnemonics;
