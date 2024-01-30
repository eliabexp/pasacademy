'use client'

import { useEffect, useState } from 'react'
import { tv } from 'tailwind-variants'
import { Check, ChevronDown } from 'lucide-react'

interface SelectProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    placeholder?: string
    options: { name: string; value: string }[]
    selected: string[]
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
    maxSelections?: number
}

const ul = tv({
    base: 'absolute z-10 mt-1 flex max-h-60 w-full flex-col gap-1 overflow-y-auto rounded-lg border bg-bg px-1.5 py-1 shadow-lg dark:bg-bg-dark',
    variants: {
        open: {
            false: 'hidden'
        }
    }
})
const arrow = tv({
    base: 'transition-transform duration-300',
    variants: {
        isOpen: {
            true: 'rotate-180'
        }
    }
})
const button = tv({
    base: 'flex w-full items-center justify-between rounded-lg px-2 py-1 transition-colors hover:bg-hover dark:hover:bg-hover-dark',
    variants: {
        active: {
            true: 'bg-hover dark:bg-hover-dark'
        }
    }
})

export default function Select({
    placeholder = 'Selecione uma opção',
    maxSelections = 1,
    options,
    selected,
    setSelected,
    ...rest
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const selectedOptionNames = options
        .filter((option) => selected.includes(option.value))
        .map((option) => option.name)

    // Close menu when mouse clicks out
    useEffect(() => {
        const listener = (e: MouseEvent) => {
            if (e.target instanceof HTMLElement && !e.target.closest('ul')) {
                setIsOpen(false)
            }
        }
        document.addEventListener('click', listener)
        return () => document.removeEventListener('click', listener)
    }, [isOpen])

    return (
        <div className="relative w-full">
            <button
                className="flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left"
                onClick={() => setIsOpen(!isOpen)}
                {...rest}
            >
                {maxSelections > 1 && selectedOptionNames[0] ? (
                    <ul className="flex gap-1">
                        {selectedOptionNames.map((option) => (
                            <li
                                className="rounded-lg bg-hover px-2 dark:bg-hover-dark"
                                key={option}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                ) : (
                    selectedOptionNames[0] ?? placeholder
                )}
                <ChevronDown className={arrow({ isOpen })} size="16" />
            </button>
            <ul className={ul({ open: isOpen })}>
                {options.map((item) => (
                    <li key={item.name}>
                        <button
                            className={button({ active: selectedOptionNames.includes(item.name) })}
                            onClick={() => {
                                if (selected.includes(item.value))
                                    return setSelected(
                                        selected.filter((value) => value !== item.value)
                                    )
                                setSelected(() =>
                                    selected.length === maxSelections
                                        ? [...selected.slice(1), item.value]
                                        : [...selected, item.value]
                                )
                                setIsOpen(selected.length !== maxSelections) // Close the menu if all options are filled
                            }}
                        >
                            {item.name}{' '}
                            {selectedOptionNames.includes(item.name) && <Check size="20" />}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
