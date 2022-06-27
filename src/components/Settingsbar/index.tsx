import React from 'react'
import Select from "../../shared/Select"

interface SettingsbarProps {

}

export default function Settingsbar({}: SettingsbarProps) {
    return (
        <div className={'flex items-center shadow drop-shadow-xl w-full p-4 mt-4'}>
            <Select
            options={[{title: 'odin', value: '1'}, {title: 'dwa', value: '2'}, {title: 'tri', value: '3'},{title: 'chetire', value: '4'}]}
            handler={() => console.log('ura')}
            hint={'Choose line weight'}
            />
        </div>
    )
};
