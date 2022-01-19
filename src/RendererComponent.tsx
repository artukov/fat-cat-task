import * as React from 'react';
import { useState, useEffect } from 'react';

interface RendererComponentProps {

}

const RendererComponent: React.FunctionComponent<RendererComponentProps> = () => {
    const [loaded, setLoaded] = useState<any>("");
    const [loadedArray, setloadedArray] = useState<JSON[]>();

    const uploadFile = (e: any) => {
        e.preventDefault()
        let obj;
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
        console.log(value)
    }

    return (
        <>
            <div>
                Renderer component
            </div>
            <span>
                <input type="file"
                    name="myFile"
                    onChange={(e) => uploadFile(e)} />
            </span>
            <div>Loaded: </div>
            {loadedArray?.map((item: any) => {
                const keysList = Object.keys(item);
                return (
                    <table>
                        <tbody>
                            <tr>
                        {keysList?.map((obj: any) => {
                            const inputSetup = generateInput(item[obj]);
                            return (
                                <>
                                <td>
                                    <table>
                                        <tbody>
                                    <tr>
                                        <th>
                                            {obj}
                                        </th>
                                        
                                    </tr>
                                    <tr>
                                        <td>
                                            {item[obj]}
                                        </td>
                                    </tr>
                                    </tbody>
                                    </table>
                                 </td>
                                </>
                            )

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