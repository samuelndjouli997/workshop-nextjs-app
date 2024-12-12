import React from 'react'
import { Button } from './ui/button'

type Props = {
    list: string[];
    onSelect: (item: string) => void;
    selected: string;
}

export default function ButtonList({list, onSelect, selected}: Props) {
  return (
    <div className="flex justify-start space-x-6">
        {
            list.map((item, index) => {
                return <Button 
                            key={index} 
                            onClick={() => onSelect(item)}
                            className={`${selected === item ? 'bg-primary-blue text-white' : 'bg-primary-blue-light text-white'}`}
                        >
                            {item}
                        </Button>
            })
        }
    </div>
  )
}