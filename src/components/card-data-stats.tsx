import React from 'react';

type Props = {
    title: string;
    value: number;
    mValue: string;
    levelUp?: boolean;
    levelDown?: boolean;
    percentageValue?: number;
    children: React.ReactNode;
}

export default function CardDataStats({
  title, 
  value, 
  mValue, 
  levelUp, 
  levelDown,
  percentageValue, 
  children}: Props) {
  return (
    <div className="rounded-lg border border-stroke bg-white dark:bg-gray-700 px-8 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex justify-start h-11 w-11 items-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold">
            {title}
          </h4>
          <span className="text-sm font-medium">{value} {mValue}</span>
        </div>

        <span
          className={`flex items-center gap-1 text-sm font-medium ${
            levelUp && "text-green-600"
          } ${levelDown && "text-red-600"} `}
        >
          {
            !levelDown && !levelUp ? (
              <span>
                &nbsp;
              </span>
            ) : (
              <span>
                {percentageValue}%
              </span>
            )
          }

          {levelUp && (
            <svg
              className="fill-green-600"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                fill=""
              />
            </svg>
          )}
          {levelDown && (
            <svg
              className="fill-red-600"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                fill=""
              />
            </svg>
          )}
          {
            !levelDown && !levelUp && (
              <span className="text-gray-500">
                =
              </span>
            )
          }
        </span>
      </div>
    </div>
  )
}