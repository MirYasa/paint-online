import React, {useState} from 'react'

interface IOption {
    title: string
    value: string
}

interface SelectProps {
    options: IOption[]
    handler: Function
    hint: string
}

export default function Select({options, handler, hint}: SelectProps) {
    const [selected, setSelected] = useState(hint)
    const [open, setOpen] = useState(false)

    const selectValue = (value: string) => {
        setOpen(false)
        setSelected(value)
        handler()
    }
    return (
        <div onClick={() => setOpen(!open)}>
            <h2>{selected}</h2>
            <ul className={`${open ? 'opacity-100' : 'opacity-0'} absolute`}>
                {
                    options.map(({title, value}, index) =>
                        <li key={index} onClick={() => selectValue(title)}>
                            {title}
                        </li>
                    )
                }
            </ul>
        </div>
    )
};
