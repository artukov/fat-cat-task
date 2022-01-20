import moment from 'moment';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { formats } from './helper';


interface RenderedItemProps {
    index: number
    id: number
    obj: any
    inputSetup: string
    objValue: any
}

const RenderedItem: FunctionComponent<RenderedItemProps> = (props) => {
    return (
        <React.Fragment key={props.index}>
            <td>
                <table>
                    <tbody>
                        <tr>
                            {(props.inputSetup !== "") &&
                                <th>
                                    {props.obj}
                                </th>
                            }
                        </tr>
                        <tr>
                            <td>
                                {(props.inputSetup === "radio") &&
                                    <>
                                        <div>
                                            <input type={props.inputSetup} id="true" name={props.id.toString() + props.index.toString()} value="true" defaultChecked={props.objValue} readOnly></input>
                                            <label htmlFor="true">True</label>
                                        </div>
                                        <div>
                                            <input type={props.inputSetup} id="false" name={props.id.toString() + props.index.toString()} value="false" defaultChecked={!props.objValue} readOnly></input>
                                            <label htmlFor="false">False</label>
                                        </div>
                                    </>
                                }
                                {!["radio","id","longText","date",""].includes(props.inputSetup) &&
                                    <input type={props.inputSetup} defaultValue={props.objValue}></input>
                                }
                                {/* {(props.inputSetup !== "radio" && props.inputSetup !== "id" && props.inputSetup !== "longText" && props.inputSetup !== "date" && props.inputSetup !== "") &&
                                    <input type={props.inputSetup} defaultValue={props.objValue}></input>
                                } */}
                                {(props.inputSetup === "id") &&
                                    <div>{props.objValue}</div>
                                }
                                {(props.inputSetup === "longText") &&
                                    <textarea defaultValue={props.objValue}></textarea>
                                }
                                {(props.inputSetup === "date") &&
                                    <input
                                        type={props.inputSetup}
                                        defaultValue={moment(props.objValue, formats, true).format("YYYY-MM-DD").toString()}
                                    />
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </React.Fragment>
    )
}

export default RenderedItem;