import moment from 'moment';
import * as React from 'react';
import { formats } from './helper';

interface RenderedItemProps {
    index: number
    id: number
    obj: string
    inputSetup: string
    objValue: any
}

function RenderedItem(props: RenderedItemProps) {
	const {
		index, id, obj, inputSetup, objValue,
	} = props;
	return (
		<td>
			<table>
				<tbody>
					<tr>
						{(inputSetup !== '') && (
							<th>
								{obj}
							</th>
						)}
					</tr>
					<tr>
						<td>
							{(inputSetup === 'radio') && (
								<>
									<div>
										<input type={inputSetup} id="true" name={id.toString() + index.toString()} value="true" defaultChecked={objValue} readOnly />
										True
									</div>
									<div>
										<input type={inputSetup} id="false" name={id.toString() + index.toString()} value="false" defaultChecked={!objValue} readOnly />
										False
									</div>
								</>
							)}
							{!['radio', 'id', 'longText', 'date', ''].includes(inputSetup) &&
							<input type={inputSetup} defaultValue={objValue} />}
							{(inputSetup === 'id') &&
							<div>{objValue}</div>}
							{(inputSetup === 'longText') &&
							<textarea defaultValue={objValue} />}
							{(inputSetup === 'date') && (
								<input
									type={inputSetup}
									defaultValue={moment(objValue, formats, true).format('YYYY-MM-DD').toString()}
								/>
							)}
						</td>
					</tr>
				</tbody>
			</table>
		</td>
	);
}

export default RenderedItem;
