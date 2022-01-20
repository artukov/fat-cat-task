import * as React from 'react';
import { useState, useEffect } from 'react';
import RenderedItem from './RenderedItem';
import { isID, isEmail, isDate } from './helper'

interface RendererComponentProps {

}

const RendererComponent: React.FunctionComponent<RendererComponentProps> = () => {
    const [loaded, setLoaded] = useState<any>("");
    const [loadedArray, setloadedArray] = useState<JSON[]>();

    const uploadFile = (e: any) => {
        setloadedArray([]);
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e?.target?.result)
            if (text) {
                setLoaded(text);
            }
        };
        reader.readAsText(e.target.files[0])
    }

    useEffect(() => {
        let obj
        if (loaded) {
            obj = JSON.parse(loaded);
        }
        setloadedArray(obj)
    }, [loaded]);

    const generateInput = (value: any) => {
        if (typeof value === "string") {
            if (isID(value))
                return "id"
            if (isEmail(value))
                return "email"
            if (isDate(value))
                return "date"
            if (value?.length > 30)
                return "longText"
            return "text"
        } else if (typeof value === "number") {
            return "number"
        } else if (typeof value === "boolean") {
            return "radio"
        } else {
            return ""
        }
    }

    return (
        <>
            <div>
                Please select JSON file to load
            </div>
            <span>
                <input type="file"
                    name="myFile"
                    onChange={(e) => uploadFile(e)} />
            </span>
            <div>Loaded: </div>
            {loadedArray?.map((item: any, id: number) => {
                const keysList = Object.keys(item);
                return (
                    <table key={id}>
                        <tbody>
                            <tr>
                                {keysList?.map((obj: any, index: number) => {
                                    const inputSetup = generateInput(item[obj]);

                                    return <RenderedItem
                                        index={index}
                                        id={id} 
                                        obj={obj}
                                        objValue={item[obj]}
                                        inputSetup={inputSetup}
                                    />
                                })}
                            </tr>
                        </tbody>
                    </table>
                )
            })}
        </>
    );
}

export default RendererComponent;